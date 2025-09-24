/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/realtime-doc-edit-service/src/main.ts":
/*!****************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/main.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const realtime_doc_edit_service_module_1 = __webpack_require__(/*! ./realtime-doc-edit-service.module */ "./apps/realtime-doc-edit-service/src/realtime-doc-edit-service.module.ts");
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const envPath = path.resolve(process.cwd(), 'apps', 'realtime-doc-edit-service', '.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });
async function bootstrap() {
    const app = await core_1.NestFactory.create(realtime_doc_edit_service_module_1.RealtimeDocEditServiceModule);
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'http://localhost:3000',
            'http://127.0.0.1:5500',
            'http://localhost:8080',
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    await app.startAllMicroservices();
    await app.listen(4000);
    console.log(`RealtimeDocEditService running:
   - HTTP/WebSockets on port 4000
   - TCP Microservice on port 3005
  `);
}
bootstrap();


/***/ }),

/***/ "./apps/realtime-doc-edit-service/src/modules/documents/controllers/collaborators.controller.ts":
/*!******************************************************************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/modules/documents/controllers/collaborators.controller.ts ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CollaboratorsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const collaboration_service_1 = __webpack_require__(/*! ../services/collaboration.service */ "./apps/realtime-doc-edit-service/src/modules/documents/services/collaboration.service.ts");
let CollaboratorsController = class CollaboratorsController {
    collaboratorService;
    constructor(collaboratorService) {
        this.collaboratorService = collaboratorService;
    }
    async getColaborators(docId, res) {
        const result = await this.collaboratorService.getCollaborators(docId);
        if (!result.success)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
};
exports.CollaboratorsController = CollaboratorsController;
__decorate([
    (0, common_1.Get)('get-collaborators/:docId'),
    __param(0, (0, common_1.Param)('docId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CollaboratorsController.prototype, "getColaborators", null);
exports.CollaboratorsController = CollaboratorsController = __decorate([
    (0, common_1.Controller)('collaborators'),
    __metadata("design:paramtypes", [typeof (_a = typeof collaboration_service_1.CollaborationService !== "undefined" && collaboration_service_1.CollaborationService) === "function" ? _a : Object])
], CollaboratorsController);


/***/ }),

/***/ "./apps/realtime-doc-edit-service/src/modules/documents/controllers/documents.controller.ts":
/*!**************************************************************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/modules/documents/controllers/documents.controller.ts ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const documents_service_1 = __webpack_require__(/*! ../services/documents.service */ "./apps/realtime-doc-edit-service/src/modules/documents/services/documents.service.ts");
let DocumentsController = class DocumentsController {
    documentsService;
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    async createDocument(userId, res) {
        const result = await this.documentsService.createDocument(userId);
        if (!result.success) {
            return res.status(400).json(result);
        }
        return res.status(201).json(result);
    }
    async getDocuments(userId, res) {
        const result = await this.documentsService.getDocuments(userId);
        console.log('Documents fetched:', result);
        if (!result.success) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    }
    async getDocumentData(documentId, res) {
        const result = await this.documentsService.getDocumentData(documentId);
        if (!result.success) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Post)('create-document/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "createDocument", null);
__decorate([
    (0, common_1.Get)('get-documents/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getDocuments", null);
__decorate([
    (0, common_1.Get)('get-document-data/:documentId'),
    __param(0, (0, common_1.Param)('documentId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getDocumentData", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [typeof (_a = typeof documents_service_1.DocumentsService !== "undefined" && documents_service_1.DocumentsService) === "function" ? _a : Object])
], DocumentsController);


/***/ }),

/***/ "./apps/realtime-doc-edit-service/src/modules/documents/document.module.ts":
/*!*********************************************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/modules/documents/document.module.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const documents_controller_1 = __webpack_require__(/*! ./controllers/documents.controller */ "./apps/realtime-doc-edit-service/src/modules/documents/controllers/documents.controller.ts");
const documents_service_1 = __webpack_require__(/*! ./services/documents.service */ "./apps/realtime-doc-edit-service/src/modules/documents/services/documents.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const documents_entity_1 = __webpack_require__(/*! ./entities/documents.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/documents.entity.ts");
const collaborators_entity_1 = __webpack_require__(/*! ./entities/collaborators.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/collaborators.entity.ts");
const document_snapshots_entity_1 = __webpack_require__(/*! ./entities/document-snapshots.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/document-snapshots.entity.ts");
const user_entity_1 = __webpack_require__(/*! ./entities/user.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/user.entity.ts");
const collaborators_controller_1 = __webpack_require__(/*! ./controllers/collaborators.controller */ "./apps/realtime-doc-edit-service/src/modules/documents/controllers/collaborators.controller.ts");
const collaboration_service_1 = __webpack_require__(/*! ./services/collaboration.service */ "./apps/realtime-doc-edit-service/src/modules/documents/services/collaboration.service.ts");
const redis_service_1 = __webpack_require__(/*! ../redis/redis.service */ "./apps/realtime-doc-edit-service/src/modules/redis/redis.service.ts");
const doc_gateway_1 = __webpack_require__(/*! ./gateways/doc.gateway */ "./apps/realtime-doc-edit-service/src/modules/documents/gateways/doc.gateway.ts");
let DocumentModule = class DocumentModule {
};
exports.DocumentModule = DocumentModule;
exports.DocumentModule = DocumentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([documents_entity_1.Documents, collaborators_entity_1.Collaborators, document_snapshots_entity_1.DocumentSnapshots, user_entity_1.User])
        ],
        controllers: [documents_controller_1.DocumentsController, collaborators_controller_1.CollaboratorsController],
        providers: [documents_service_1.DocumentsService, collaboration_service_1.CollaborationService, redis_service_1.RedisService, doc_gateway_1.DocGateway],
    })
], DocumentModule);


/***/ }),

