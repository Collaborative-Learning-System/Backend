import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documents } from '../entities/documents.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Documents)
    private readonly documentsRepository: Repository<Documents>,
  ) {}

  async createDocument(userId: string) {
    try {
      const newDocument = await this.documentsRepository.create({
        title: 'Untitled Document',
        ownerId: userId,
        createdAt: new Date(),
        lastEditedAt: new Date(),
      });
      await this.documentsRepository.save(newDocument);
      return { success: true, document: newDocument };
    } catch (error) {
      return { success: false, message: 'Failed to create document', error };
    }
  }
}
