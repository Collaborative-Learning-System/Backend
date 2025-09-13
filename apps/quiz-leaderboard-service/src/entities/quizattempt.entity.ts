import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { AttemptAnswer } from "./attemptAnswer.entity";

@Entity('quizAttempt')
export class QuizAttempt {
    
    @PrimaryGeneratedColumn('uuid')
    attemptId: string;

    @Column('uuid')
    quizId: string;

    @Column('uuid')
    userId: string;

    @Column('decimal', { precision: 5, scale: 2, default: 0 })
    score: number;

    @CreateDateColumn()
    attemptAt: Date;

    @Column('boolean', { default: false })
    isCompleted: boolean;

    // Relationship to AttemptAnswers
    @OneToMany(() => AttemptAnswer, attemptAnswer => attemptAnswer.attempt)
    answers: AttemptAnswer[];
}