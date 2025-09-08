import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { QuestionOption } from './entities/question-option.entity';
import { CreateQuizDto } from './dtos/quiz.dto';

@Injectable()
export class QuizLeaderboardServiceService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(QuestionOption)
    private questionOptionRepository: Repository<QuestionOption>,
  ) {}


  async createQuiz(CreateQuizDto: CreateQuizDto): Promise<Quiz> {
    try {
      const quiz = this.quizRepository.create({
        groupId: CreateQuizDto.groupId,
        title: CreateQuizDto.title,
        description: CreateQuizDto.description,
        timeLimit: CreateQuizDto.timeLimit,
        difficulty: CreateQuizDto.difficulty,
        instructions: CreateQuizDto.instructions,
      });

      const savedQuiz = await this.quizRepository.save(quiz);
      return savedQuiz;

    }
    catch (error) {
      console.error('Error creating quiz:', error);
      throw error;
    }

  }

  


}