import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { firstValueFrom } from 'rxjs';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(
    @Inject('workspace-group-service') private workspaceService: ClientProxy,
  ) {}

  @Get('history/:groupId')
  async getChatHistory(
    @Param('groupId') groupId: string,
    @Query('limit') limit: string = '50',
    @Query('offset') offset: string = '0',
    @Request() req: any,
  ) {
    try {
      const userId = req.user?.sub || req.user?.userId;

      const chatHistory = await firstValueFrom(
        this.workspaceService.send('get_chat_history', {
          userId,
          getChatHistoryDto: {
            groupId,
            limit: parseInt(limit),
            offset: parseInt(offset),
          },
        }),
      );

      return {
        success: true,
        data: chatHistory,
      };
    } catch (error) {
      console.error('Error getting chat history:', error);
      return {
        success: false,
        message: 'Failed to get chat history',
        error: error.message,
      };
    }
  }

  @Post('send')
  async sendMessage(
    @Body()
    body: {
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
    @Request() req: any,
  ) {
    const userId = req.user?.sub || req.user?.userId;
    try {
      console.log('[ChatController] sendMessage invoked', {
        userId,
        groupId: body?.groupId,
        hasText: Boolean(body?.text?.trim()),
        hasAttachment: Boolean(body?.attachment),
      });

      if (!body?.groupId) {
        return {
          success: false,
          message: 'Group ID is required',
        };
      }

      if (!body.text?.trim() && !body.attachment) {
        return {
          success: false,
          message: 'Message must include text or an attachmenyyyyyyt',
        };
      }

      const savedMessage = await firstValueFrom(
        this.workspaceService.send('send_chat_message', {
          userId,
          sendChatMessageDto: {
            groupId: body.groupId,
            text: body.text,
            attachment: body.attachment,
          },
        }),
      );

      console.log('[ChatController] Message persisted via REST', {
        chatId: savedMessage.chatId,
        groupId: savedMessage.groupId,
        userId: savedMessage.userId,
        messageType: savedMessage.messageType,
      });

      return {
        success: true,
        data: savedMessage,
      };
    } catch (error) {
      console.error('Error sending message:', error);
      console.error('[ChatController] sendMessage failed', {
        userId,
        groupId: body?.groupId,
        message: error?.message,
      });
      return {
        success: false,
        message: 'Failed to send message',
        error: error.message,
      };
    }
  }

  @Get('group/:groupId/members')
  async getGroupMembers(
    @Param('groupId') groupId: string,
    @Request() req: any,
  ) {
    try {
      const members = await firstValueFrom(
        this.workspaceService.send('get_group_members', {
          groupId,
        }),
      );

      return {
        success: true,
        data: members,
      };
    } catch (error) {
      console.error('Error getting group members:', error);
      return {
        success: false,
        message: 'Failed to get group members',
        error: error.message,
      };
    }
  }
}
