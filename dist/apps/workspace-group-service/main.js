/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/workspace-group-service/src/entities/chat-message.entity.ts":
/*!**************************************************************************!*\
  !*** ./apps/workspace-group-service/src/entities/chat-message.entity.ts ***!
  \**************************************************************************/
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
exports.ChatMessage = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const group_entity_1 = __webpack_require__(/*! ./group.entity */ "./apps/workspace-group-service/src/entities/group.entity.ts");
let ChatMessage = class ChatMessage {
    chatid;
    groupid;
    userid;
    text;
    sentat;
    group;
};
exports.ChatMessage = ChatMessage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ChatMessage.prototype, "chatid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], ChatMessage.prototype, "groupid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], ChatMessage.prototype, "userid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ChatMessage.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ChatMessage.prototype, "sentat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.Group),
    (0, typeorm_1.JoinColumn)({ name: 'groupid' }),
    __metadata("design:type", typeof (_b = typeof group_entity_1.Group !== "undefined" && group_entity_1.Group) === "function" ? _b : Object)
], ChatMessage.prototype, "group", void 0);
exports.ChatMessage = ChatMessage = __decorate([
    (0, typeorm_1.Entity)('chat_messages')
], ChatMessage);


/***/ }),

/***/ "./apps/workspace-group-service/src/entities/group-member.entity.ts":
/*!**************************************************************************!*\
  !*** ./apps/workspace-group-service/src/entities/group-member.entity.ts ***!
  \**************************************************************************/
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
const group_entity_1 = __webpack_require__(/*! ./group.entity */ "./apps/workspace-group-service/src/entities/group.entity.ts");
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