/***/ "./apps/realtime-doc-edit-service/src/modules/documents/entities/collaborators.entity.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/modules/documents/entities/collaborators.entity.ts ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Collaborators = exports.UserRole = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/user.entity.ts");
const documents_entity_1 = __webpack_require__(/*! ./documents.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/documents.entity.ts");
var UserRole;
(function (UserRole) {
    UserRole["EDITOR"] = "editor";
    UserRole["VIEWER"] = "viewer";
    UserRole["OWNER"] = "owner";
})(UserRole || (exports.UserRole = UserRole = {}));
let Collaborators = class Collaborators {
    userId;
    docId;
    role;
    joinedAt;
    isActive;
    user;
    document;
};
exports.Collaborators = Collaborators;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'userid', type: 'uuid' }),
    __metadata("design:type", String)
], Collaborators.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'docid', type: 'uuid' }),
    __metadata("design:type", String)
], Collaborators.prototype, "docId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: UserRole, default: UserRole.EDITOR }),
    __metadata("design:type", String)
], Collaborators.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'joinedat', type: 'timestamp' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Collaborators.prototype, "joinedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'isactive', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Collaborators.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userid' }),
    __metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], Collaborators.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => documents_entity_1.Documents),
    (0, typeorm_1.JoinColumn)({ name: 'docid' }),
    __metadata("design:type", typeof (_c = typeof documents_entity_1.Documents !== "undefined" && documents_entity_1.Documents) === "function" ? _c : Object)
], Collaborators.prototype, "document", void 0);
exports.Collaborators = Collaborators = __decorate([
    (0, typeorm_1.Entity)('collaborators')
], Collaborators);


/***/ }),

/***/ "./apps/realtime-doc-edit-service/src/modules/documents/entities/document-snapshots.entity.ts":
/*!****************************************************************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/modules/documents/entities/document-snapshots.entity.ts ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentSnapshots = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let DocumentSnapshots = class DocumentSnapshots {
    id;
    docId;
    snapshot;
    createdAt;
};
exports.DocumentSnapshots = DocumentSnapshots;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'id' }),
    __metadata("design:type", String)
], DocumentSnapshots.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'docid' }),
    __metadata("design:type", String)
], DocumentSnapshots.prototype, "docId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bytea', name: 'snapshot' }),
    __metadata("design:type", typeof (_a = typeof Buffer !== "undefined" && Buffer) === "function" ? _a : Object)
], DocumentSnapshots.prototype, "snapshot", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'createdat', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], DocumentSnapshots.prototype, "createdAt", void 0);
exports.DocumentSnapshots = DocumentSnapshots = __decorate([
    (0, typeorm_1.Entity)('document_snapshots')
], DocumentSnapshots);


/***/ }),

