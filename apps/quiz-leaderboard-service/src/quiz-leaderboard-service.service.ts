import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { QuestionOption } from './entities/question-option.entity';
import { QuizAttempt } from './entities/quizattempt.entity';
import { AttemptAnswer } from './entities/attemptAnswer.entity';
import { CreateQuizDto } from './dtos/quiz.dto';
import { CompleteQuizDto } from './dtos/complete-quiz.dto';
import { CreateQuestionDto } from './dtos/question.dto';
import { CreateQuizAttemptDto, UpdateQuizAttemptDto } from './dtos/quiz-attempt.dto';
import { CreateAttemptAnswerDto } from './dtos/attempt-answer.dto';

@Injectable()
export class QuizLeaderboardServiceService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(QuestionOption)
    private questionOptionRepository: Repository<QuestionOption>,
    @InjectRepository(QuizAttempt)
    private quizAttemptRepository: Repository<QuizAttempt>,
    @InjectRepository(AttemptAnswer)
    private attemptAnswerRepository: Repository<AttemptAnswer>,
    private dataSource: DataSource,
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

  async completeQuizWithQuestions(completeQuizDto: CompleteQuizDto): Promise<Quiz> {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Get the quiz
      const quiz = await queryRunner.manager.findOne(Quiz, {
        where: { quizId: completeQuizDto.quizId }
      });

      if (!quiz) {
        throw new Error('Quiz not found');
      }

      // Create questions and options
      for (const questionDto of completeQuizDto.questions) {
        
        const question = queryRunner.manager.create(Question, {
          quizId: quiz.quizId,
          question: questionDto.question,
          questionType: questionDto.questionType || 'MCQ',
          points: questionDto.points || 1,
          correctAnswer: questionDto.correctAnswer,
        });

        const savedQuestion = await queryRunner.manager.save(Question, question);

       
        if (questionDto.options && questionDto.options.length > 0) {
          for (const optionDto of questionDto.options) {
            const option = queryRunner.manager.create(QuestionOption, {
              questionId: savedQuestion.questionId,
              optionText: optionDto.optionText,
              isCorrect: optionDto.isCorrect || false,
            });

            await queryRunner.manager.save(QuestionOption, option);
          }
        }
      }

      await queryRunner.commitTransaction();

      // Return the complete quiz with questions and options
      const completeQuiz = await this.quizRepository.findOne({
        where: { quizId: quiz.quizId },
        relations: ['questions', 'questions.questionOptions'],
      });

      if (!completeQuiz) {
        throw new Error('Quiz not found after creation');
      }

      return completeQuiz;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error completing quiz with questions:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async createCompleteQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create quiz
      const quiz = queryRunner.manager.create(Quiz, {
        groupId: createQuizDto.groupId,
        title: createQuizDto.title,
        description: createQuizDto.description,
        timeLimit: createQuizDto.timeLimit,
        difficulty: createQuizDto.difficulty,
        instructions: createQuizDto.instructions,
      });

      const savedQuiz = await queryRunner.manager.save(Quiz, quiz);

      // Create questions and options if provided
      if (createQuizDto.questions && createQuizDto.questions.length > 0) {
        for (const questionDto of createQuizDto.questions) {
          // Create question
          const question = queryRunner.manager.create(Question, {
            quizId: savedQuiz.quizId,
            question: questionDto.question,
            questionType: questionDto.questionType || 'MCQ',
            points: questionDto.points || 1,
            correctAnswer: questionDto.correctAnswer,
          });

          const savedQuestion = await queryRunner.manager.save(Question, question);

          // Create options if provided
          if (questionDto.options && questionDto.options.length > 0) {
            for (const optionDto of questionDto.options) {
              const option = queryRunner.manager.create(QuestionOption, {
                questionId: savedQuestion.questionId,
                optionText: optionDto.optionText,
                isCorrect: optionDto.isCorrect || false,
              });

              await queryRunner.manager.save(QuestionOption, option);
            }
          }
        }
      }

      await queryRunner.commitTransaction();

      
      const completeQuiz = await this.quizRepository.findOne({
        where: { quizId: savedQuiz.quizId },
        relations: ['questions', 'questions.questionOptions'],
      });

      if (!completeQuiz) {
        throw new Error('Quiz not found after creation');
      }

      return completeQuiz;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error creating complete quiz:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getQuizByGroupId(groupId: string): Promise<Quiz[]> {
    try {
      const quizzes = await this.quizRepository.find({
        where: { groupId },
        relations: ['questions', 'questions.questionOptions'],
      });
      return quizzes;
    } catch (error) {
      console.error('Error fetching quizzes by groupId:', error);
      throw error;
    }
  }

  async getQuizById(quizId: string): Promise<Quiz> {
    try {
      const quiz = await this.quizRepository.findOne({
        where: { quizId },
        relations: ['questions', 'questions.questionOptions'],
      });

      if (!quiz) {
        throw new Error('Quiz not found');
      }

      return quiz;
    } catch (error) {
      console.error('Error fetching quiz by ID:', error);
      throw error;
    }
  }

  // 1. Start a Quiz Attempt
  async startQuizAttempt(createQuizAttemptDto: CreateQuizAttemptDto): Promise<{ attemptId: string }> {
    try {
      const quizAttempt = this.quizAttemptRepository.create({
        quizId: createQuizAttemptDto.quizId,
        userId: createQuizAttemptDto.userId,
        score: 0,
        isCompleted: false,
      });

      const savedAttempt = await this.quizAttemptRepository.save(quizAttempt);
      return { attemptId: savedAttempt.attemptId };
    } catch (error) {
      console.error('Error starting quiz attempt:', error);
      throw error;
    }
  }


}