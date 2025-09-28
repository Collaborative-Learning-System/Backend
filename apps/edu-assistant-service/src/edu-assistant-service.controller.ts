import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EduAssistantServiceService } from './edu-assistant-service.service';
import { GenerateStudyPlanDto } from './dtos/generate-study-plan.dto';

@Controller()
export class EduAssistantServiceController {
  constructor(private readonly eduAssistantServiceService: EduAssistantServiceService) {}

 

  @MessagePattern({ cmd: 'generate-study-plan' })
  async generateStudyPlan(generateStudyPlanDto: GenerateStudyPlanDto) {
    try {
      const result = await this.eduAssistantServiceService.generateStudyPlan(generateStudyPlanDto);
      return {
        success: true,
        data: result,
        message: 'Study plan generated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to generate study plan',
        error: error.message,
      };
    }
  }

  @MessagePattern({ cmd: 'get-study-plan' })
  async getStudyPlan(data: { id: number }) {
    try {
      const result = await this.eduAssistantServiceService.getStudyPlan(data.id);
      return {
        success: true,
        data: result,
        message: 'Study plan retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to retrieve study plan',
        error: error.message,
      };
    }
  }

  @MessagePattern({ cmd: 'get-study-plans-by-user' })
  async getStudyPlansByUserId(data: { userId: string }) {
    try {
      const result = await this.eduAssistantServiceService.getStudyPlansByUserId(data.userId);
      return {
        success: true,
        data: result,
        message: 'Study plans retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to retrieve study plans',
        error: error.message,
      };
    }
  }
}