/***/ "./apps/realtime-doc-edit-service/src/modules/documents/entities/documents.entity.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/modules/documents/entities/documents.entity.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Documents = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Documents = class Documents {
    docId;
    title;
    ownerId;
    createdAt;
    lastEditedAt;
};
exports.Documents = Documents;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'docid' }),
    __metadata("design:type", String)
], Documents.prototype, "docId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title', nullable: false, default: 'Untitled Document' }),
    __metadata("design:type", String)
], Documents.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ownerid', nullable: false }),
    __metadata("design:type", String)
], Documents.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'createdat', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Documents.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lasteditedat', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Documents.prototype, "lastEditedAt", void 0);
exports.Documents = Documents = __decorate([
    (0, typeorm_1.Entity)('documents')
], Documents);


/***/ }),

/***/ "./apps/realtime-doc-edit-service/src/modules/documents/entities/user.entity.ts":
/*!**************************************************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/modules/documents/entities/user.entity.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = exports.UserRole = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "user";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
    userId;
    fullName;
    email;
    password;
    role;
    bio;
    profilePicUrl;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'userid' }),
    __metadata("design:type", String)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fullname', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'role',
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bio', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'profilepicurl', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "profilePicUrl", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('user')
], User);


/***/ }),

/***/ "./apps/realtime-doc-edit-service/src/modules/documents/gateways/doc.gateway.ts":
/*!**************************************************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/modules/documents/gateways/doc.gateway.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocGateway = void 0;
const websockets_1 = __webpack_require__(/*! @nestjs/websockets */ "@nestjs/websockets");
const socket_io_1 = __webpack_require__(/*! socket.io */ "socket.io");
const Y = __importStar(__webpack_require__(/*! yjs */ "yjs"));
const collaboration_service_1 = __webpack_require__(/*! ../services/collaboration.service */ "./apps/realtime-doc-edit-service/src/modules/documents/services/collaboration.service.ts");
let DocGateway = class DocGateway {
    collabService;
    server;
    constructor(collabService) {
        this.collabService = collabService;
    }
    async handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    async handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    async handleJoinDoc(client, data) {
        const { docId, userId } = data;
        client.join(docId);
        console.log(`User ${userId} joined doc ${docId}`);
    }
    async handleSyncUpdate(client, data) {
        const { docId, update } = data;
        const ydoc = await this.collabService.loadDocument(docId);
        Y.applyUpdate(ydoc, new Uint8Array(update));
        await this.collabService.saveDocument(docId, ydoc);
        client.to(docId).emit('syncUpdate', { update });
        console.log(`Doc ${docId} updated and broadcasted`);
    }
};
exports.DocGateway = DocGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_b = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _b : Object)
], DocGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinDoc'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], DocGateway.prototype, "handleJoinDoc", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('syncUpdate'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", Promise)
], DocGateway.prototype, "handleSyncUpdate", null);
exports.DocGateway = DocGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof collaboration_service_1.CollaborationService !== "undefined" && collaboration_service_1.CollaborationService) === "function" ? _a : Object])
], DocGateway);


/***/ }),

/***/ "./apps/realtime-doc-edit-service/src/modules/documents/services/collaboration.service.ts":
/*!************************************************************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/modules/documents/services/collaboration.service.ts ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CollaborationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const Y = __importStar(__webpack_require__(/*! yjs */ "yjs"));
const redis_service_1 = __webpack_require__(/*! ../../redis/redis.service */ "./apps/realtime-doc-edit-service/src/modules/redis/redis.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const document_snapshots_entity_1 = __webpack_require__(/*! ../entities/document-snapshots.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/document-snapshots.entity.ts");
const user_entity_1 = __webpack_require__(/*! ../entities/user.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/user.entity.ts");
const collaborators_entity_1 = __webpack_require__(/*! ../entities/collaborators.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/collaborators.entity.ts");
let CollaborationService = class CollaborationService {
    redisService;
    docRepo;
    userRepo;
    collaboratorRepo;
    constructor(redisService, docRepo, userRepo, collaboratorRepo) {
        this.redisService = redisService;
        this.docRepo = docRepo;
        this.userRepo = userRepo;
        this.collaboratorRepo = collaboratorRepo;
    }
    async loadDocument(docId) {
        const cached = await this.redisService.getBuffer(`doc:${docId}`);
        const ydoc = new Y.Doc();
        if (cached) {
            Y.applyUpdate(ydoc, cached);
        }
        else {
            const doc = await this.docRepo.findOne({ where: { id: docId } });
            if (doc?.snapshot) {
                Y.applyUpdate(ydoc, doc.snapshot);
            }
        }
        return ydoc;
    }
    async saveDocument(docId, ydoc) {
        const update = Y.encodeStateAsUpdate(ydoc);
        await this.redisService.setBuffer(`doc:${docId}`, Buffer.from(update));
        await this.docRepo.update(docId, {
            snapshot: Buffer.from(update),
            createdAt: new Date(),
        });
    }
    async getCollaborators(docId) {
        console.log('test clb');
        const result = await this.collaboratorRepo.find({
            where: { docId: docId },
            relations: ['user'],
        });
        console.log(result);
        return {
            success: true,
            message: 'Collaborators fetched successfully',
            data: {
                collaborators: result.map((m) => ({
                    id: m.user.userId,
                    name: m.user.fullName,
                    role: m.user.role,
                })),
            },
        };
    }
};
exports.CollaborationService = CollaborationService;
exports.CollaborationService = CollaborationService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(document_snapshots_entity_1.DocumentSnapshots)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(collaborators_entity_1.Collaborators)),
    __metadata("design:paramtypes", [typeof (_a = typeof redis_service_1.RedisService !== "undefined" && redis_service_1.RedisService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object])
], CollaborationService);


/***/ }),

