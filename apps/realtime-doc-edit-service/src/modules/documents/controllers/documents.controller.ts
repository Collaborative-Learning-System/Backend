import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { DocumentsService } from '../services/documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('create-document/:groupId')
  async createDocument(@Param('groupId') groupId: string, @Body() body: any, @Res() res) {
    const userId = body.userId;
    const result = await this.documentsService.createDocument(groupId, userId);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
    }
    
  @Get('get-documents/:groupId')
  async getDocuments(@Param('groupId') groupId: string, @Res() res) {
    const result = await this.documentsService.getDocuments(groupId);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  }

  @Get('get-document-data/:documentId')
  async getDocumentData(@Param('documentId') documentId: string, @Res() res) {
    const result = await this.documentsService.getDocumentData(documentId);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  }
}
