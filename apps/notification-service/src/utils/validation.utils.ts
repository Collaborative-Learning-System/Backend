import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class ValidationUtils {
  static async validateAndFormat<T extends object>(
    dto: new () => T,
    data: any,
  ): Promise<{ isValid: boolean; errors?: string[]; data?: T }> {
    // Transform plain object to class instance
    const dtoInstance = plainToClass(dto, data);

    // Validate the instance
    const validationErrors = await validate(dtoInstance);

    if (validationErrors.length > 0) {
      // Extract error messages
      const errorMessages = validationErrors.map((error) =>
        Object.values(error.constraints || {}).join(', '),
      );

      return {
        isValid: false,
        errors: errorMessages,
      };
    }

    return {
      isValid: true,
      data: dtoInstance,
    };
  }
}
