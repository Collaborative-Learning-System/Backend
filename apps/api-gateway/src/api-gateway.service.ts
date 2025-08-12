import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiGatewayService {
  getHello(): string {
    return 'This is API-GATEWAY!';
  }
}
