import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { StudyTask } from './study-task.entity';

@Entity('study_plans')
export class StudyPlan {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'userid', type: 'uuid', nullable: false })
  userId: string;

  @Column({ name: 'subjects', type: 'varchar', length: 255, nullable: false })
  subjects: string;

  @Column({ name: 'studygoal', type: 'varchar', length: 100, nullable: false })
  studyGoal: string;

  @Column({ name: 'learningstyle', type: 'varchar', length: 100, nullable: false })
  learningStyle: string;

  @Column({ name: 'difficultylevel', type: 'varchar', length: 50, nullable: false })
  difficultyLevel: string;

  @Column({ name: 'startdate', type: 'date', nullable: false })
  startDate: Date;

  @Column({ name: 'enddate', type: 'date', nullable: false })
  endDate: Date;

  @Column({ name: 'dailyhours', type: 'double precision', nullable: false })
  dailyHours: number;

  @Column({ name: 'preferredtimeslots', type: 'varchar', length: 255, nullable: false })
  preferredTimeSlots: string;

  @Column({ name: 'include_regular_breaks', type: 'boolean', nullable: false })
  includeRegularBreaks: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @OneToMany(() => StudyTask, (studyTask) => studyTask.studyPlan, {
    cascade: true,
    eager: true,
  })
  tasks: StudyTask[];
}