/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/workspace-group-service/src/entities/workspace.entity.ts":
/*!***********************************************************************!*\
  !*** ./apps/workspace-group-service/src/entities/workspace.entity.ts ***!
  \***********************************************************************/
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
exports.Workspace = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Workspace = class Workspace {
    workspaceid;
    workspacename;
    description;
};
exports.Workspace = Workspace;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Workspace.prototype, "workspaceid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Workspace.prototype, "workspacename", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Workspace.prototype, "description", void 0);
exports.Workspace = Workspace = __decorate([
    (0, typeorm_1.Entity)('workspace')
], Workspace);


/***/ }),

/***/ "./apps/workspace-group-service/src/entities/workspace_user.entity.ts":
/*!****************************************************************************!*\
  !*** ./apps/workspace-group-service/src/entities/workspace_user.entity.ts ***!
  \****************************************************************************/
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
exports.WorkspaceMember = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let WorkspaceMember = class WorkspaceMember {
    id;
    userid;
    workspaceid;
    role;
};
exports.WorkspaceMember = WorkspaceMember;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WorkspaceMember.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], WorkspaceMember.prototype, "userid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], WorkspaceMember.prototype, "workspaceid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'member' }),
    __metadata("design:type", String)
], WorkspaceMember.prototype, "role", void 0);
exports.WorkspaceMember = WorkspaceMember = __decorate([
    (0, typeorm_1.Entity)('workspace_user')
], WorkspaceMember);


/***/ }),

/***/ "./apps/workspace-group-service/src/filters/workspace-exception.filter.ts":
/*!********************************************************************************!*\
  !*** ./apps/workspace-group-service/src/filters/workspace-exception.filter.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkspaceExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let WorkspaceExceptionFilter = class WorkspaceExceptionFilter {
    catch(exception, host) {
        const response = exception.getResponse();
        let statusCode;
        let message;
        if (exception instanceof common_1.ConflictException) {
            statusCode = 409;
            message = typeof response === 'string' ? response : response['message'] || 'Conflict';
        }
        else if (exception instanceof common_1.NotFoundException) {
            statusCode = 404;
            message = typeof response === 'string' ? response : response['message'] || 'Not Found';
        }
        else if (exception instanceof common_1.BadRequestException) {
            statusCode = 400;
            message = typeof response === 'string' ? response : response['message'] || 'Bad Request';
        }
        else {
            statusCode = 500;
            message = 'Internal Server Error';
        }
        return {
            success: false,
            statusCode,
            message,
            timestamp: new Date().toISOString(),
        };
    }
};
exports.WorkspaceExceptionFilter = WorkspaceExceptionFilter;
exports.WorkspaceExceptionFilter = WorkspaceExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.ConflictException, common_1.NotFoundException, common_1.BadRequestException)
], WorkspaceExceptionFilter);


/***/ }),

/***/ "./apps/workspace-group-service/src/main.ts":
/*!**************************************************!*\
  !*** ./apps/workspace-group-service/src/main.ts ***!
  \**************************************************/
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
const workspace_group_service_module_1 = __webpack_require__(/*! ./workspace-group-service.module */ "./apps/workspace-group-service/src/workspace-group-service.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const envPath = path.resolve(process.cwd(), 'apps', 'auth-service', '.env');
dotenv.config({ path: envPath });
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(workspace_group_service_module_1.WorkspaceGroupServiceModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 3003,
        },
    });
    await app.listen();
}
bootstrap();


/***/ }),

