import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Res,
  HttpStatus,
  UseGuards,
  Inject,
  ParseIntPipe,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('api/study-plans')
export class EduAssistantGatewayController {
  constructor(
    @Inject('edu-assistant-service') private readonly eduAssistantClient: ClientProxy,
  ) {}

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async generateStudyPlan(@Body() generateStudyPlanData: any, @Res() res: Response) {
    try {
      const result = await lastValueFrom(
        this.eduAssistantClient.send({ cmd: 'generate-study-plan' }, generateStudyPlanData),
      );
      
      if (!result.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }
      
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to generate study plan',
        error: error.message,
      });
    }
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async getStudyPlansByUserId(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const result = await lastValueFrom(
        this.eduAssistantClient.send({ cmd: 'get-study-plans-by-user' }, { userId }),
      );
      
      if (!result.success) {
        return res.status(HttpStatus.NOT_FOUND).json(result);
      }
      
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to retrieve study plans',
        error: error.message,
      });
    }
  }

  @Get('plan/:id')
  @UseGuards(JwtAuthGuard)
  async getStudyPlan(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const result = await lastValueFrom(
        this.eduAssistantClient.send({ cmd: 'get-study-plan' }, { id }),
      );
      
      if (!result.success) {
        return res.status(HttpStatus.NOT_FOUND).json(result);
      }
      
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to retrieve study plan',
        error: error.message,
      });
    }
  }
  @Delete('delete-plan/:id')
  @UseGuards(JwtAuthGuard)
  async deleteStudyPlan(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const result = await lastValueFrom(
        this.eduAssistantClient.send({ cmd: 'delete-study-plan' }, { id }),
      );

      if (!result.success) {
        return res.status(HttpStatus.NOT_FOUND).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to delete study plan',
        error: error.message,
      });
    }
  }

  // Document Summarization Endpoints
  @Post('summarize/text')
  @UseGuards(JwtAuthGuard)
  async summarizeText(@Body() textSummarizationData: any, @Res() res: Response) {
    try {
      const result = await lastValueFrom(
        this.eduAssistantClient.send({ cmd: 'summarize-text' }, textSummarizationData),
      );
      
      if (!result.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }
      
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to summarize text',
        error: error.message,
      });
    }
  }

  @Post('summarize/file')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
    fileFilter: (req, file, callback) => {
      const allowedMimeTypes = ['text/plain']; // Temporarily only text files
      if (allowedMimeTypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new Error(`Unsupported file type: ${file.mimetype}. Currently only text files are supported.`), false);
      }
    },
  }))
  async summarizeFile(
    @UploadedFile() file: Express.Multer.File,
    @Query() query: any,
    @Res() res: Response,
  ) {
    try {
      if (!file) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'File is required',
        });
      }

      // Prepare data for microservice
      const fileData = {
        fileBuffer: file.buffer,
        fileName: file.originalname,
        mimeType: file.mimetype,
        options: {
          maxWords: query.maxWords ? parseInt(query.maxWords, 10) : 200,
          summaryType: query.summaryType || 'detailed',
        },
      };

      const result = await lastValueFrom(
        this.eduAssistantClient.send({ cmd: 'summarize-file' }, fileData),
      );
      
      if (!result.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }
      
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to summarize file',
        error: error.message,
      });
    }
  }
}  