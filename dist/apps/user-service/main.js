/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/user-service/src/entities/group.entity.ts":
/*!********************************************************!*\
  !*** ./apps/user-service/src/entities/group.entity.ts ***!
  \********************************************************/
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
exports.Group = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const workspace_entity_1 = __webpack_require__(/*! ./workspace.entity */ "./apps/user-service/src/entities/workspace.entity.ts");
let Group = class Group {
    groupid;
    workspaceid;
    groupname;
    description;
    workspace;
};
exports.Group = Group;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Group.prototype, "groupid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], Group.prototype, "workspaceid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Group.prototype, "groupname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Group.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workspace_entity_1.Workspace),
    (0, typeorm_1.JoinColumn)({ name: 'workspaceid' }),
    __metadata("design:type", typeof (_a = typeof workspace_entity_1.Workspace !== "undefined" && workspace_entity_1.Workspace) === "function" ? _a : Object)
], Group.prototype, "workspace", void 0);
exports.Group = Group = __decorate([
    (0, typeorm_1.Entity)('groups')
], Group);


/***/ }),

/***/ "./apps/user-service/src/entities/group_member.entity.ts":
/*!***************************************************************!*\
  !*** ./apps/user-service/src/entities/group_member.entity.ts ***!
  \***************************************************************/
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
exports.GroupMember = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const group_entity_1 = __webpack_require__(/*! ./group.entity */ "./apps/user-service/src/entities/group.entity.ts");
let GroupMember = class GroupMember {
    id;
    groupid;
    userid;
    group;
};
exports.GroupMember = GroupMember;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], GroupMember.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], GroupMember.prototype, "groupid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], GroupMember.prototype, "userid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.Group),
    (0, typeorm_1.JoinColumn)({ name: 'groupid' }),
    __metadata("design:type", typeof (_a = typeof group_entity_1.Group !== "undefined" && group_entity_1.Group) === "function" ? _a : Object)
], GroupMember.prototype, "group", void 0);
exports.GroupMember = GroupMember = __decorate([
    (0, typeorm_1.Entity)('group_member')
], GroupMember);


/***/ }),

/***/ "./apps/user-service/src/entities/workspace.entity.ts":
/*!************************************************************!*\
  !*** ./apps/user-service/src/entities/workspace.entity.ts ***!
  \************************************************************/
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
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
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

/***/ "./apps/user-service/src/entities/workspace_user.entity.ts":
/*!*****************************************************************!*\
  !*** ./apps/user-service/src/entities/workspace_user.entity.ts ***!
  \*****************************************************************/
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
exports.WorkspaceMember = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const workspace_entity_1 = __webpack_require__(/*! ./workspace.entity */ "./apps/user-service/src/entities/workspace.entity.ts");
let WorkspaceMember = class WorkspaceMember {
    userid;
    workspaceid;
    role;
    workspace;
};
exports.WorkspaceMember = WorkspaceMember;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'uuid' }),
    __metadata("design:type", String)
], WorkspaceMember.prototype, "userid", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'uuid' }),
    __metadata("design:type", String)
], WorkspaceMember.prototype, "workspaceid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'member' }),
    __metadata("design:type", String)
], WorkspaceMember.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workspace_entity_1.Workspace, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'workspaceid' }),
    __metadata("design:type", typeof (_a = typeof workspace_entity_1.Workspace !== "undefined" && workspace_entity_1.Workspace) === "function" ? _a : Object)
], WorkspaceMember.prototype, "workspace", void 0);
exports.WorkspaceMember = WorkspaceMember = __decorate([
    (0, typeorm_1.Entity)('workspace_user')
], WorkspaceMember);


/***/ }),

/***/ "./apps/user-service/src/main.ts":
/*!***************************************!*\
  !*** ./apps/user-service/src/main.ts ***!
  \***************************************/
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
const user_service_module_1 = __webpack_require__(/*! ./user-service.module */ "./apps/user-service/src/user-service.module.ts");
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const envPath = path.resolve(process.cwd(), 'apps', 'auth-service', '.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(user_service_module_1.UserServiceModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 3004,
        },
    });
    await app.listen();
    console.log("User Service is running on port 3004!");
}
bootstrap();


/***/ }),

/***/ "./apps/user-service/src/user-service.controller.ts":
/*!**********************************************************!*\
  !*** ./apps/user-service/src/user-service.controller.ts ***!
  \**********************************************************/
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
exports.UserServiceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_service_service_1 = __webpack_require__(/*! ./user-service.service */ "./apps/user-service/src/user-service.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let UserServiceController = class UserServiceController {
    userServiceService;
    constructor(userServiceService) {
        this.userServiceService = userServiceService;
    }
    getWorkspaceData(userId) {
        const result = this.userServiceService.getWorkspaceData(userId);
        return result;
    }
    getGroupData(groupId) {
        const result = this.userServiceService.getGroupData(groupId);
        return result;
    }
};
exports.UserServiceController = UserServiceController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-workspace-data' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserServiceController.prototype, "getWorkspaceData", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-group-data' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserServiceController.prototype, "getGroupData", null);
exports.UserServiceController = UserServiceController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_service_1.UserServiceService !== "undefined" && user_service_service_1.UserServiceService) === "function" ? _a : Object])
], UserServiceController);


