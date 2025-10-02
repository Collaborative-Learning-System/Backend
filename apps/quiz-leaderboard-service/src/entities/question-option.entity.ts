import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity('questionoption')
export class QuestionOption {
  @PrimaryGeneratedColumn('uuid', { name: 'optionid' })
  optionId: string;

  @Column({ type: 'uuid', nullable: false, name: 'questionid' })
  questionId: string;

  @Column({ type: 'varchar', length: 250, nullable: false, name: 'optiontext' })
  optionText: string;

  @Column({ type: 'boolean', default: false, name: 'iscorrect' })
  isCorrect: boolean;

  // Relationship to Question
  @ManyToOne(() => Question, question => question.questionOptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'questionid' })
  question: Question;
}
