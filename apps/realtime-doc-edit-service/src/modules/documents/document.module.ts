import { Module } from "@nestjs/common";
import { DocumentsController } from "./controllers/documents.controller";
import { DocumentsService } from "./services/documents.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Documents } from "./entities/documents.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Documents])
    ],
    controllers: [DocumentsController],
    providers: [DocumentsService],
})

export class DocumentModule {}