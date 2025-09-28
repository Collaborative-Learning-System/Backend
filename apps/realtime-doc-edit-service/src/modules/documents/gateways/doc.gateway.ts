import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as Y from 'yjs';
import { DocumentsService } from '../services/documents.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class DocGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly documentService: DocumentsService) {}

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
    client.join(data.docId);
    const ydoc = await this.documentService.loadDocument(data.docId);
    client.emit('initDoc', { update: Y.encodeStateAsUpdate(ydoc) });
    console.log(`User ${data.userId} joined doc ${data.docId}`);
  }

  @SubscribeMessage('syncUpdate')
  async handleSyncUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { docId: string; content: Uint8Array; userId: string },
  ) {
    const ydoc = await this.documentService.loadDocument(data.docId);
    Y.applyUpdate(ydoc, new Uint8Array(data.content));
    await this.documentService.saveDocument(data.docId, ydoc);
    client.to(data.docId).emit('syncUpdate', { content: data.content });
    console.log(`Doc ${data.docId} updated by ${data.userId}`);
  }
}
