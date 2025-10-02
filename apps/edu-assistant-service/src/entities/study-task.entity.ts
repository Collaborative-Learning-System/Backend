import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { StudyPlan } from './study_plan.entity';

@Entity('studytasks')
export class StudyTask {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'planid', type: 'integer', nullable: false })
  planId: number;

  @Column({ name: 'seqorder', type: 'integer', nullable: false })
  seqOrder: number;

  @Column({ name: 'date', type: 'date', nullable: false })
  date: Date;

  @Column({ name: 'starttime', type: 'time without time zone', nullable: false })
  startTime: string;

  @Column({ name: 'endtime', type: 'time without time zone', nullable: false })
  endTime: string;

  @Column({ name: 'title', type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ name: 'description', type: 'text', nullable: false })
  description: string;

  @Column({ name: 'type', type: 'varchar', length: 20, nullable: false })
  type: string;

  @Column({ name: 'duration_minutes', type: 'integer', nullable: false })
  durationMinutes: number;

  @ManyToOne(() => StudyPlan, (studyPlan) => studyPlan.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'planid' })
  studyPlan: StudyPlan;
}