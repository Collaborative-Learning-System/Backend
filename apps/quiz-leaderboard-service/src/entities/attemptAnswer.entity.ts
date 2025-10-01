import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { QuizAttempt } from "./quizattempt.entity";

@Entity('attemptanswer')
export class AttemptAnswer {
    
    @PrimaryGeneratedColumn('uuid')
    attemptAnswerId: string;

    @Column('uuid')
    attemptId: string;

    @Column('uuid')
    questionId: string;

    @Column('uuid', { nullable: true })
    selectedOptionId: string | null;

    @Column('text', { nullable: true })
    userAnswer: string | null;

    @Column('boolean', { nullable: true })
    isCorrect: boolean | null;

    // Relationship to QuizAttempt
    @ManyToOne(() => QuizAttempt, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'attemptId' })
    attempt: QuizAttempt;
}
