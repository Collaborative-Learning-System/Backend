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
import {
  CreateQuizAttemptDto,
  UpdateQuizAttemptDto,
} from './dtos/quiz-attempt.dto';
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
    } catch (error) {
      console.error('Error creating quiz:', error);
      throw error;
    }
  }

  async completeQuizWithQuestions(
    completeQuizDto: CompleteQuizDto,
  ): Promise<Quiz> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const quiz = await queryRunner.manager.findOne(Quiz, {
        where: { quizId: completeQuizDto.quizId },
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

        const savedQuestion = await queryRunner.manager.save(
          Question,
          question,
        );

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

          const savedQuestion = await queryRunner.manager.save(
            Question,
            question,
          );

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

  async startQuizAttempt(
    createQuizAttemptDto: CreateQuizAttemptDto,
  ): Promise<{ attemptId: string }> {
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

  async saveUserAnswer(
    createAttemptAnswerDto: CreateAttemptAnswerDto,
  ): Promise<AttemptAnswer> {
    try {
      // Fetch the question with its options to validate the answer
      const question = await this.questionRepository.findOne({
        where: { questionId: createAttemptAnswerDto.questionId },
        relations: ['questionOptions'],
      });

      if (!question) {
        throw new Error('Question not found');
      }

      // Validate the answer based on question type
      let isCorrect: boolean | null = null;

      if (
        question.questionType === 'MCQ' &&
        createAttemptAnswerDto.selectedOptionId
      ) {
        // For Multiple Choice Questions, check if selected option is correct
        const selectedOption = question.questionOptions.find(
          (option) =>
            option.optionId === createAttemptAnswerDto.selectedOptionId,
        );
        isCorrect = selectedOption ? selectedOption.isCorrect : false;
      } else if (
        question.questionType === 'TRUE_FALSE' &&
        createAttemptAnswerDto.selectedOptionId
      ) {
        // For True/False Questions, check if selected option is correct
        const selectedOption = question.questionOptions.find(
          (option) =>
            option.optionId === createAttemptAnswerDto.selectedOptionId,
        );
        isCorrect = selectedOption ? selectedOption.isCorrect : false;
      } else if (
        question.questionType === 'SHORT_ANSWER' &&
        createAttemptAnswerDto.userAnswer
      ) {
        // For Short Answer Questions, compare with stored correct answer
        // Note: This is case-insensitive comparison, you might want to make it more sophisticated
        const userAnswer = createAttemptAnswerDto.userAnswer
          .trim()
          .toLowerCase();
        const correctAnswer = question.correctAnswer?.trim().toLowerCase();
        isCorrect = userAnswer === correctAnswer;
      }

      // Check if an answer for this question in this attempt already exists
      const existingAnswer = await this.attemptAnswerRepository.findOne({
        where: {
          attemptId: createAttemptAnswerDto.attemptId,
          questionId: createAttemptAnswerDto.questionId,
        },
      });

      if (existingAnswer) {
        // Update existing answer
        existingAnswer.selectedOptionId =
          createAttemptAnswerDto.selectedOptionId || null;
        existingAnswer.userAnswer = createAttemptAnswerDto.userAnswer || null;
        existingAnswer.isCorrect = isCorrect;

        const updatedAnswer =
          await this.attemptAnswerRepository.save(existingAnswer);
        return updatedAnswer;
      } else {
        // Create new answer
        const attemptAnswer = this.attemptAnswerRepository.create({
          attemptId: createAttemptAnswerDto.attemptId,
          questionId: createAttemptAnswerDto.questionId,
          selectedOptionId: createAttemptAnswerDto.selectedOptionId || null,
          userAnswer: createAttemptAnswerDto.userAnswer || null,
          isCorrect: isCorrect,
        });

        const savedAnswer =
          await this.attemptAnswerRepository.save(attemptAnswer);
        return savedAnswer;
      }
    } catch (error) {
      console.error('Error saving user answer:', error);
      throw error;
    }
  }

  async completeQuizAttempt(
    attemptId: string,
    userId: string,
  ): Promise<QuizAttempt> {
    try {
      // Find the quiz attempt
      const quizAttempt = await this.quizAttemptRepository.findOne({
        where: { attemptId, userId },
        relations: ['answers'],
      });

      if (!quizAttempt) {
        throw new Error('Quiz attempt not found');
      }

      if (quizAttempt.isCompleted) {
        throw new Error('Quiz attempt is already completed');
      }

      // Get all questions for the quiz with their points
      const questions = await this.questionRepository.find({
        where: { quizId: quizAttempt.quizId },
      });

      // Calculate total possible points
      const totalPossiblePoints = questions.reduce(
        (sum, question) => sum + question.points,
        0,
      );

      // Calculate user's score based on correct answers
      let userPoints = 0;
      const answers = await this.attemptAnswerRepository.find({
        where: { attemptId },
        relations: [],
      });

      // Create a map of questionId to question points for efficient lookup
      const questionPointsMap = new Map();
      questions.forEach((question) => {
        questionPointsMap.set(question.questionId, question.points);
      });

      // Calculate points from correct answers
      answers.forEach((answer) => {
        if (answer.isCorrect) {
          const questionPoints = questionPointsMap.get(answer.questionId) || 0;
          userPoints += questionPoints;
        }
      });

      // Calculate percentage score
      const percentageScore =
        totalPossiblePoints > 0 ? (userPoints / totalPossiblePoints) * 100 : 0;

      // Update the quiz attempt
      quizAttempt.score = Math.round(percentageScore * 100) / 100; // Round to 2 decimal places
      quizAttempt.isCompleted = true;

      const updatedAttempt = await this.quizAttemptRepository.save(quizAttempt);

      return updatedAttempt;
    } catch (error) {
      console.error('Error completing quiz attempt:', error);
      throw error;
    }
  }

  async getUserQuizAttempts(
    userId: string,
    quizId: string,
  ): Promise<{
    attempts: any[];
    bestScore: number;
    averageScore: number;
    totalAttempts: number;
  }> {
    try {
      // Fetch all attempts for the user on the specific quiz
      const attempts = await this.quizAttemptRepository.find({
        where: {
          userId,
          quizId,
          isCompleted: true,
        },
        order: { attemptAt: 'DESC' },
      });

      if (attempts.length === 0) {
        return {
          attempts: [],
          bestScore: 0,
          averageScore: 0,
          totalAttempts: 0,
        };
      }

      const questions = await this.questionRepository.find({
        where: { quizId },
      });

      const totalQuestions = questions.length;

      const formattedAttempts = attempts.map((attempt) => {
        const timeTaken = 0;

        return {
          id: attempt.attemptId,
          quizId: attempt.quizId,
          userId: attempt.userId,
          score: Math.round(attempt.score),
          totalQuestions: totalQuestions,
          percentage: attempt.score,
          startedAt: attempt.attemptAt.toISOString(),
          completedAt: attempt.attemptAt.toISOString(),

          status: attempt.isCompleted ? 'COMPLETED' : 'IN_PROGRESS',
        };
      });

      const scores = attempts
        .map((attempt) => parseFloat(attempt.score.toString()))
        .filter((score) => !isNaN(score));

      const bestScore = scores.length > 0 ? Math.max(...scores) : 0;
      const averageScore =
        scores.length > 0
          ? scores.reduce((sum, score) => sum + score, 0) / scores.length
          : 0;

      return {
        attempts: formattedAttempts,
        bestScore: Math.round(bestScore * 100) / 100,
        averageScore: Math.round(averageScore * 100) / 100,
        totalAttempts: attempts.length,
      };
    } catch (error) {
      console.error('Error fetching user quiz attempts:', error);
      throw error;
    }
  }

  async getQuizResultsForLeaderboard(groupId: string) {
    // Get all quizzes in the group
    const quizzes = await this.quizRepository.find({
      where: { groupId },
      select: ['quizId'],
    });

    if (!quizzes.length) return [];

    const quizIds = quizzes.map((q) => q.quizId);

    // Get leaderboard results
   const results = await this.quizAttemptRepository
     .createQueryBuilder('attempt')
     .innerJoin('attempt.user', 'user')
     .innerJoin('attempt.quiz', 'quiz')
     .select('user.userId', 'userId')
     .addSelect('user.fullName', 'name')
     .addSelect(
       `
      SUM(
        (attempt.score / 100) *
        CASE 
          WHEN quiz.difficulty = 'HARD' THEN 1.0
          WHEN quiz.difficulty = 'MEDIUM' THEN 0.9
          WHEN quiz.difficulty = 'EASY' THEN 0.8
          ELSE 1.0
        END
      )
      `,
       'totalPoints',
     )
     .addSelect('COUNT(DISTINCT attempt.quizId)', 'quizCount')
     .where('attempt.quizId IN (:...quizIds)', { quizIds })
     .andWhere((qb) => {
       const subQuery = qb
         .subQuery()
         .select('MIN(a2.attemptAt)')
         .from('quizattempt', 'a2')
         .where('a2.userId = attempt.userId')
         .andWhere('a2.quizId = attempt.quizId')
         .getQuery();
       return 'attempt.attemptAt = ' + subQuery;
     })
     .groupBy('user.userId')
     .addGroupBy('user.fullName')
     // Repeat the expression for PostgreSQL ORDER BY
     .orderBy(
       `
      SUM(
        (attempt.score / 100) *
        CASE 
          WHEN quiz.difficulty = 'HARD' THEN 1.0
          WHEN quiz.difficulty = 'MEDIUM' THEN 0.9
          WHEN quiz.difficulty = 'EASY' THEN 0.8
          ELSE 1.0
        END
      ) / COUNT(DISTINCT attempt.quizId)
      `,
       'DESC',
     )
     .getRawMany();

   return {
     success: true,
     data: results.map((r) => ({
       userId: r.userId,
       name: r.name,
       avgPoints: (Number(r.totalPoints) / Number(r.quizCount)).toFixed(2),
       totalPoints: Number(r.totalPoints).toFixed(2),
       quizzesTaken: Number(r.quizCount),
     })),
   };
  }
}