/***/ "./apps/realtime-doc-edit-service/src/modules/documents/services/documents.service.ts":
/*!********************************************************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/modules/documents/services/documents.service.ts ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const documents_entity_1 = __webpack_require__(/*! ../entities/documents.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/documents.entity.ts");
const collaborators_entity_1 = __webpack_require__(/*! ../entities/collaborators.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/collaborators.entity.ts");
let DocumentsService = class DocumentsService {
    documentsRepository;
    collaboratorRepository;
    constructor(documentsRepository, collaboratorRepository) {
        this.documentsRepository = documentsRepository;
        this.collaboratorRepository = collaboratorRepository;
    }
    async createDocument(userId) {
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
                role: collaborators_entity_1.UserRole.OWNER,
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
        }
        catch (error) {
            return { success: false, message: 'Failed to create document', error };
        }
    }
    async getDocuments(userId) {
        try {
            const docData = await this.collaboratorRepository.find({
                where: { userId },
                relations: ['document'],
            });
            const result = await Promise.all(docData.map(async (doc) => {
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
            }));
            return { success: true, data: result };
        }
        catch (error) {
            return { success: false, message: 'Failed to fetch documents', error };
        }
    }
    async getDocumentData(documentId) {
        const doc = await this.documentsRepository.findOne({
            where: { docId: documentId },
        });
        if (!doc) {
            return { success: false, message: 'Document not found' };
        }
        return { success: true, data: doc };
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(documents_entity_1.Documents)),
    __param(1, (0, typeorm_1.InjectRepository)(collaborators_entity_1.Collaborators)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], DocumentsService);


/***/ }),

/***/ "./apps/realtime-doc-edit-service/src/modules/redis/redis.service.ts":
/*!***************************************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/modules/redis/redis.service.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const ioredis_1 = __importDefault(__webpack_require__(/*! ioredis */ "ioredis"));
let RedisService = class RedisService {
    client;
    onModuleInit() {
        this.client = new ioredis_1.default({
            host: '127.0.0.1',
            port: 6379,
        });
    }
    onModuleDestroy() {
        return this.client.quit();
    }
    async getBuffer(key) {
        const data = await this.client.getBuffer(key);
        return data ? Buffer.from(data) : null;
    }
    async setBuffer(key, value, ttlSeconds) {
        if (ttlSeconds) {
            await this.client.set(key, value, 'EX', ttlSeconds);
        }
        else {
            await this.client.set(key, value);
        }
    }
    async publish(channel, message) {
        await this.client.publish(channel, message);
    }
    async subscribe(channel, handler) {
        const sub = new ioredis_1.default();
        await sub.subscribe(channel);
        sub.on('message', (_, message) => handler(message));
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)()
], RedisService);


/***/ }),

