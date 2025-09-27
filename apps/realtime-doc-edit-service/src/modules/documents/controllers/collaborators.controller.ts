import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { CollaborationService } from "../services/collaboration.service";

@Controller('collaborators')
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

}