/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/workspace-group-service/src/entities/workspace-member.entity.ts":
/*!******************************************************************************!*\
  !*** ./apps/workspace-group-service/src/entities/workspace-member.entity.ts ***!
  \******************************************************************************/
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
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], WorkspaceMember.prototype, "userid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
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
let WorkspaceGroupServiceController = class WorkspaceGroupServiceController {
    workspaceGroupServiceService;
    constructor(workspaceGroupServiceService) {
        this.workspaceGroupServiceService = workspaceGroupServiceService;
    }
    async createWorkspace(data) {
        return this.workspaceGroupServiceService.createWorkspace(data.userId, data.createWorkspaceDto);
    }
    async joinWorkspace(data) {
        return this.workspaceGroupServiceService.joinWorkspace(data.userId, data.joinWorkspaceDto);
    }
    async getUserWorkspaces(data) {
        return this.workspaceGroupServiceService.getUserWorkspaces(data.userId);
    }
    async getWorkspaceById(data) {
        return this.workspaceGroupServiceService.getWorkspaceById(data.workspaceId, data.userId);
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
    (0, microservices_1.MessagePattern)('get_workspace_by_id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupServiceController.prototype, "getWorkspaceById", null);
exports.WorkspaceGroupServiceController = WorkspaceGroupServiceController = __decorate([
    (0, common_1.Controller)(),
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
const workspace_member_entity_1 = __webpack_require__(/*! ./entities/workspace-member.entity */ "./apps/workspace-group-service/src/entities/workspace-member.entity.ts");
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
                    const usePostgres = configService.get('USE_POSTGRES') === 'true';
                    if (usePostgres) {
                        return {
                            type: 'postgres',
                            host: configService.get('DB_HOST') || 'localhost',
                            port: configService.get('DB_PORT') || 5432,
                            username: configService.get('DB_USERNAME') || 'postgres',
                            password: configService.get('DB_PASSWORD') || 'password',
                            database: configService.get('DB_DATABASE') || 'collaborative_learning',
                            entities: [workspace_entity_1.Workspace, workspace_member_entity_1.WorkspaceMember],
                            synchronize: configService.get('DB_SYNCHRONIZE') === 'true' || false,
                            ssl: {
                                rejectUnauthorized: configService.get('DB_SSL_REJECT_UNAUTHORIZED') === 'true',
                            },
                        };
                    }
                    else {
                        return {
                            type: 'sqlite',
                            database: 'workspace_dev.db',
                            entities: [workspace_entity_1.Workspace, workspace_member_entity_1.WorkspaceMember],
                            synchronize: true,
                        };
                    }
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([workspace_entity_1.Workspace, workspace_member_entity_1.WorkspaceMember]),
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
const workspace_member_entity_1 = __webpack_require__(/*! ./entities/workspace-member.entity */ "./apps/workspace-group-service/src/entities/workspace-member.entity.ts");
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
        try {
            const workspace = this.workspaceRepository.create({
                workspacename: createWorkspaceDto.name,
                description: createWorkspaceDto.description,
            });
            const savedWorkspace = await this.workspaceRepository.save(workspace);
            const adminMember = this.workspaceMemberRepository.create({
                workspaceid: savedWorkspace.workspaceid,
                userid: userId,
                role: 'admin',
            });
            await this.workspaceMemberRepository.save(adminMember);
            return {
                id: savedWorkspace.workspaceid,
                name: savedWorkspace.workspacename,
                description: savedWorkspace.description,
                adminId: userId,
                role: 'admin',
            };
        }
        catch (error) {
            throw new common_1.ConflictException('Failed to create workspace');
        }
    }
    async joinWorkspace(userId, joinWorkspaceDto) {
        const { workspaceId } = joinWorkspaceDto;
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
            throw new common_1.ConflictException('User is already a member of this workspace');
        }
        const member = this.workspaceMemberRepository.create({
            workspaceid: workspaceId,
            userid: userId,
            role: 'member',
        });
        await this.workspaceMemberRepository.save(member);
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
        const userMemberships = await this.workspaceMemberRepository.find({
            where: { userid: userId },
        });
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
};
exports.WorkspaceGroupServiceService = WorkspaceGroupServiceService;
exports.WorkspaceGroupServiceService = WorkspaceGroupServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(workspace_entity_1.Workspace)),
    __param(1, (0, typeorm_1.InjectRepository)(workspace_member_entity_1.WorkspaceMember)),
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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**************************************************!*\
  !*** ./apps/workspace-group-service/src/main.ts ***!
  \**************************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const workspace_group_service_module_1 = __webpack_require__(/*! ./workspace-group-service.module */ "./apps/workspace-group-service/src/workspace-group-service.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
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

})();

/******/ })()
;