/***/ "./apps/realtime-doc-edit-service/src/realtime-doc-edit-service.controller.ts":
/*!************************************************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/realtime-doc-edit-service.controller.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RealtimeDocEditServiceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const realtime_doc_edit_service_service_1 = __webpack_require__(/*! ./realtime-doc-edit-service.service */ "./apps/realtime-doc-edit-service/src/realtime-doc-edit-service.service.ts");
let RealtimeDocEditServiceController = class RealtimeDocEditServiceController {
    realtimeDocEditServiceService;
    constructor(realtimeDocEditServiceService) {
        this.realtimeDocEditServiceService = realtimeDocEditServiceService;
    }
    getHello() {
        return this.realtimeDocEditServiceService.getHello();
    }
};
exports.RealtimeDocEditServiceController = RealtimeDocEditServiceController;
__decorate([
    (0, common_1.Get)('hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], RealtimeDocEditServiceController.prototype, "getHello", null);
exports.RealtimeDocEditServiceController = RealtimeDocEditServiceController = __decorate([
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [typeof (_a = typeof realtime_doc_edit_service_service_1.RealtimeDocEditServiceService !== "undefined" && realtime_doc_edit_service_service_1.RealtimeDocEditServiceService) === "function" ? _a : Object])
], RealtimeDocEditServiceController);


/***/ }),

/***/ "./apps/realtime-doc-edit-service/src/realtime-doc-edit-service.module.ts":
/*!********************************************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/realtime-doc-edit-service.module.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RealtimeDocEditServiceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const realtime_doc_edit_service_controller_1 = __webpack_require__(/*! ./realtime-doc-edit-service.controller */ "./apps/realtime-doc-edit-service/src/realtime-doc-edit-service.controller.ts");
const realtime_doc_edit_service_service_1 = __webpack_require__(/*! ./realtime-doc-edit-service.service */ "./apps/realtime-doc-edit-service/src/realtime-doc-edit-service.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const document_module_1 = __webpack_require__(/*! ./modules/documents/document.module */ "./apps/realtime-doc-edit-service/src/modules/documents/document.module.ts");
const documents_entity_1 = __webpack_require__(/*! ./modules/documents/entities/documents.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/documents.entity.ts");
const document_snapshots_entity_1 = __webpack_require__(/*! ./modules/documents/entities/document-snapshots.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/document-snapshots.entity.ts");
const collaborators_entity_1 = __webpack_require__(/*! ./modules/documents/entities/collaborators.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/collaborators.entity.ts");
const user_entity_1 = __webpack_require__(/*! ./modules/documents/entities/user.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/user.entity.ts");
let RealtimeDocEditServiceModule = class RealtimeDocEditServiceModule {
};
exports.RealtimeDocEditServiceModule = RealtimeDocEditServiceModule;
exports.RealtimeDocEditServiceModule = RealtimeDocEditServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    return {
                        type: 'postgres',
                        host: configService.get('DB_HOST'),
                        port: configService.get('DB_PORT'),
                        username: configService.get('DB_USERNAME'),
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_DATABASE'),
                        entities: [documents_entity_1.Documents, collaborators_entity_1.Collaborators, user_entity_1.User, document_snapshots_entity_1.DocumentSnapshots],
                        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
                        ssl: {
                            rejectUnauthorized: configService.get('DB_SSL_REJECT_UNAUTHORIZED') ===
                                'true',
                        },
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([
                documents_entity_1.Documents,
                collaborators_entity_1.Collaborators,
                user_entity_1.User,
                document_snapshots_entity_1.DocumentSnapshots,
            ]),
            document_module_1.DocumentModule,
        ],
        controllers: [realtime_doc_edit_service_controller_1.RealtimeDocEditServiceController],
        providers: [realtime_doc_edit_service_service_1.RealtimeDocEditServiceService],
    })
], RealtimeDocEditServiceModule);


/***/ }),

/***/ "./apps/realtime-doc-edit-service/src/realtime-doc-edit-service.service.ts":
/*!*********************************************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/realtime-doc-edit-service.service.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RealtimeDocEditServiceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let RealtimeDocEditServiceService = class RealtimeDocEditServiceService {
    getHello() {
        return 'Hello World!';
    }
};
exports.RealtimeDocEditServiceService = RealtimeDocEditServiceService;
exports.RealtimeDocEditServiceService = RealtimeDocEditServiceService = __decorate([
    (0, common_1.Injectable)()
], RealtimeDocEditServiceService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "@nestjs/websockets":
/*!*************************************!*\
  !*** external "@nestjs/websockets" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "ioredis":
/*!**************************!*\
  !*** external "ioredis" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "yjs":
/*!**********************!*\
  !*** external "yjs" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("yjs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/realtime-doc-edit-service/src/main.ts");
/******/ 	
/******/ })()
;