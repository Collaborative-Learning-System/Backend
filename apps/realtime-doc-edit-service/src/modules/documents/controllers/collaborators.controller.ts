import { Controller, Get, Param, Res } from "@nestjs/common";
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
}