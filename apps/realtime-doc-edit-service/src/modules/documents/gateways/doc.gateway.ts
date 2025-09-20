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
    import * as Y from 'yjs';
    import { CollaborationService } from '../../collaborators/services/collaboration.service';

    @WebSocketGateway({
      cors: {
        origin: '*', // TODO: restrict in prod
      },
    })
    export class DocGateway
      implements OnGatewayConnection, OnGatewayDisconnect
    {
      @WebSocketServer()
      server: Server;

      constructor(private readonly collabService: CollaborationService) {}

      async handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
      }

      async handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        // optional: clean up temporary state
      }

      /**
       * Client joins a document room
       */
      @SubscribeMessage('joinDoc')
      async handleJoinDoc(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { docId: string; userId: string },
      ) {
        const { docId, userId } = data;
        client.join(docId);

        // Load Yjs doc state from Redis/DB
        const ydoc = await this.collabService.loadDocument(docId);

        // Encode state as Uint8Array and send back
        const state = Y.encodeStateAsUpdate(ydoc);
        client.emit('initDoc', { update: state });

        console.log(`User ${userId} joined doc ${docId}`);
      }

      /**
       * Receive an update from a client and broadcast
       */
      @SubscribeMessage('syncUpdate')
      async handleSyncUpdate(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { docId: string; update: Uint8Array },
      ) {
        const { docId, update } = data;

        // Apply the update to the shared Y.Doc in memory/Redis
        const ydoc = await this.collabService.loadDocument(docId);
        Y.applyUpdate(ydoc, new Uint8Array(update));

        // Persist snapshot to Redis/DB asynchronously
        await this.collabService.saveDocument(docId, ydoc);

        // Broadcast update to all other collaborators in the same room
        client.to(docId).emit('syncUpdate', { update });

        console.log(`Doc ${docId} updated and broadcasted`);
      }
    }
