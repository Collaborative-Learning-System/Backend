import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyPlan } from './entities/study_plan.entity';
import { StudyTask } from './entities/study-task.entity';
import { GenerateStudyPlanDto } from './dtos/generate-study-plan.dto';
import { StudyPlanResponseDto, StudyTaskResponseDto } from './dtos/study-plan-response.dto';
import { GeminiService } from './services/gemini.service';

@Injectable()
export class EduAssistantServiceService {
  private readonly logger = new Logger(EduAssistantServiceService.name);

  constructor(
    @InjectRepository(StudyPlan)
    private readonly studyPlanRepository: Repository<StudyPlan>,
    @InjectRepository(StudyTask)
    private readonly studyTaskRepository: Repository<StudyTask>,
    private readonly geminiService: GeminiService,
  ) {}

  

  async generateStudyPlan(request: GenerateStudyPlanDto): Promise<StudyPlanResponseDto> {
    try {
      this.logger.log('Generating study plan for subjects:', request.subjects);

      // Call Gemini API to generate the study plan
      const aiResponse = await this.geminiService.generateStudyPlan(request);

      // Create and save the study plan entity
      const studyPlan = new StudyPlan();
      studyPlan.userId = request.userId;
      studyPlan.subjects = request.subjects;
      studyPlan.studyGoal = request.studygoal;
      studyPlan.learningStyle = request.learningstyle;
      studyPlan.difficultyLevel = request.difficultyLevel || 'intermediate';
      studyPlan.startDate = new Date(request.startDate);
      studyPlan.endDate = new Date(request.endDate);
      studyPlan.dailyHours = request.dailyHours;
      studyPlan.preferredTimeSlots = JSON.stringify(request.preferredTimeSlots);
      studyPlan.includeRegularBreaks = request.includeRegularBreaks;

      const savedPlan = await this.studyPlanRepository.save(studyPlan);
      this.logger.log('Study plan saved with ID:', savedPlan.id);

      // Create and save study tasks
      const tasks = aiResponse.tasks.map((task, index) => {
        const studyTask = new StudyTask();
        studyTask.planId = savedPlan.id;
        studyTask.seqOrder = index + 1;
        studyTask.date = new Date(task.date);
        studyTask.title = task.title;
        studyTask.description = task.description;
        studyTask.type = task.type;
        studyTask.durationMinutes = task.durationMinutes;
        studyTask.startTime = task.startTime;
        studyTask.endTime = task.endTime;
        return studyTask;
      });

      const savedTasks = await this.studyTaskRepository.save(tasks);
      this.logger.log(`Saved ${savedTasks.length} study tasks`);

      // Build and return the response
      return this.buildStudyPlanResponse(savedPlan, savedTasks, aiResponse.title);
    } catch (error) {
      this.logger.error('Error generating study plan:', error);
      throw new Error('Failed to generate study plan');
    }
  }

  private buildStudyPlanResponse(
    studyPlan: StudyPlan,
    tasks: StudyTask[],
    aiTitle: string,
  ): StudyPlanResponseDto {
    const taskResponses: StudyTaskResponseDto[] = tasks.map(task => ({
      id: task.id,
      date: task.date instanceof Date ? task.date.toISOString().split('T')[0] : task.date,
      title: task.title,
      description: task.description,
      type: task.type,
      durationMinutes: task.durationMinutes,
      startTime: task.startTime,
      endTime: task.endTime,
    }));

    return {
      planId: studyPlan.id,
      userId: studyPlan.userId,
      title: aiTitle,
      subjects: studyPlan.subjects,
      studyGoal: studyPlan.studyGoal,
      learningStyle: studyPlan.learningStyle,
      difficultyLevel: studyPlan.difficultyLevel,
      startDate: studyPlan.startDate instanceof Date ? studyPlan.startDate.toISOString().split('T')[0] : studyPlan.startDate,
      endDate: studyPlan.endDate instanceof Date ? studyPlan.endDate.toISOString().split('T')[0] : studyPlan.endDate,
      dailyHours: studyPlan.dailyHours,
      preferredTimeSlots: JSON.parse(studyPlan.preferredTimeSlots),
      includeRegularBreaks: studyPlan.includeRegularBreaks,
      createdAt: studyPlan.createdAt,
      tasks: taskResponses,
    };
  }

  async getStudyPlan(id: number): Promise<StudyPlanResponseDto> {
    const studyPlan = await this.studyPlanRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!studyPlan) {
      throw new Error('Study plan not found');
    }

    return this.buildStudyPlanResponse(studyPlan, studyPlan.tasks, `Study Plan ${id}`);
  }

  async getStudyPlansByUserId(userId: string): Promise<StudyPlanResponseDto[]> {
    const studyPlans = await this.studyPlanRepository.find({
      where: { userId },
      relations: ['tasks'],
      order: { createdAt: 'DESC' },
    });

    return studyPlans.map(plan => 
      this.buildStudyPlanResponse(plan, plan.tasks, `Study Plan ${plan.id}`)
    );
  }
}