/***/ }),

/***/ "./apps/user-service/src/user-service.module.ts":
/*!******************************************************!*\
  !*** ./apps/user-service/src/user-service.module.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserServiceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_service_controller_1 = __webpack_require__(/*! ./user-service.controller */ "./apps/user-service/src/user-service.controller.ts");
const user_service_service_1 = __webpack_require__(/*! ./user-service.service */ "./apps/user-service/src/user-service.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const group_member_entity_1 = __webpack_require__(/*! ./entities/group_member.entity */ "./apps/user-service/src/entities/group_member.entity.ts");
const group_entity_1 = __webpack_require__(/*! ./entities/group.entity */ "./apps/user-service/src/entities/group.entity.ts");
const workspace_entity_1 = __webpack_require__(/*! ./entities/workspace.entity */ "./apps/user-service/src/entities/workspace.entity.ts");
const workspace_user_entity_1 = __webpack_require__(/*! ./entities/workspace_user.entity */ "./apps/user-service/src/entities/workspace_user.entity.ts");
let UserServiceModule = class UserServiceModule {
};
exports.UserServiceModule = UserServiceModule;
exports.UserServiceModule = UserServiceModule = __decorate([
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
                        entities: [group_member_entity_1.GroupMember, group_entity_1.Group, workspace_entity_1.Workspace, workspace_user_entity_1.WorkspaceMember],
                        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
                        ssl: {
                            rejectUnauthorized: configService.get('DB_SSL_REJECT_UNAUTHORIZED') ===
                                'true',
                        },
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([group_member_entity_1.GroupMember, group_entity_1.Group, workspace_entity_1.Workspace, workspace_user_entity_1.WorkspaceMember]),
        ],
        controllers: [user_service_controller_1.UserServiceController],
        providers: [user_service_service_1.UserServiceService],
    })
], UserServiceModule);


/***/ }),

/***/ "./apps/user-service/src/user-service.service.ts":
/*!*******************************************************!*\
  !*** ./apps/user-service/src/user-service.service.ts ***!
  \*******************************************************/
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserServiceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const group_entity_1 = __webpack_require__(/*! ./entities/group.entity */ "./apps/user-service/src/entities/group.entity.ts");
const group_member_entity_1 = __webpack_require__(/*! ./entities/group_member.entity */ "./apps/user-service/src/entities/group_member.entity.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const workspace_user_entity_1 = __webpack_require__(/*! ./entities/workspace_user.entity */ "./apps/user-service/src/entities/workspace_user.entity.ts");
const workspace_entity_1 = __webpack_require__(/*! ./entities/workspace.entity */ "./apps/user-service/src/entities/workspace.entity.ts");
let UserServiceService = class UserServiceService {
    groupMemberRepository;
    workspaceMemberRepository;
    groupRepository;
    workspaceRepository;
    constructor(groupMemberRepository, workspaceMemberRepository, groupRepository, workspaceRepository) {
        this.groupMemberRepository = groupMemberRepository;
        this.workspaceMemberRepository = workspaceMemberRepository;
        this.groupRepository = groupRepository;
        this.workspaceRepository = workspaceRepository;
    }
    async getWorkspaceData(userId) {
        const memberships = await this.workspaceMemberRepository.find({
            where: { userid: userId },
            relations: ['workspace']
        });
        return {
            success: true,
            message: 'Workspace data fetched successfully',
            data: {
                count: memberships.length,
                workspaces: await Promise.all(memberships.map(async (m) => ({
                    id: m.workspace.workspaceid,
                    name: m.workspace.workspacename,
                    description: m.workspace.description,
                    memberCount: await this.countMembers(m.workspace.workspaceid),
                    role: m.role
                })))
            }
        };
    }
    async countMembers(workspaceId) {
        return await this.workspaceMemberRepository.count({
            where: { workspaceid: workspaceId }
        });
    }
    async getGroupData(userId) {
        const memberships = await this.groupMemberRepository.find({
            where: { userid: userId },
            relations: ['group']
        });
        return {
            success: true,
            message: 'Group data fetched successfully',
            data: {
                count: memberships.length,
                groups: memberships.map(m => ({
                    id: m.group.groupid,
                    name: m.group.groupname,
                }))
            }
        };
    }
};
exports.UserServiceService = UserServiceService;
exports.UserServiceService = UserServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(group_member_entity_1.GroupMember)),
    __param(1, (0, typeorm_1.InjectRepository)(workspace_user_entity_1.WorkspaceMember)),
    __param(2, (0, typeorm_1.InjectRepository)(group_entity_1.Group)),
    __param(3, (0, typeorm_1.InjectRepository)(workspace_entity_1.Workspace)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object])
], UserServiceService);


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
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/user-service/src/main.ts");
/******/ 	
/******/ })()
;