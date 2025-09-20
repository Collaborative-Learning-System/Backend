import { Controller, Param, Post, Res } from '@nestjs/common';
import { DocumentsService } from '../services/documents.service';

@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }
    
    @Post('create-document/:userId')
    async createDocument(@Param('userId') userId: string, @Res() res) {
        console.log("test")
        const result = await this.documentsService.createDocument(userId);
        if (!result.success) {
            return res.status(400).json(result);
        }
        return res.status(201).json(result);
    }

    
}
