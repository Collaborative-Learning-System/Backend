import { Injectable } from '@nestjs/common';

@Injectable()
export class EduAssistantServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
