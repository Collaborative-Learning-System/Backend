import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Catch(ConflictException, NotFoundException, BadRequestException)
export class WorkspaceExceptionFilter implements ExceptionFilter {
  catch(exception: ConflictException | NotFoundException | BadRequestException, host: ArgumentsHost) {
    const response = exception.getResponse();
    let statusCode: number;
    let message: string;

    if (exception instanceof ConflictException) {
      statusCode = 409;
      message = typeof response === 'string' ? response : response['message'] || 'Conflict';
    } else if (exception instanceof NotFoundException) {
      statusCode = 404;
      message = typeof response === 'string' ? response : response['message'] || 'Not Found';
    } else if (exception instanceof BadRequestException) {
      statusCode = 400;
      message = typeof response === 'string' ? response : response['message'] || 'Bad Request';
    } else {
      statusCode = 500;
      message = 'Internal Server Error';
    }

    // Return formatted error response for microservice
    return {
      success: false,
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    };
  }
}
