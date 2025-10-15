import { Body, Controller, Get, Param, Post, Res, UseGuards } from "@nestjs/common";
import { CollaborationService } from "../services/collaboration.service";
import { JwtAuthGuard } from "../../../guards/jwt-auth.guard";

@Controller('collaborators')
@UseGuards(JwtAuthGuard)
export class CollaboratorsController {
  constructor(private readonly collaboratorService: CollaborationService) {}

  @Get('get-collaborators/:docId')
  async getColaborators(@Param('docId') docId: string, @Res() res) {
      const result = await this.collaboratorService.getCollaborators(docId);
      if (!result.success) return res.status(400).json(result)
      return res.status(200).json(result)
  }

  @Post('add-collaborator/:docId')
  async addCollaborator(@Param('docId') docId: string, @Body() body: any, @Res() res) {
      const userId = body.userId;
      const result = await this.collaboratorService.addCollaborator(docId, userId);
      if (!result.success) return res.status(400).json(result)
      return res.status(200).json(result)
  }

  @Post('remove-collaborator/:docId')
  async removeCollaborator(@Param('docId') docId: string, @Body() body: any, @Res() res) {
      const userId = body.userId;
      const result = await this.collaboratorService.removeCollaborator(docId, userId);
      if (!result.success) return res.status(400).json(result)
      return res.status(200).json(result)
  }

  @Get('get-online-users/:docId')
  async getOnlineUsers(@Param('docId') docId: string, @Res() res) {
      try {
          const users = await this.collaboratorService.getOnlineUsers(docId);
          return res.status(200).json({
              success: true,
              data: { users },
              message: 'Online users fetched successfully'
          });
      } catch (error) {
          return res.status(400).json({
              success: false,
              message: 'Failed to fetch online users',
              error: error.message
          });
      }
  }

}