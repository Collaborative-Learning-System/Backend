import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { DocumentsService } from '../services/documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('create-document/:userId')
  async createDocument(@Param('userId') userId: string, @Res() res) {
    const result = await this.documentsService.createDocument(userId);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  }

  @Get('get-documents/:userId')
  async getDocuments(@Param('userId') userId: string, @Res() res) {
    const result = await this.documentsService.getDocuments(userId);
    console.log('Documents fetched:', result);
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
