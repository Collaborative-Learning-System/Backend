import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkspaceGroupServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
