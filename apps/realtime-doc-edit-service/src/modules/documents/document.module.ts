import { Module } from "@nestjs/common";
import { DocumentsController } from "./controllers/documents.controller";
import { DocumentsService } from "./services/documents.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Documents } from "./entities/documents.entity";
import { Collaborators } from "./entities/collaborators.entity";
import { DocumentSnapshots } from "./entities/document-snapshots.entity";
import { User } from "./entities/user.entity";
import { CollaboratorsController } from "./controllers/collaborators.controller";
import { CollaborationService } from "./services/collaboration.service";
import { RedisService } from "../redis/redis.service";
import { DocGateway } from "./gateways/doc.gateway";

@Module({
    imports: [
        TypeOrmModule.forFeature([Documents, Collaborators, DocumentSnapshots, User])
    ],
    controllers: [DocumentsController, CollaboratorsController],
    providers: [DocumentsService, CollaborationService, RedisService, DocGateway],
})

export class DocumentModule {}