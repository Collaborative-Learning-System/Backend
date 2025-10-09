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

@WebSocketGateway({ cors: { origin: '*' } })
@UseGuards(WsJwtAuthGuard)
export class DocGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly documentService: DocumentsService,
    private readonly collaborationService: CollaborationService,
  ) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
      client.onAny((event, ...args) => {
        console.log(`Received event: ${event}`, args);
      });
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinDoc')
  async handleJoinDoc(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { docId: string; userId: string },
  ) {
    try {
      client.join(data.docId);
      
      // Load document from service
      const ydoc = await this.documentService.loadDocument(data.docId);
      
      // Get document data including title
      const documentData = await this.documentService.getDocumentData(data.docId);
      const title = documentData.success && documentData.data ? documentData.data.title : 'Untitled Document';
      
      // Send initial document state to the joining client
      client.emit('initDoc', { 
        update: Y.encodeStateAsUpdate(ydoc),
        title: title 
      });
      
      console.log(`User ${data.userId} joined doc ${data.docId}`);
    } catch (error) {
      console.error('Error in joinDoc:', error);
      client.emit('error', { message: 'Failed to join document' });
    }
  }

  @SubscribeMessage('syncUpdate')
  async handleSyncUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { docId: string; content: Uint8Array; userId: string },
  ) {
    try {
      const ydoc = await this.documentService.loadDocument(data.docId);
      Y.applyUpdate(ydoc, new Uint8Array(data.content));
      await this.documentService.saveDocument(data.docId, ydoc);
      
      // Broadcast update to all other clients in the document room
      client.to(data.docId).emit('syncUpdate', { content: data.content });
      console.log(`Doc ${data.docId} updated by ${data.userId}`);
    } catch (error) {
      console.error('Error in syncUpdate:', error);
      client.emit('error', { message: 'Failed to sync document update' });
    }
  }

  @SubscribeMessage('titleUpdate')
  async handleTitleUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { docId: string; title: string; userId: string },
  ) {
    try {
      // Update title in database
      const result = await this.documentService.updateTitle(data.docId, data.title);
      
      if (result.success) {
        // Broadcast title update to all other clients in the document room
        client.to(data.docId).emit('titleUpdate', { 
          title: data.title, 
          userId: data.userId 
        });
        console.log(`Doc ${data.docId} title updated to "${data.title}" by ${data.userId}`);
      } else {
        client.emit('error', { message: 'Failed to update document title' });
      }
    } catch (error) {
      console.error('Error in titleUpdate:', error);
      client.emit('error', { message: 'Failed to update document title' });
    }
  }
}
