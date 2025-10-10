import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, UseGuards, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { WsJwtAuthGuard } from '../guards/ws-jwt-auth.guard';
import type { AuthenticatedSocket } from '../guards/ws-jwt-auth.guard';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, AuthenticatedSocket>();

  constructor(
    @Inject('workspace-group-service') private workspaceService: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      // Use the WebSocket auth guard to authenticate via cookies or token
      const isAuthenticated = WsJwtAuthGuard.authenticateSocket(
        client,
        this.jwtService,
      );

      if (!isAuthenticated || !client.userId) {
        console.log('Authentication failed, disconnecting client');
        client.disconnect();
        return;
      }

      console.log(`User ${client.userId} connected with socket ${client.id}`);
      this.connectedUsers.set(client.userId, client);

      // Notify client of successful connection
      client.emit('connection_success', {
        userId: client.userId,
        message: 'Successfully authenticated via cookies/token',
      });
    } catch (error) {
      console.error('Connection authentication failed:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    if (client.userId) {
      console.log(`User ${client.userId} disconnected`);
      this.connectedUsers.delete(client.userId);
    }
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('join_group')
  async handleJoinGroup(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { groupId: string },
  ) {
    try {
      if (!client.userId) {
        client.emit('error', { message: 'Not authenticated' });
        return;
      }

      // Join the Socket.IO room for the group
      client.join(`group_${data.groupId}`);

      // Initialize user groups array if not exists
      if (!client.userGroups) {
        client.userGroups = [];
      }

      // Add group to user's groups if not already there
      if (!client.userGroups.includes(data.groupId)) {
        client.userGroups.push(data.groupId);
      }

      console.log(`User ${client.userId} joined group ${data.groupId}`);
      client.emit('joined_group', { groupId: data.groupId });
    } catch (error) {
      console.error('Error joining group:', error);
      client.emit('error', { message: 'Failed to join group' });
    }
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('leave_group')
  async handleLeaveGroup(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { groupId: string },
  ) {
    try {
      if (!client.userId) {
        client.emit('error', { message: 'Not authenticated' });
        return;
      }

      // Leave the Socket.IO room for the group
      client.leave(`group_${data.groupId}`);

      // Remove group from user's groups
      if (client.userGroups) {
        client.userGroups = client.userGroups.filter(
          (groupId) => groupId !== data.groupId,
        );
      }

      console.log(`User ${client.userId} left group ${data.groupId}`);
      client.emit('left_group', { groupId: data.groupId });
    } catch (error) {
      console.error('Error leaving group:', error);
      client.emit('error', { message: 'Failed to leave group' });
    }
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('send_message')
  async handleSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody()
    data: {
      groupId: string;
      text?: string;
      attachment?: {
        fileName: string;
        mimeType: string;
        base64Data: string;
        title?: string;
        description?: string;
      };
    },
  ) {
    try {
      if (!client.userId) {
        client.emit('error', { message: 'Not authenticated' });
        return;
      }

      if (!data?.groupId) {
        client.emit('error', { message: 'Group ID is required' });
        return;
      }

      if (!data.text?.trim() && !data.attachment) {
        client.emit('error', {
          message: 'Message must include text or an attachment',
        });
        return;
      }

      console.log('[ChatGateway] send_message received', {
        socketId: client.id,
        userId: client.userId,
        groupId: data.groupId,
        hasText: Boolean(data.text?.trim()),
        hasAttachment: Boolean(data.attachment),
      });

      // Send message to workspace service for persistence
      const savedMessage = await firstValueFrom(
        this.workspaceService.send('send_chat_message', {
          userId: client.userId,
          sendChatMessageDto: {
            groupId: data.groupId,
            text: data.text,
            attachment: data.attachment,
          },
        }),
      );

      console.log('[ChatGateway] Message persisted', {
        chatId: savedMessage.chatId,
        groupId: savedMessage.groupId,
        userId: savedMessage.userId,
        messageType: savedMessage.messageType,
        hasResource: Boolean(savedMessage.resource),
      });

      // Broadcast the message to all members of the group
      this.server.to(`group_${data.groupId}`).emit('new_message', {
        chatId: savedMessage.chatId,
        groupId: savedMessage.groupId,
        userId: savedMessage.userId,
        text: savedMessage.text,
        messageType: savedMessage.messageType,
        resource: savedMessage.resource,
        sentAt: savedMessage.sentAt,
      });

      console.log('[ChatGateway] Broadcast dispatched', {
        groupId: data.groupId,
        chatId: savedMessage.chatId,
        // Guard against potential undefined adapter (e.g., during initialization or custom adapters)
        recipients: (() => {
          try {
            const adapter: any = this.server?.sockets?.adapter;
            const room = adapter?.rooms?.get(`group_${data.groupId}`);
            return room?.size ?? 0;
          } catch (e) {
            return 0;
          }
        })(),
      });

      // Send confirmation to sender
      client.emit('message_sent', {
        chatId: savedMessage.chatId,
        status: 'delivered',
        messageType: savedMessage.messageType,
        resource: savedMessage.resource,
      });

      console.log('[ChatGateway] Acknowledgement emitted', {
        chatId: savedMessage.chatId,
        userId: client.userId,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      client.emit('error', {
        message: 'Failed to send message',
        details: error.message,
      });
    }
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('get_chat_history')
  async handleGetChatHistory(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { groupId: string; limit?: number; offset?: number },
  ) {
    try {
      if (!client.userId) {
        client.emit('error', { message: 'Not authenticated' });
        return;
      }

      console.log(
        `User ${client.userId} requesting chat history for group ${data.groupId}`,
      );

      // Get chat history from workspace service
      const chatHistory = await firstValueFrom(
        this.workspaceService.send('get_chat_history', {
          userId: client.userId,
          getChatHistoryDto: {
            groupId: data.groupId,
            limit: data.limit || 50,
            offset: data.offset || 0,
          },
        }),
      );

      // Send chat history to client
      client.emit('chat_history', {
        groupId: data.groupId,
        messages: chatHistory.messages,
        totalCount: chatHistory.totalCount,
      });
    } catch (error) {
      console.error('Error getting chat history:', error);
      client.emit('error', {
        message: 'Failed to get chat history',
        details: error.message,
      });
    }
  }

  // Method to get connected users (for admin purposes)
  getConnectedUsers(): string[] {
    return Array.from(this.connectedUsers.keys());
  }

  // Method to check if a user is connected
  isUserConnected(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }

  // Method to send a message to a specific user
  sendToUser(userId: string, event: string, data: any): boolean {
    const userSocket = this.connectedUsers.get(userId);
    if (userSocket) {
      userSocket.emit(event, data);
      return true;
    }
    return false;
  }

  // Method to broadcast to all users in a group
  broadcastToGroup(groupId: string, event: string, data: any) {
    this.server.to(`group_${groupId}`).emit(event, data);
  }
}
