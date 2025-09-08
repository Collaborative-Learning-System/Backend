import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Quiz } from './quiz.entity';
import { QuestionOption } from './question-option.entity';

@Entity('question')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  questionId: string;

  @Column({ type: 'uuid', nullable: false })
  quizId: string;

  @Column({ type: 'text', nullable: false })
  question: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    enum: ['MCQ', 'TRUE_FALSE', 'SHORT_ANSWER']
  })
  questionType?: 'MCQ' | 'TRUE_FALSE' | 'SHORT_ANSWER';

  @Column({ type: 'int', nullable: false, default: 1 })
  points: number;

  @Column({ type: 'text', nullable: true })
  correctAnswer?: string;

  // Relationship to Quiz
  @ManyToOne(() => Quiz, quiz => quiz.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz;

  // Relationship to Question Options
  @OneToMany(() => QuestionOption, questionOption => questionOption.question)
  questionOptions: QuestionOption[];

  
}