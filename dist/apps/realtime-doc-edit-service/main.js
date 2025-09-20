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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const envPath = path.resolve(process.cwd(), 'apps', 'realtime-doc-edit-service', '.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });
async function bootstrap() {
    const app = await core_1.NestFactory.create(realtime_doc_edit_service_module_1.RealtimeDocEditServiceModule);
    app.enableCors({
        origin: '*',
    });
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 3005,
        },
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

/***/ "./apps/realtime-doc-edit-service/src/modules/collaborators/collaborators.module.ts":
/*!******************************************************************************************!*\
  !*** ./apps/realtime-doc-edit-service/src/modules/collaborators/collaborators.module.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CollaboratorsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let CollaboratorsModule = class CollaboratorsModule {
};
exports.CollaboratorsModule = CollaboratorsModule;
exports.CollaboratorsModule = CollaboratorsModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: [],
    })
], CollaboratorsModule);


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
        console.log("test");
        const result = await this.documentsService.createDocument(userId);
        if (!result.success) {
            return res.status(400).json(result);
        }
        return res.status(201).json(result);
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
let DocumentModule = class DocumentModule {
};
exports.DocumentModule = DocumentModule;
exports.DocumentModule = DocumentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([documents_entity_1.Documents])
        ],
        controllers: [documents_controller_1.DocumentsController],
        providers: [documents_service_1.DocumentsService],
    })
], DocumentModule);


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
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
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
    __metadata("design:type", typeof (_a = typeof typeorm_1.Timestamp !== "undefined" && typeorm_1.Timestamp) === "function" ? _a : Object)
], Documents.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lastEditedAt', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_b = typeof typeorm_1.Timestamp !== "undefined" && typeorm_1.Timestamp) === "function" ? _b : Object)
], Documents.prototype, "lastEditedAt", void 0);
exports.Documents = Documents = __decorate([
    (0, typeorm_1.Entity)('documents')
], Documents);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const documents_entity_1 = __webpack_require__(/*! ../entities/documents.entity */ "./apps/realtime-doc-edit-service/src/modules/documents/entities/documents.entity.ts");
let DocumentsService = class DocumentsService {
    documentsRepository;
    constructor(documentsRepository) {
        this.documentsRepository = documentsRepository;
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
            return { success: true, document: newDocument };
        }
        catch (error) {
            return { success: false, message: 'Failed to create document', error };
        }
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(documents_entity_1.Documents)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DocumentsService);


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
const collaborators_module_1 = __webpack_require__(/*! ./modules/collaborators/collaborators.module */ "./apps/realtime-doc-edit-service/src/modules/collaborators/collaborators.module.ts");
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
                        entities: [documents_entity_1.Documents],
                        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
                        ssl: {
                            rejectUnauthorized: configService.get('DB_SSL_REJECT_UNAUTHORIZED') ===
                                'true',
                        },
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([documents_entity_1.Documents]),
            document_module_1.DocumentModule,
            collaborators_module_1.CollaboratorsModule
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

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

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