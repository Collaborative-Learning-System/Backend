import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity('questionOption')
export class QuestionOption {
  @PrimaryGeneratedColumn('uuid')
  optionId: string;

  @Column({ type: 'uuid', nullable: false })
  questionId: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  optionText: string;

  @Column({ type: 'boolean', default: false })
  isCorrect: boolean;

  // Relationship to Question
  @ManyToOne(() => Question, question => question.questionOptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'questionId' })
  question: Question;
}
