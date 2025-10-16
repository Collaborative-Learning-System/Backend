import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import * as Y from 'yjs';
import { DocumentsService } from '../services/documents.service';
import { CollaborationService } from '../services/collaboration.service';
import { WsJwtAuthGuard } from '../../../guards/ws-jwt-auth.guard';
import {
  JoinDocDto,
  SyncUpdateDto,
  TitleUpdateDto,
  CursorMoveDto,
  UserActivityDto,
  HeartbeatDto,
  LeaveWorkspaceDto,
  BeforeUnloadDto,
} from '../dtos/presence.dto';

@WebSocketGateway({ 
  cors: { 
    origin: [
      'http://localhost:5173',
      'http://localhost:3000', 
      'http://127.0.0.1:5500',
      'http://localhost:8080',
      'https://educollab-snowy.vercel.app',
    ],
    credentials: true,
  },
  namespace: '/doc',
})
@UseGuards(WsJwtAuthGuard)
export class DocGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  // Map to track user sessions
  private userSessions = new Map<string, { userId: string; docIds: Set<string> }>();

  constructor(
    private readonly documentService: DocumentsService,
    private readonly collaborationService: CollaborationService,
  ) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    
    // Enable logging for debugging
    client.onAny((event, ...args) => {
      console.log(`Received event: ${event} from ${client.id}`, args);
    });

    // Set up periodic cleanup for inactive users
    this.setupPeriodicCleanup();
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    
    // Handle user leaving all documents they were in
    const session = this.userSessions.get(client.id);
    if (session) {
      for (const docId of session.docIds) {
        await this.handleUserLeave(docId, session.userId, client);
      }
      this.userSessions.delete(client.id);
    }
  }

  private setupPeriodicCleanup() {
    // Clean up inactive users every 2 minutes
    setInterval(async () => {
      try {
        // Get all active document rooms
        const rooms = this.server.sockets.adapter.rooms;
        for (const [roomId] of rooms) {
          // Skip socket.io internal rooms (they start with socket id)
          if (!roomId.includes('-') || roomId.length < 10) continue;
          
          await this.collaborationService.cleanupInactiveUsers(roomId);
        }
      } catch (error) {
        console.error('Error during periodic cleanup:', error);
      }
    }, 120000);
  }

  @SubscribeMessage('joinDoc')
  async handleJoinDoc(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinDocDto,
  ) {
    try {
      const { docId, userId } = data;
      
      // Track user session
      if (!this.userSessions.has(client.id)) {
        this.userSessions.set(client.id, { userId, docIds: new Set() });
      }
      this.userSessions.get(client.id)!.docIds.add(docId);

      // Join the document room
      client.join(docId);
      
      // Handle user joining in collaboration service
      const joinResult = await this.collaborationService.handleUserJoin(docId, userId);
      if (!joinResult.success) {
        client.emit('error', { message: joinResult.message });
        return;
      }

      // Load document from service
      const ydoc = await this.documentService.loadDocument(docId);
      
      // Get document data including title
      const documentData = await this.documentService.getDocumentData(docId);
      const title = documentData.success && documentData.data ? documentData.data.title : 'Untitled Document';
      
      // Send initial document state to the joining client
      client.emit('initDoc', { 
        update: Y.encodeStateAsUpdate(ydoc),
        title: title 
      });

      // Notify other users about the new user
      client.to(docId).emit('userJoined', {
        userId,
        name: joinResult.user?.name || `User ${userId}`,
      });

      // Send current online users to the joining client
      const onlineUsers = await this.collaborationService.getOnlineUsers(docId);
      client.emit('onlineUsers', { users: onlineUsers });
      
      // Broadcast updated online users list to all clients in the room
      this.server.to(docId).emit('onlineUsers', { users: onlineUsers });
      
      console.log(`User ${userId} joined doc ${docId}`);
    } catch (error) {
      console.error('Error in joinDoc:', error);
      client.emit('error', { message: 'Failed to join document' });
    }
  }

  @SubscribeMessage('leaveDoc')
  async handleLeaveDoc(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { docId: string; userId: string },
  ) {
    await this.handleUserLeave(data.docId, data.userId, client);
  }

  private async handleUserLeave(docId: string, userId: string, client: Socket) {
    try {
      // Leave the document room
      client.leave(docId);

      // Handle user leaving in collaboration service
      await this.collaborationService.handleUserLeave(docId, userId);

      // Notify other users about user leaving
      client.to(docId).emit('userLeft', { userId });

      // Send updated online users list to remaining clients
      const onlineUsers = await this.collaborationService.getOnlineUsers(docId);
      this.server.to(docId).emit('onlineUsers', { users: onlineUsers });

      // Update user session
      const session = this.userSessions.get(client.id);
      if (session) {
        session.docIds.delete(docId);
      }

      console.log(`User ${userId} left doc ${docId}`);
    } catch (error) {
      console.error('Error in handleUserLeave:', error);
    }
  }

  @SubscribeMessage('syncUpdate')
  async handleSyncUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: SyncUpdateDto,
  ) {
    try {
      const { docId, content, userId } = data;
      
      // Update user activity
      await this.collaborationService.updateUserActivity(docId, userId);

      const ydoc = await this.documentService.loadDocument(docId);
      Y.applyUpdate(ydoc, new Uint8Array(content));
      await this.documentService.saveDocument(docId, ydoc);
      
      // Broadcast update to all other clients in the document room
      client.to(docId).emit('syncUpdate', { content });
      
      console.log(`Doc ${docId} updated by ${userId}`);
    } catch (error) {
      console.error('Error in syncUpdate:', error);
      client.emit('error', { message: 'Failed to sync document update' });
    }
  }

  @SubscribeMessage('titleUpdate')
  async handleTitleUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: TitleUpdateDto,
  ) {
    try {
      const { docId, title, userId } = data;

      // Update user activity
      await this.collaborationService.updateUserActivity(docId, userId);

      // Update title in database
      const result = await this.documentService.updateTitle(docId, title);
      
      if (result.success) {
        // Broadcast title update to all other clients in the document room
        client.to(docId).emit('titleUpdate', { 
          title, 
          userId 
        });
        console.log(`Doc ${docId} title updated to "${title}" by ${userId}`);
      } else {
        client.emit('error', { message: 'Failed to update document title' });
      }
    } catch (error) {
      console.error('Error in titleUpdate:', error);
      client.emit('error', { message: 'Failed to update document title' });
    }
  }

  @SubscribeMessage('cursorMove')
  async handleCursorMove(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: CursorMoveDto,
  ) {
    try {
      const { docId, userId, cursor } = data;

      // Update cursor position in collaboration service
      await this.collaborationService.updateUserCursor(docId, userId, cursor);

      // Broadcast cursor update to other users in the document room
      client.to(docId).emit('cursorUpdate', { userId, cursor });
      
    } catch (error) {
      console.error('Error in cursorMove:', error);
    }
  }

  @SubscribeMessage('userActive')
  async handleUserActive(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: UserActivityDto,
  ) {
    try {
      const { docId, userId } = data;
      
      // Update user activity
      await this.collaborationService.updateUserActivity(docId, userId);
      
    } catch (error) {
      console.error('Error in userActive:', error);
    }
  }

  @SubscribeMessage('heartbeat')
  async handleHeartbeat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: HeartbeatDto,
  ) {
    try {
      const { docId, userId } = data;
      
      // Handle heartbeat to maintain user presence
      await this.collaborationService.handleHeartbeat(docId, userId);
      
    } catch (error) {
      console.error('Error in heartbeat:', error);
    }
  }
}
