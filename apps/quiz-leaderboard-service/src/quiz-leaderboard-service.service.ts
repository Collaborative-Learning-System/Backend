import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizLeaderboardServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
