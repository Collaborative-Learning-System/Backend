import { Module } from "@nestjs/common";
import { DocumentsController } from "./controllers/documents.controller";
import { DocumentsService } from "./services/documents.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Documents } from "./entities/documents.entity";
import { Collaborators } from "./entities/collaborators.entity";
import { DocumentSnapshots } from "./entities/document-snapshots.entity";
import { User } from "./entities/user.entity";
import { CollaboratorsController } from "./controllers/collaborators.controller";
import { CollaborationService } from "./services/collaboration.service";
import { RedisService } from "../redis/redis.service";
import { DocGateway } from "./gateways/doc.gateway";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { WsJwtAuthGuard } from "../../guards/ws-jwt-auth.guard";

@Module({
    imports: [
        TypeOrmModule.forFeature([Documents, Collaborators, DocumentSnapshots, User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>('JWT_SECRET'),
            }),
        }),
    ],
    controllers: [DocumentsController, CollaboratorsController],
    providers: [DocumentsService, CollaborationService, RedisService, DocGateway, JwtAuthGuard, WsJwtAuthGuard],
})

export class DocumentModule {}