import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response = exception.getResponse();

    // Check if it's a validation error response
    if (
      typeof response === 'object' &&
      response['message'] &&
      Array.isArray(response['message'])
    ) {
      // Extract validation messages
      const validationErrors = response['message'];

      // Return formatted error response
      return {
        success: false,
        statusCode: 400,
        message: validationErrors,
       // errors: validationErrors,
      };
    }

    // For other BadRequestExceptions, return as is
    return {
      success: false,
      statusCode: 400,
      message: response['message'] || 'Bad Request',
    };
  }
}
