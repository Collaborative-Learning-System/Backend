import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documents } from '../entities/documents.entity';
import { Collaborators, UserRole } from '../entities/collaborators.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Documents)
    private readonly documentsRepository: Repository<Documents>,
    @InjectRepository(Collaborators)
    private readonly collaboratorRepository: Repository<Collaborators>,
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
      console.log('Document created:', newDocument);

      const collaborator = await this.collaboratorRepository.create({
        userId: userId,
        docId: newDocument.docId,
        role: UserRole.OWNER,
        joinedAt: new Date(),
        isActive: true,
      });
      await this.collaboratorRepository.save(collaborator);

      console.log('new Collaborator:', collaborator);

      return {
        success: true,
        document: newDocument,
        collaborator: collaborator,
      };
    } catch (error) {
      return { success: false, message: 'Failed to create document', error };
    }
  }

  async getDocuments(userId: string) {
    try {
      const docData = await this.collaboratorRepository.find({
        where: { userId },
        relations: ['document'],
      });

      const result = await Promise.all(
        docData.map(async (doc) => {
          const count = await this.collaboratorRepository.count({
            where: { docId: doc.docId },
          });

          return {
            documentId: doc.docId,
            documentTitle: doc.document.title,
            createdAt: doc.document.createdAt,
            role: doc.role,
            collaboratorCount: count,
          };
        }),
      );

      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: 'Failed to fetch documents', error };
    }
  }

  async getDocumentData(documentId: string) { 
    const doc = await this.documentsRepository.findOne({
      where: { docId: documentId },
    });
    if (!doc) {
      return { success: false, message: 'Document not found' };
    }
    return { success: true, data: doc};
  }
}