/***/ "./apps/workspace-group-service/src/workspace-group-service.controller.ts":
/*!********************************************************************************!*\
  !*** ./apps/workspace-group-service/src/workspace-group-service.controller.ts ***!
  \********************************************************************************/
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
exports.WorkspaceGroupServiceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const workspace_group_service_service_1 = __webpack_require__(/*! ./workspace-group-service.service */ "./apps/workspace-group-service/src/workspace-group-service.service.ts");
const workspace_exception_filter_1 = __webpack_require__(/*! ./filters/workspace-exception.filter */ "./apps/workspace-group-service/src/filters/workspace-exception.filter.ts");
let WorkspaceGroupServiceController = class WorkspaceGroupServiceController {
    workspaceGroupServiceService;
    getHello() {
        throw new Error('Method not implemented.');
    }
    constructor(workspaceGroupServiceService) {
        this.workspaceGroupServiceService = workspaceGroupServiceService;
    }
    async createWorkspace(data) {
        console.log('Received data in workspace service:', data);
        console.log('UserId:', data.userId);
        console.log('CreateWorkspaceDto:', data.createWorkspaceDto);
        return this.workspaceGroupServiceService.createWorkspace(data.userId, data.createWorkspaceDto);
    }
    async joinWorkspace(data) {
        try {
            console.log('Join workspace request received:', data);
            console.log('UserId:', data.userId);
            console.log('JoinWorkspaceDto:', data.joinWorkspaceDto);
            return await this.workspaceGroupServiceService.joinWorkspace(data.userId, data.joinWorkspaceDto);
        }
        catch (error) {
            console.error('Error in joinWorkspace controller:', error);
            throw error;
        }
    }
    async getUserWorkspaces(data) {
        return this.workspaceGroupServiceService.getUserWorkspaces(data.userId);
    }
    async getAllWorkspaces() {
        return this.workspaceGroupServiceService.getAllWorkspaces();
    }
    async checkMembershipStatus(data) {
        try {
            console.log('Check membership status request:', data);
            return await this.workspaceGroupServiceService.checkMembershipStatus(data.userId, data.workspaceId);
        }
        catch (error) {
            console.error('Error in checkMembershipStatus controller:', error);
            throw error;
        }
    }
    async getWorkspaceDetails(data) {
        try {
            console.log('Get workspace details request:', data);
            return await this.workspaceGroupServiceService.getWorkspaceById(data.workspaceId, data.userId);
        }
        catch (error) {
            console.error('Error in getWorkspaceDetails controller:', error);
            throw error;
        }
    }
};
exports.WorkspaceGroupServiceController = WorkspaceGroupServiceController;
__decorate([
    (0, microservices_1.MessagePattern)('create_workspace'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupServiceController.prototype, "createWorkspace", null);
__decorate([
    (0, microservices_1.MessagePattern)('join_workspace'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupServiceController.prototype, "joinWorkspace", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_user_workspaces'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupServiceController.prototype, "getUserWorkspaces", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_all_workspaces'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkspaceGroupServiceController.prototype, "getAllWorkspaces", null);
__decorate([
    (0, microservices_1.MessagePattern)('check_membership_status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupServiceController.prototype, "checkMembershipStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_workspace_details'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupServiceController.prototype, "getWorkspaceDetails", null);
exports.WorkspaceGroupServiceController = WorkspaceGroupServiceController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseFilters)(workspace_exception_filter_1.WorkspaceExceptionFilter),
    __metadata("design:paramtypes", [typeof (_a = typeof workspace_group_service_service_1.WorkspaceGroupServiceService !== "undefined" && workspace_group_service_service_1.WorkspaceGroupServiceService) === "function" ? _a : Object])
], WorkspaceGroupServiceController);


/***/ }),

/***/ "./apps/workspace-group-service/src/workspace-group-service.module.ts":
/*!****************************************************************************!*\
  !*** ./apps/workspace-group-service/src/workspace-group-service.module.ts ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkspaceGroupServiceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const workspace_group_service_controller_1 = __webpack_require__(/*! ./workspace-group-service.controller */ "./apps/workspace-group-service/src/workspace-group-service.controller.ts");
const workspace_group_service_service_1 = __webpack_require__(/*! ./workspace-group-service.service */ "./apps/workspace-group-service/src/workspace-group-service.service.ts");
const workspace_entity_1 = __webpack_require__(/*! ./entities/workspace.entity */ "./apps/workspace-group-service/src/entities/workspace.entity.ts");
const workspace_user_entity_1 = __webpack_require__(/*! ./entities/workspace_user.entity */ "./apps/workspace-group-service/src/entities/workspace_user.entity.ts");
let WorkspaceGroupServiceModule = class WorkspaceGroupServiceModule {
};
exports.WorkspaceGroupServiceModule = WorkspaceGroupServiceModule;
exports.WorkspaceGroupServiceModule = WorkspaceGroupServiceModule = __decorate([
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
                        entities: [workspace_entity_1.Workspace, workspace_user_entity_1.WorkspaceMember],
                        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
                        ssl: {
                            rejectUnauthorized: configService.get('DB_SSL_REJECT_UNAUTHORIZED') ===
                                'true',
                        },
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([workspace_entity_1.Workspace, workspace_user_entity_1.WorkspaceMember]),
        ],
        controllers: [workspace_group_service_controller_1.WorkspaceGroupServiceController],
        providers: [workspace_group_service_service_1.WorkspaceGroupServiceService],
    })
], WorkspaceGroupServiceModule);


