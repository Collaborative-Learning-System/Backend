import { Entity, PrimaryGeneratedColumn , Column, OneToMany } from "typeorm";
import { Question } from './question.entity';

@Entity('quiz')

export class Quiz {
    @PrimaryGeneratedColumn('uuid', { name: 'quizid' })
    quizId: string;

    @Column({ type: 'uuid', nullable: false, name: 'groupid' })
    groupId: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'int', nullable: true, name: 'timelimit' })
    timeLimit?: number; 

    // @Column({ type: 'int', default: 0, name: 'fullmarks' })
    // fullMarks: number;

    @Column({
      type: 'varchar',
      length: 20,
      nullable: true,
      enum: ['EASY', 'MEDIUM', 'HARD']
     })
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD';

    @Column({ type: 'varchar', length: 500, nullable: true })
    instructions?: string;

    // Relationship to Questions
    @OneToMany(() => Question, question => question.quiz)
    questions: Question[];

}