/***/ "./apps/workspace-group-service/src/entities/group.entity.ts":
/*!*******************************************************************!*\
  !*** ./apps/workspace-group-service/src/entities/group.entity.ts ***!
  \*******************************************************************/
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
const workspace_entity_1 = __webpack_require__(/*! ./workspace.entity */ "./apps/workspace-group-service/src/entities/workspace.entity.ts");
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
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
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
        return this.workspaceGroupServiceService.createWorkspace(data.userId, data.createWorkspaceDto);
    }
    async joinWorkspace(data) {
        try {
            return await this.workspaceGroupServiceService.joinWorkspace(data.userId, data.joinWorkspaceDto);
        }
        catch (error) {
            console.error('Error in joinWorkspace controller:', error);
            throw error;
        }
    }
    async leaveWorkspace(data) {
        try {
            return await this.workspaceGroupServiceService.leaveWorkspace(data.userId, data.leaveWorkspaceDto);
        }
        catch (error) {
            console.error('Error in leaveWorkspace controller:', error);
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
    async createGroup(data) {
        try {
            console.log('Create group request:', data);
            return await this.workspaceGroupServiceService.createGroup(data.userId, data.workspaceId, data.createGroupDto);
        }
        catch (error) {
            console.error('Error in createGroup controller:', error);
            throw error;
        }
    }
    async getWorkspaceGroups(data) {
        try {
            console.log('Get workspace groups request:', data);
            return await this.workspaceGroupServiceService.getWorkspaceGroups(data.userId, data.workspaceId);
        }
        catch (error) {
            console.error('Error in getWorkspaceGroups controller:', error);
            throw error;
        }
    }
    async joinLeaveGroup(data) {
        try {
            console.log('Join/Leave group request:', data);
            return await this.workspaceGroupServiceService.joinLeaveGroup(data.userId, data.joinLeaveGroupDto);
        }
        catch (error) {
            console.error('Error in joinLeaveGroup controller:', error);
            throw error;
        }
    }
    async sendChatMessage(data) {
        try {
            console.log('Send chat message request:', data);
            return await this.workspaceGroupServiceService.sendChatMessage(data.userId, data.sendChatMessageDto);
        }
        catch (error) {
            console.error('Error in sendChatMessage controller:', error);
            throw error;
        }
    }
    async getChatHistory(data) {
        try {
            console.log('Get chat history request:', data);
            return await this.workspaceGroupServiceService.getChatHistory(data.userId, data.getChatHistoryDto);
        }
        catch (error) {
            console.error('Error in getChatHistory controller:', error);
            throw error;
        }
    }
    async getGroupMembers(data) {
        try {
            console.log('Get group members request:', data);
            return await this.workspaceGroupServiceService.getGroupMembers(data.groupId);
        }
        catch (error) {
            console.error('Error in getGroupMembers controller:', error);
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
    (0, microservices_1.MessagePattern)('leave_workspace'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupServiceController.prototype, "leaveWorkspace", null);
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
__decorate([
    (0, microservices_1.MessagePattern)('create_group'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupServiceController.prototype, "createGroup", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_workspace_groups'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupServiceController.prototype, "getWorkspaceGroups", null);
__decorate([
    (0, microservices_1.MessagePattern)('join_leave_group'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupServiceController.prototype, "joinLeaveGroup", null);
__decorate([
    (0, microservices_1.MessagePattern)('send_chat_message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupServiceController.prototype, "sendChatMessage", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_chat_history'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupServiceController.prototype, "getChatHistory", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_group_members'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupServiceController.prototype, "getGroupMembers", null);
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
const group_entity_1 = __webpack_require__(/*! ./entities/group.entity */ "./apps/workspace-group-service/src/entities/group.entity.ts");
const group_member_entity_1 = __webpack_require__(/*! ./entities/group-member.entity */ "./apps/workspace-group-service/src/entities/group-member.entity.ts");
const chat_message_entity_1 = __webpack_require__(/*! ./entities/chat-message.entity */ "./apps/workspace-group-service/src/entities/chat-message.entity.ts");
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
                        const config = {
                            type: 'postgres',
                            host: configService.get('DB_HOST') || 'localhost',
                            port: configService.get('DB_PORT') || 5432,
                            username: configService.get('DB_USERNAME') || 'postgres',
                            password: configService.get('DB_PASSWORD') || 'password',
                            database: configService.get('DB_DATABASE') || 'collaborative_learning',
                            entities: [workspace_entity_1.Workspace, workspace_user_entity_1.WorkspaceMember, group_entity_1.Group, group_member_entity_1.GroupMember, chat_message_entity_1.ChatMessage],
                            synchronize: configService.get('DB_SYNCHRONIZE') === 'true' || false,
                        };
                        if (configService.get('DB_SSL_ENABLED') === 'true') {
                            config.ssl = {
                                rejectUnauthorized: configService.get('DB_SSL_REJECT_UNAUTHORIZED') === 'true',
                            };
                        }
                        return config;
                    }
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([workspace_entity_1.Workspace, workspace_user_entity_1.WorkspaceMember, group_entity_1.Group, group_member_entity_1.GroupMember, chat_message_entity_1.ChatMessage]),
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkspaceGroupServiceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const workspace_entity_1 = __webpack_require__(/*! ./entities/workspace.entity */ "./apps/workspace-group-service/src/entities/workspace.entity.ts");
const workspace_user_entity_1 = __webpack_require__(/*! ./entities/workspace_user.entity */ "./apps/workspace-group-service/src/entities/workspace_user.entity.ts");
const group_entity_1 = __webpack_require__(/*! ./entities/group.entity */ "./apps/workspace-group-service/src/entities/group.entity.ts");
const group_member_entity_1 = __webpack_require__(/*! ./entities/group-member.entity */ "./apps/workspace-group-service/src/entities/group-member.entity.ts");
const chat_message_entity_1 = __webpack_require__(/*! ./entities/chat-message.entity */ "./apps/workspace-group-service/src/entities/chat-message.entity.ts");
let WorkspaceGroupServiceService = class WorkspaceGroupServiceService {
    workspaceRepository;
    workspaceMemberRepository;
    groupRepository;
    groupMemberRepository;
    chatMessageRepository;
    constructor(workspaceRepository, workspaceMemberRepository, groupRepository, groupMemberRepository, chatMessageRepository) {
        this.workspaceRepository = workspaceRepository;
        this.workspaceMemberRepository = workspaceMemberRepository;
        this.groupRepository = groupRepository;
        this.groupMemberRepository = groupMemberRepository;
        this.chatMessageRepository = chatMessageRepository;
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
    async leaveWorkspace(userId, leaveWorkspaceDto) {
        const { workspaceId } = leaveWorkspaceDto;
        if (!userId || !workspaceId) {
            throw new common_1.BadRequestException('User ID and Workspace ID are required');
        }
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
            throw new common_1.BadRequestException('You are not a member of this workspace');
        }
        if (membership.role === 'admin') {
            throw new common_1.BadRequestException('Workspace admins cannot leave their own workspace. You must transfer admin rights or delete the workspace instead.');
        }
        try {
            await this.workspaceMemberRepository.remove(membership);
            return {
                message: 'Successfully left the workspace'
            };
        }
        catch (error) {
            console.error('Error leaving workspace:', error);
            throw new common_1.ConflictException('Failed to leave workspace. Please try again.');
        }
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
    async createGroup(userId, workspaceId, createGroupDto) {
        if (!userId || !workspaceId) {
            throw new common_1.BadRequestException('User ID and Workspace ID are required');
        }
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
            throw new common_1.ForbiddenException('You are not a member of this workspace');
        }
        if (membership.role !== 'admin') {
            throw new common_1.ForbiddenException('Only workspace admins can create groups');
        }
        const existingGroup = await this.groupRepository.findOne({
            where: { workspaceid: workspaceId, groupname: createGroupDto.groupname },
        });
        if (existingGroup) {
            throw new common_1.ConflictException('A group with this name already exists in this workspace');
        }
        try {
            const group = this.groupRepository.create({
                workspaceid: workspaceId,
                groupname: createGroupDto.groupname,
                description: createGroupDto.description,
            });
            const savedGroup = await this.groupRepository.save(group);
            const groupMember = this.groupMemberRepository.create({
                groupid: savedGroup.groupid,
                userid: userId,
            });
            await this.groupMemberRepository.save(groupMember);
            return {
                id: savedGroup.groupid,
                name: savedGroup.groupname,
                description: savedGroup.description,
                workspaceId: savedGroup.workspaceid,
                isMember: true,
            };
        }
        catch (error) {
            console.error('Error creating group:', error);
            throw new common_1.ConflictException('Failed to create group');
        }
    }
    async getWorkspaceGroups(userId, workspaceId) {
        if (!userId || !workspaceId) {
            throw new common_1.BadRequestException('User ID and Workspace ID are required');
        }
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
            throw new common_1.ForbiddenException('You are not a member of this workspace');
        }
        const groups = await this.groupRepository.find({
            where: { workspaceid: workspaceId },
        });
        const groupList = await Promise.all(groups.map(async (group) => {
            const groupMembership = await this.groupMemberRepository.findOne({
                where: { groupid: group.groupid, userid: userId },
            });
            return {
                id: group.groupid,
                name: group.groupname,
                description: group.description,
                workspaceId: group.workspaceid,
                isMember: !!groupMembership,
            };
        }));
        return {
            groups: groupList,
            totalCount: groupList.length,
        };
    }
    async joinLeaveGroup(userId, joinLeaveGroupDto) {
        const { groupId } = joinLeaveGroupDto;
        if (!userId || !groupId) {
            throw new common_1.BadRequestException('User ID and Group ID are required');
        }
        const group = await this.groupRepository.findOne({
            where: { groupid: groupId },
        });
        if (!group) {
            throw new common_1.NotFoundException('Group not found');
        }
        const workspaceMembership = await this.workspaceMemberRepository.findOne({
            where: { workspaceid: group.workspaceid, userid: userId },
        });
        if (!workspaceMembership) {
            throw new common_1.ForbiddenException('You are not a member of the workspace that contains this group');
        }
        const groupMembership = await this.groupMemberRepository.findOne({
            where: { groupid: groupId, userid: userId },
        });
        try {
            if (groupMembership) {
                await this.groupMemberRepository.remove(groupMembership);
                return {
                    message: `Successfully left the group "${group.groupname}"`,
                    action: 'left',
                    groupId: group.groupid,
                    groupName: group.groupname,
                };
            }
            else {
                const newGroupMember = this.groupMemberRepository.create({
                    groupid: groupId,
                    userid: userId,
                });
                await this.groupMemberRepository.save(newGroupMember);
                return {
                    message: `Successfully joined the group "${group.groupname}"`,
                    action: 'joined',
                    groupId: group.groupid,
                    groupName: group.groupname,
                };
            }
        }
        catch (error) {
            console.error('Error in group join/leave operation:', error);
            throw new common_1.ConflictException('Failed to perform group operation. Please try again.');
        }
    }
    async sendChatMessage(userId, sendChatMessageDto) {
        const { groupId, text } = sendChatMessageDto;
        try {
            const group = await this.groupRepository.findOne({
                where: { groupid: groupId }
            });
            if (!group) {
                throw new common_1.NotFoundException(`Group with ID ${groupId} not found`);
            }
            const groupMember = await this.groupMemberRepository.findOne({
                where: { groupid: groupId, userid: userId }
            });
            if (!groupMember) {
                throw new common_1.ForbiddenException('You must be a member of the group to send messages');
            }
            const chatMessage = this.chatMessageRepository.create({
                groupid: groupId,
                userid: userId,
                text: text
            });
            const savedMessage = await this.chatMessageRepository.save(chatMessage);
            return {
                chatId: savedMessage.chatid,
                groupId: savedMessage.groupid,
                userId: savedMessage.userid,
                text: savedMessage.text,
                sentAt: savedMessage.sentat
            };
        }
        catch (error) {
            console.error('Error sending chat message:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.ConflictException('Failed to send message. Please try again.');
        }
    }
    async getChatHistory(userId, getChatHistoryDto) {
        const { groupId, limit = 50, offset = 0 } = getChatHistoryDto;
        try {
            const group = await this.groupRepository.findOne({
                where: { groupid: groupId }
            });
            if (!group) {
                throw new common_1.NotFoundException(`Group with ID ${groupId} not found`);
            }
            const groupMember = await this.groupMemberRepository.findOne({
                where: { groupid: groupId, userid: userId }
            });
            if (!groupMember) {
                throw new common_1.ForbiddenException('You must be a member of the group to view chat history');
            }
            const [messages, totalCount] = await this.chatMessageRepository.findAndCount({
                where: { groupid: groupId },
                order: { sentat: 'DESC' },
                take: limit,
                skip: offset
            });
            const chatMessages = messages.map(message => ({
                chatId: message.chatid,
                groupId: message.groupid,
                userId: message.userid,
                text: message.text,
                sentAt: message.sentat
            }));
            return {
                messages: chatMessages,
                totalCount
            };
        }
        catch (error) {
            console.error('Error getting chat history:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.ConflictException('Failed to retrieve chat history. Please try again.');
        }
    }
    async getGroupMembers(groupId) {
        try {
            const groupMembers = await this.groupMemberRepository.find({
                where: { groupid: groupId }
            });
            return groupMembers.map(member => member.userid);
        }
        catch (error) {
            console.error('Error getting group members:', error);
            throw new common_1.ConflictException('Failed to get group members. Please try again.');
        }
    }
};
exports.WorkspaceGroupServiceService = WorkspaceGroupServiceService;
exports.WorkspaceGroupServiceService = WorkspaceGroupServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(workspace_entity_1.Workspace)),
    __param(1, (0, typeorm_1.InjectRepository)(workspace_user_entity_1.WorkspaceMember)),
    __param(2, (0, typeorm_1.InjectRepository)(group_entity_1.Group)),
    __param(3, (0, typeorm_1.InjectRepository)(group_member_entity_1.GroupMember)),
    __param(4, (0, typeorm_1.InjectRepository)(chat_message_entity_1.ChatMessage)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object])
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