/***/ }),

/***/ "./apps/workspace-group-service/src/workspace-group-service.service.ts":
/*!*****************************************************************************!*\
  !*** ./apps/workspace-group-service/src/workspace-group-service.service.ts ***!
  \*****************************************************************************/
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
exports.WorkspaceGroupServiceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const workspace_entity_1 = __webpack_require__(/*! ./entities/workspace.entity */ "./apps/workspace-group-service/src/entities/workspace.entity.ts");
const workspace_user_entity_1 = __webpack_require__(/*! ./entities/workspace_user.entity */ "./apps/workspace-group-service/src/entities/workspace_user.entity.ts");
let WorkspaceGroupServiceService = class WorkspaceGroupServiceService {
    workspaceRepository;
    workspaceMemberRepository;
    constructor(workspaceRepository, workspaceMemberRepository) {
        this.workspaceRepository = workspaceRepository;
        this.workspaceMemberRepository = workspaceMemberRepository;
    }
    getHello() {
        return 'Hello World!';
    }
    async createWorkspace(userId, createWorkspaceDto) {
        console.log('Service method - userId:', userId);
        console.log('Service method - createWorkspaceDto:', createWorkspaceDto);
        const finalUserId = userId || 'test-user-id-12345';
        console.log('Final userId to use:', finalUserId);
        try {
            const workspace = this.workspaceRepository.create({
                workspacename: createWorkspaceDto.workspacename,
                description: createWorkspaceDto.description,
            });
            const savedWorkspace = await this.workspaceRepository.save(workspace);
            console.log('Saved Workspace:', savedWorkspace);
            const adminMember = this.workspaceMemberRepository.create({
                workspaceid: savedWorkspace.workspaceid,
                userid: finalUserId,
                role: 'admin',
            });
            console.log('Creating admin member:', adminMember);
            const savedMember = await this.workspaceMemberRepository.save(adminMember);
            console.log('Saved admin member:', savedMember);
            return {
                id: savedWorkspace.workspaceid,
                name: savedWorkspace.workspacename,
                description: savedWorkspace.description,
                adminId: finalUserId,
                role: 'admin',
            };
        }
        catch (error) {
            console.error('Error creating workspace:', error);
            throw new common_1.ConflictException('Failed to create workspace');
        }
    }
    async joinWorkspace(userId, joinWorkspaceDto) {
        const { workspaceId } = joinWorkspaceDto;
        if (!userId || !workspaceId) {
            throw new common_1.BadRequestException('User ID and Workspace ID are required');
        }
        const workspace = await this.workspaceRepository.findOne({
            where: { workspaceid: workspaceId },
        });
        if (!workspace) {
            throw new common_1.NotFoundException('Workspace not found');
        }
        const existingMember = await this.workspaceMemberRepository.findOne({
            where: { workspaceid: workspaceId, userid: userId },
        });
        if (existingMember) {
            if (existingMember.role === 'admin') {
                throw new common_1.ConflictException('You cannot join a workspace that you created. You are already the admin of this workspace.');
            }
            throw new common_1.ConflictException('You have already joined this workspace.');
        }
        try {
            const member = this.workspaceMemberRepository.create({
                workspaceid: workspaceId,
                userid: userId,
                role: 'member',
            });
            await this.workspaceMemberRepository.save(member);
        }
        catch (error) {
            console.error('Error saving workspace member:', error);
            throw new common_1.ConflictException('Failed to join workspace. Please try again.');
        }
        const memberCount = await this.workspaceMemberRepository.count({
            where: { workspaceid: workspaceId },
        });
        const adminMember = await this.workspaceMemberRepository.findOne({
            where: { workspaceid: workspaceId, role: 'admin' },
        });
        return {
            id: workspace.workspaceid,
            name: workspace.workspacename,
            description: workspace.description,
            adminId: adminMember?.userid || '',
            memberCount,
            role: 'member',
        };
    }
    async getUserWorkspaces(userId) {
        console.log('getUserWorkspaces called with userId:', userId);
        const userMemberships = await this.workspaceMemberRepository.find({
            where: { userid: userId },
        });
        console.log('Found memberships for user:', userMemberships);
        console.log('Number of memberships:', userMemberships.length);
        const workspaces = await Promise.all(userMemberships.map(async (membership) => {
            const workspace = await this.workspaceRepository.findOne({
                where: { workspaceid: membership.workspaceid },
            });
            if (!workspace) {
                return null;
            }
            const memberCount = await this.workspaceMemberRepository.count({
                where: { workspaceid: membership.workspaceid },
            });
            const adminMember = await this.workspaceMemberRepository.findOne({
                where: { workspaceid: membership.workspaceid, role: 'admin' },
            });
            return {
                id: workspace.workspaceid,
                name: workspace.workspacename,
                description: workspace.description,
                adminId: adminMember?.userid || '',
                memberCount,
                role: membership.role,
            };
        }));
        const validWorkspaces = workspaces.filter(workspace => workspace !== null);
        console.log('Final workspaces to return:', validWorkspaces);
        console.log('Total count:', validWorkspaces.length);
        return {
            workspaces: validWorkspaces,
            totalCount: validWorkspaces.length,
        };
    }
    async getWorkspaceById(workspaceId, userId) {
        const workspace = await this.workspaceRepository.findOne({
            where: { workspaceid: workspaceId },
        });
        if (!workspace) {
            throw new common_1.NotFoundException('Workspace not found');
        }
        const membership = await this.workspaceMemberRepository.findOne({
            where: { workspaceid: workspaceId, userid: userId },
        });
        if (!membership) {
            throw new common_1.BadRequestException('User is not a member of this workspace');
        }
        const memberCount = await this.workspaceMemberRepository.count({
            where: { workspaceid: workspaceId },
        });
        const adminMember = await this.workspaceMemberRepository.findOne({
            where: { workspaceid: workspaceId, role: 'admin' },
        });
        return {
            id: workspace.workspaceid,
            name: workspace.workspacename,
            description: workspace.description,
            adminId: adminMember?.userid || '',
            memberCount,
            role: membership.role,
        };
    }
    async getAllWorkspaces() {
        const workspaces = await this.workspaceRepository.find({
            select: ['workspaceid', 'workspacename'],
        });
        const workspaceList = workspaces.map(workspace => ({
            id: workspace.workspaceid,
            name: workspace.workspacename,
        }));
        return {
            workspaces: workspaceList,
            totalCount: workspaceList.length,
        };
    }
    async checkMembershipStatus(userId, workspaceId) {
        if (!userId || !workspaceId) {
            throw new common_1.BadRequestException('User ID and Workspace ID are required');
        }
        const workspace = await this.workspaceRepository.findOne({
            where: { workspaceid: workspaceId },
        });
        if (!workspace) {
            return {
                isMember: false,
                message: 'Workspace not found'
            };
        }
        const membership = await this.workspaceMemberRepository.findOne({
            where: { workspaceid: workspaceId, userid: userId },
        });
        if (!membership) {
            return {
                isMember: false,
                message: 'User is not a member of this workspace'
            };
        }
        return {
            isMember: true,
            role: membership.role,
            message: `User is a ${membership.role} of this workspace`
        };
    }
};
exports.WorkspaceGroupServiceService = WorkspaceGroupServiceService;
exports.WorkspaceGroupServiceService = WorkspaceGroupServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(workspace_entity_1.Workspace)),
    __param(1, (0, typeorm_1.InjectRepository)(workspace_user_entity_1.WorkspaceMember)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], WorkspaceGroupServiceService);


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
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/workspace-group-service/src/main.ts");
/******/ 	
/******/ })()
;