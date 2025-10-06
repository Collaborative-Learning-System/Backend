import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { AttemptAnswer } from "./attemptanswer.entity";
import { Quiz } from "./quiz.entity";
import { User } from "./user.entity";

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

    @ManyToOne(() => Quiz)
    @JoinColumn({ name: 'quizid' })
    quiz: Quiz;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userid' })
    user: User;
}