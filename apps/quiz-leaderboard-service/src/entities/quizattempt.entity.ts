import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { AttemptAnswer } from "./attemptanswer.entity";

@Entity('quizattempt') 
export class QuizAttempt {
    
    @PrimaryGeneratedColumn('uuid', { name: 'attemptid' }) 
    attemptId: string;

    @Column('uuid', { name: 'quizid' })
    quizId: string;

    @Column('uuid', { name: 'userid' })
    userId: string;

    @Column('decimal', { precision: 5, scale: 2, default: 0, name: 'score' })
    score: number;

    @CreateDateColumn({ name: 'attemptat' })
    attemptAt: Date;

    @Column('boolean', { default: false, name: 'iscompleted' })
    isCompleted: boolean;

    
    @OneToMany(() => AttemptAnswer, attemptAnswer => attemptAnswer.attempt)
    answers: AttemptAnswer[];
}