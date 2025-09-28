/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api-gateway/src/api-gateway.controller.ts":
/*!********************************************************!*\
  !*** ./apps/api-gateway/src/api-gateway.controller.ts ***!
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
exports.ApiGatewayController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const api_gateway_service_1 = __webpack_require__(/*! ./api-gateway.service */ "./apps/api-gateway/src/api-gateway.service.ts");
let ApiGatewayController = class ApiGatewayController {
    apiGatewayService;
    constructor(apiGatewayService) {
        this.apiGatewayService = apiGatewayService;
    }
};
exports.ApiGatewayController = ApiGatewayController;
exports.ApiGatewayController = ApiGatewayController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof api_gateway_service_1.ApiGatewayService !== "undefined" && api_gateway_service_1.ApiGatewayService) === "function" ? _a : Object])
], ApiGatewayController);


/***/ }),

/***/ "./apps/api-gateway/src/api-gateway.module.ts":
/*!****************************************************!*\
  !*** ./apps/api-gateway/src/api-gateway.module.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiGatewayModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const api_gateway_controller_1 = __webpack_require__(/*! ./api-gateway.controller */ "./apps/api-gateway/src/api-gateway.controller.ts");
const api_gateway_service_1 = __webpack_require__(/*! ./api-gateway.service */ "./apps/api-gateway/src/api-gateway.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const authGateway_controller_1 = __webpack_require__(/*! ./auth/authGateway.controller */ "./apps/api-gateway/src/auth/authGateway.controller.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const jwt_auth_guard_1 = __webpack_require__(/*! ./jwt-auth.guard */ "./apps/api-gateway/src/jwt-auth.guard.ts");
const ws_jwt_auth_guard_1 = __webpack_require__(/*! ./ws-jwt-auth.guard */ "./apps/api-gateway/src/ws-jwt-auth.guard.ts");
const notificationGateway_controller_1 = __webpack_require__(/*! ./notification/notificationGateway.controller */ "./apps/api-gateway/src/notification/notificationGateway.controller.ts");
const workspaceGateway_controller_1 = __webpack_require__(/*! ./workspace/workspaceGateway.controller */ "./apps/api-gateway/src/workspace/workspaceGateway.controller.ts");
const quizGateway_controller_1 = __webpack_require__(/*! ./quiz/quizGateway.controller */ "./apps/api-gateway/src/quiz/quizGateway.controller.ts");
const eduAssistantGateway_controller_1 = __webpack_require__(/*! ./edu-assistant/eduAssistantGateway.controller */ "./apps/api-gateway/src/edu-assistant/eduAssistantGateway.controller.ts");
const chat_gateway_1 = __webpack_require__(/*! ./chat/chat.gateway */ "./apps/api-gateway/src/chat/chat.gateway.ts");
const chat_controller_1 = __webpack_require__(/*! ./chat/chat.controller */ "./apps/api-gateway/src/chat/chat.controller.ts");
let ApiGatewayModule = class ApiGatewayModule {
};
exports.ApiGatewayModule = ApiGatewayModule;
exports.ApiGatewayModule = ApiGatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: '1234567890',
                signOptions: { expiresIn: '1h' },
            }),
            microservices_1.ClientsModule.register([
                {
                    name: 'auth-service',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: 3001,
                    },
                },
                {
                    name: 'notification-service',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: 3002,
                    },
                },
                {
                    name: 'workspace-group-service',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: 3003,
                    },
                },
                {
                    name: 'quiz-leaderboard-service',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: 3006,
                    },
                },
                {
                    name: 'edu-assistant-service',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: 3007,
                    },
                }
            ]),
        ],
        controllers: [api_gateway_controller_1.ApiGatewayController, authGateway_controller_1.AuthGatewayController, notificationGateway_controller_1.NotificationGatewayController, workspaceGateway_controller_1.WorkspaceGatewayController, quizGateway_controller_1.QuizGatewayController, eduAssistantGateway_controller_1.EduAssistantGatewayController, chat_controller_1.ChatController],
        providers: [api_gateway_service_1.ApiGatewayService, jwt_auth_guard_1.JwtAuthGuard, ws_jwt_auth_guard_1.WsJwtAuthGuard, chat_gateway_1.ChatGateway],
        exports: [jwt_auth_guard_1.JwtAuthGuard],
    })
], ApiGatewayModule);


/***/ }),

/***/ "./apps/api-gateway/src/api-gateway.service.ts":
/*!*****************************************************!*\
  !*** ./apps/api-gateway/src/api-gateway.service.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiGatewayService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let ApiGatewayService = class ApiGatewayService {
};
exports.ApiGatewayService = ApiGatewayService;
exports.ApiGatewayService = ApiGatewayService = __decorate([
    (0, common_1.Injectable)()
], ApiGatewayService);


/***/ }),

/***/ "./apps/api-gateway/src/auth/authGateway.controller.ts":
/*!*************************************************************!*\
  !*** ./apps/api-gateway/src/auth/authGateway.controller.ts ***!
  \*************************************************************/
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
exports.AuthGatewayController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_auth_guard_1 = __webpack_require__(/*! ../jwt-auth.guard */ "./apps/api-gateway/src/jwt-auth.guard.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let AuthGatewayController = class AuthGatewayController {
    authClient;
    constructor(authClient) {
        this.authClient = authClient;
    }
    async signup(signupData, res) {
        const result = await (0, rxjs_1.lastValueFrom)(this.authClient.send({ cmd: 'signup' }, signupData));
        if (!result.success) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(common_1.HttpStatus.CREATED).json(result);
    }
    async login(loginData, res) {
        const result = await (0, rxjs_1.lastValueFrom)(this.authClient.send({ cmd: 'login' }, loginData));
        if (result.success) {
            const accessToken = result.data.tokens.accessToken;
            const refreshToken = result.data.tokens.refreshToken;
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
            });
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        else {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
        }
    }
    async logOut(res, userId) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        const result = await (0, rxjs_1.lastValueFrom)(this.authClient.send({ cmd: 'logout' }, userId));
        if (result.success) {
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        else {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
        }
    }
    async resetPassword(res, resetData) {
        console.log(resetData);
        const { email, newPassword } = resetData;
        if (!email || !newPassword) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Email and new password are required',
            });
        }
        const result = await (0, rxjs_1.lastValueFrom)(this.authClient.send({ cmd: 'reset-password' }, resetData));
        console.log(result);
        if (result.success) {
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        else {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
        }
    }
    async getUserData(res, userId) {
        const result = await (0, rxjs_1.lastValueFrom)(this.authClient.send({ cmd: 'get-user-data' }, userId));
        if (result.success) {
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        else {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
        }
    }
    async refreshToken(res, refreshToken) {
        const result = await (0, rxjs_1.lastValueFrom)(this.authClient.send({ cmd: 'refresh-token' }, refreshToken));
        if (result.success) {
            res.clearCookie('accessToken');
            const accessToken = result.data.tokens.accessToken;
            const refreshToken = result.data.tokens.refreshToken;
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
            });
            console.log("result at gateway :", result);
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        else {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json(result);
        }
    }
    async updateProfile(updateData, res) {
        const result = await (0, rxjs_1.lastValueFrom)(this.authClient.send({ cmd: 'update-profile' }, updateData));
        if (result.success) {
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        else {
            console.log("result at gateway:", result);
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
        }
    }
};
exports.AuthGatewayController = AuthGatewayController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthGatewayController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthGatewayController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthGatewayController.prototype, "logOut", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthGatewayController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('get-user-data/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthGatewayController.prototype, "getUserData", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthGatewayController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('update-profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthGatewayController.prototype, "updateProfile", null);
exports.AuthGatewayController = AuthGatewayController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)('auth-service')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], AuthGatewayController);


/***/ }),

/***/ "./apps/api-gateway/src/chat/chat.controller.ts":
/*!******************************************************!*\
  !*** ./apps/api-gateway/src/chat/chat.controller.ts ***!
  \******************************************************/
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
exports.ChatController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const jwt_auth_guard_1 = __webpack_require__(/*! ../jwt-auth.guard */ "./apps/api-gateway/src/jwt-auth.guard.ts");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let ChatController = class ChatController {
    workspaceService;
    constructor(workspaceService) {
        this.workspaceService = workspaceService;
    }
    async getChatHistory(groupId, limit = '50', offset = '0', req) {
        try {
            const userId = req.user?.sub || req.user?.userId;
            const chatHistory = await (0, rxjs_1.firstValueFrom)(this.workspaceService.send('get_chat_history', {
                userId,
                getChatHistoryDto: {
                    groupId,
                    limit: parseInt(limit),
                    offset: parseInt(offset)
                }
            }));
            return {
                success: true,
                data: chatHistory
            };
        }
        catch (error) {
            console.error('Error getting chat history:', error);
            return {
                success: false,
                message: 'Failed to get chat history',
                error: error.message
            };
        }
    }
    async sendMessage(body, req) {
        try {
            const userId = req.user?.sub || req.user?.userId;
            const savedMessage = await (0, rxjs_1.firstValueFrom)(this.workspaceService.send('send_chat_message', {
                userId,
                sendChatMessageDto: {
                    groupId: body.groupId,
                    text: body.text
                }
            }));
            return {
                success: true,
                data: savedMessage
            };
        }
        catch (error) {
            console.error('Error sending message:', error);
            return {
                success: false,
                message: 'Failed to send message',
                error: error.message
            };
        }
    }
    async getGroupMembers(groupId, req) {
        try {
            const members = await (0, rxjs_1.firstValueFrom)(this.workspaceService.send('get_group_members', {
                groupId
            }));
            return {
                success: true,
                data: members
            };
        }
        catch (error) {
            console.error('Error getting group members:', error);
            return {
                success: false,
                message: 'Failed to get group members',
                error: error.message
            };
        }
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)('history/:groupId'),
    __param(0, (0, common_1.Param)('groupId')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChatHistory", null);
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('group/:groupId/members'),
    __param(0, (0, common_1.Param)('groupId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getGroupMembers", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_2.Inject)('workspace-group-service')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], ChatController);


/***/ }),

/***/ "./apps/api-gateway/src/chat/chat.gateway.ts":
/*!***************************************************!*\
  !*** ./apps/api-gateway/src/chat/chat.gateway.ts ***!
  \***************************************************/
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatGateway = void 0;
const websockets_1 = __webpack_require__(/*! @nestjs/websockets */ "@nestjs/websockets");
const socket_io_1 = __webpack_require__(/*! socket.io */ "socket.io");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const ws_jwt_auth_guard_1 = __webpack_require__(/*! ../ws-jwt-auth.guard */ "./apps/api-gateway/src/ws-jwt-auth.guard.ts");
let ChatGateway = class ChatGateway {
    workspaceService;
    jwtService;
    server;
    connectedUsers = new Map();
    constructor(workspaceService, jwtService) {
        this.workspaceService = workspaceService;
        this.jwtService = jwtService;
    }
    async handleConnection(client) {
        try {
            const isAuthenticated = ws_jwt_auth_guard_1.WsJwtAuthGuard.authenticateSocket(client, this.jwtService);
            if (!isAuthenticated || !client.userId) {
                console.log('Authentication failed, disconnecting client');
                client.disconnect();
                return;
            }
            console.log(`User ${client.userId} connected with socket ${client.id}`);
            this.connectedUsers.set(client.userId, client);
            client.emit('connection_success', {
                userId: client.userId,
                message: 'Successfully authenticated via cookies/token'
            });
        }
        catch (error) {
            console.error('Connection authentication failed:', error);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        if (client.userId) {
            console.log(`User ${client.userId} disconnected`);
            this.connectedUsers.delete(client.userId);
        }
    }
    async handleJoinGroup(client, data) {
        try {
            if (!client.userId) {
                client.emit('error', { message: 'Not authenticated' });
                return;
            }
            client.join(`group_${data.groupId}`);
            if (!client.userGroups) {
                client.userGroups = [];
            }
            if (!client.userGroups.includes(data.groupId)) {
                client.userGroups.push(data.groupId);
            }
            console.log(`User ${client.userId} joined group ${data.groupId}`);
            client.emit('joined_group', { groupId: data.groupId });
        }
        catch (error) {
            console.error('Error joining group:', error);
            client.emit('error', { message: 'Failed to join group' });
        }
    }
    async handleLeaveGroup(client, data) {
        try {
            if (!client.userId) {
                client.emit('error', { message: 'Not authenticated' });
                return;
            }
            client.leave(`group_${data.groupId}`);
            if (client.userGroups) {
                client.userGroups = client.userGroups.filter(groupId => groupId !== data.groupId);
            }
            console.log(`User ${client.userId} left group ${data.groupId}`);
            client.emit('left_group', { groupId: data.groupId });
        }
        catch (error) {
            console.error('Error leaving group:', error);
            client.emit('error', { message: 'Failed to leave group' });
        }
    }
    async handleSendMessage(client, data) {
        try {
            if (!client.userId) {
                client.emit('error', { message: 'Not authenticated' });
                return;
            }
            console.log(`User ${client.userId} sending message to group ${data.groupId}:`, data.text);
            const savedMessage = await (0, rxjs_1.firstValueFrom)(this.workspaceService.send('send_chat_message', {
                userId: client.userId,
                sendChatMessageDto: {
                    groupId: data.groupId,
                    text: data.text
                }
            }));
            console.log('Message saved:', savedMessage);
            this.server.to(`group_${data.groupId}`).emit('new_message', {
                chatId: savedMessage.chatId,
                groupId: savedMessage.groupId,
                userId: savedMessage.userId,
                text: savedMessage.text,
                sentAt: savedMessage.sentAt
            });
            client.emit('message_sent', {
                chatId: savedMessage.chatId,
                status: 'delivered'
            });
        }
        catch (error) {
            console.error('Error sending message:', error);
            client.emit('error', {
                message: 'Failed to send message',
                details: error.message
            });
        }
    }
    async handleGetChatHistory(client, data) {
        try {
            if (!client.userId) {
                client.emit('error', { message: 'Not authenticated' });
                return;
            }
            console.log(`User ${client.userId} requesting chat history for group ${data.groupId}`);
            const chatHistory = await (0, rxjs_1.firstValueFrom)(this.workspaceService.send('get_chat_history', {
                userId: client.userId,
                getChatHistoryDto: {
                    groupId: data.groupId,
                    limit: data.limit || 50,
                    offset: data.offset || 0
                }
            }));
            client.emit('chat_history', {
                groupId: data.groupId,
                messages: chatHistory.messages,
                totalCount: chatHistory.totalCount
            });
        }
        catch (error) {
            console.error('Error getting chat history:', error);
            client.emit('error', {
                message: 'Failed to get chat history',
                details: error.message
            });
        }
    }
    getConnectedUsers() {
        return Array.from(this.connectedUsers.keys());
    }
    isUserConnected(userId) {
        return this.connectedUsers.has(userId);
    }
    sendToUser(userId, event, data) {
        const userSocket = this.connectedUsers.get(userId);
        if (userSocket) {
            userSocket.emit(event, data);
            return true;
        }
        return false;
    }
    broadcastToGroup(groupId, event, data) {
        this.server.to(`group_${groupId}`).emit(event, data);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_c = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _c : Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard),
    (0, websockets_1.SubscribeMessage)('join_group'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoinGroup", null);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard),
    (0, websockets_1.SubscribeMessage)('leave_group'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleLeaveGroup", null);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard),
    (0, websockets_1.SubscribeMessage)('send_message'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard),
    (0, websockets_1.SubscribeMessage)('get_chat_history'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleGetChatHistory", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
        namespace: '/chat'
    }),
    __param(0, (0, common_1.Inject)('workspace-group-service')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], ChatGateway);


/***/ }),

/***/ "./apps/api-gateway/src/edu-assistant/eduAssistantGateway.controller.ts":
/*!******************************************************************************!*\
  !*** ./apps/api-gateway/src/edu-assistant/eduAssistantGateway.controller.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EduAssistantGatewayController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_auth_guard_1 = __webpack_require__(/*! ../jwt-auth.guard */ "./apps/api-gateway/src/jwt-auth.guard.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let EduAssistantGatewayController = class EduAssistantGatewayController {
    eduAssistantClient;
    constructor(eduAssistantClient) {
        this.eduAssistantClient = eduAssistantClient;
    }
    async generateStudyPlan(generateStudyPlanData, res) {
        try {
            const result = await (0, rxjs_1.lastValueFrom)(this.eduAssistantClient.send({ cmd: 'generate-study-plan' }, generateStudyPlanData));
            if (!result.success) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
            }
            return res.status(common_1.HttpStatus.CREATED).json(result);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Failed to generate study plan',
                error: error.message,
            });
        }
    }
    async getStudyPlansByUserId(userId, res) {
        try {
            const result = await (0, rxjs_1.lastValueFrom)(this.eduAssistantClient.send({ cmd: 'get-study-plans-by-user' }, { userId }));
            if (!result.success) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json(result);
            }
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Failed to retrieve study plans',
                error: error.message,
            });
        }
    }
    async getStudyPlan(id, res) {
        try {
            const result = await (0, rxjs_1.lastValueFrom)(this.eduAssistantClient.send({ cmd: 'get-study-plan' }, { id }));
            if (!result.success) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json(result);
            }
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Failed to retrieve study plan',
                error: error.message,
            });
        }
    }
    getHello(res) {
        return res.status(common_1.HttpStatus.OK).json({
            success: true,
            message: 'Edu Assistant Service Gateway is running!',
        });
    }
};
exports.EduAssistantGatewayController = EduAssistantGatewayController;
__decorate([
    (0, common_1.Post)('generate'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EduAssistantGatewayController.prototype, "generateStudyPlan", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EduAssistantGatewayController.prototype, "getStudyPlansByUserId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EduAssistantGatewayController.prototype, "getStudyPlan", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EduAssistantGatewayController.prototype, "getHello", null);
exports.EduAssistantGatewayController = EduAssistantGatewayController = __decorate([
    (0, common_1.Controller)('api/study-plans'),
    __param(0, (0, common_1.Inject)('edu-assistant-service')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], EduAssistantGatewayController);


/***/ }),

/***/ "./apps/api-gateway/src/jwt-auth.guard.ts":
/*!************************************************!*\
  !*** ./apps/api-gateway/src/jwt-auth.guard.ts ***!
  \************************************************/
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
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
let JwtAuthGuard = class JwtAuthGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        let accessToken = req.cookies?.accessToken;
        const refreshToken = req.cookies?.refreshToken;
        if (!accessToken) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                accessToken = authHeader.substring(7);
            }
        }
        if (!accessToken)
            throw new common_1.UnauthorizedException('No token found');
        try {
            const decoded = this.jwtService.verify(accessToken);
            req.user = decoded;
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException({
                message: 'Invalid or expired token',
                data: {
                    refreshToken: refreshToken,
                }
            });
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], JwtAuthGuard);


/***/ }),

/***/ "./apps/api-gateway/src/main.ts":
/*!**************************************!*\
  !*** ./apps/api-gateway/src/main.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const api_gateway_module_1 = __webpack_require__(/*! ./api-gateway.module */ "./apps/api-gateway/src/api-gateway.module.ts");
const cookie_parser_1 = __importDefault(__webpack_require__(/*! cookie-parser */ "cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(api_gateway_module_1.ApiGatewayModule);
    app.enableCors({
        origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:8080'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.use((0, cookie_parser_1.default)());
    await app.listen(process.env.port ?? 3000);
    console.log('API gateway is running on port 3000');
}
bootstrap();


/***/ }),

/***/ "./apps/api-gateway/src/notification/notificationGateway.controller.ts":
/*!*****************************************************************************!*\
  !*** ./apps/api-gateway/src/notification/notificationGateway.controller.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationGatewayController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let NotificationGatewayController = class NotificationGatewayController {
    notificationClient;
    constructor(notificationClient) {
        this.notificationClient = notificationClient;
    }
    async sendResetPasswordEmail(body, res) {
        if (!body.email) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Email and full name are required',
            });
        }
        const result = await (0, rxjs_1.lastValueFrom)(this.notificationClient.send({ cmd: 'reset-password' }, body));
        if (!result.success) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async sendWelcomeEmail(body, res) {
        if (!body.email || !body.fullName) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Email and full name are required',
            });
        }
        const result = await (0, rxjs_1.lastValueFrom)(this.notificationClient.send({ cmd: 'welcome-email' }, body));
        if (!result.success) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async logActivity(body, res) {
        if (!body.userId || !body.activity || !body.timestamp) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                message: 'User ID, activity, and timestamp are required',
            });
        }
        const result = await (0, rxjs_1.lastValueFrom)(this.notificationClient.send({ cmd: 'log-activity' }, body));
        if (!result.success) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async getLogsByUserId(userId, res) {
        const result = await (0, rxjs_1.lastValueFrom)(this.notificationClient.send({ cmd: 'get-logs-by-user' }, userId));
        if (!result.success) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
        }
        return res.status(common_1.HttpStatus.OK).json(result);
    }
};
exports.NotificationGatewayController = NotificationGatewayController;
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationGatewayController.prototype, "sendResetPasswordEmail", null);
__decorate([
    (0, common_1.Post)('welcome-email'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationGatewayController.prototype, "sendWelcomeEmail", null);
__decorate([
    (0, common_1.Post)('log-activity'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationGatewayController.prototype, "logActivity", null);
__decorate([
    (0, common_1.Get)('get-logs-by-user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationGatewayController.prototype, "getLogsByUserId", null);
exports.NotificationGatewayController = NotificationGatewayController = __decorate([
    (0, common_1.Controller)('notification'),
    __param(0, (0, common_1.Inject)('notification-service')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], NotificationGatewayController);


/***/ }),

/***/ "./apps/api-gateway/src/quiz/dtos/quiz-gateway.dto.ts":
/*!************************************************************!*\
  !*** ./apps/api-gateway/src/quiz/dtos/quiz-gateway.dto.ts ***!
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
exports.GetQuizLeaderboardDto = exports.GetUserQuizAttemptsDto = exports.GetQuizAttemptDto = exports.CompleteQuizAttemptDto = exports.SaveUserAnswerDto = exports.StartQuizAttemptDto = exports.GetQuizzesByGroupDto = exports.GetQuizDto = exports.CreateCompleteQuizDto = exports.CompleteQuizDto = exports.CreateQuestionDto = exports.CreateQuestionOptionDto = exports.CreateQuizDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class CreateQuizDto {
    groupId;
    title;
    description;
    timeLimit;
    fullMarks;
    difficulty;
    instructions;
}
exports.CreateQuizDto = CreateQuizDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "groupId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ message: 'Title must be a string' }),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1, { message: 'Time limit must be at least 1 minute' }),
    (0, class_validator_1.Max)(480, { message: 'Time limit cannot exceed 8 hours' }),
    __metadata("design:type", Number)
], CreateQuizDto.prototype, "timeLimit", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateQuizDto.prototype, "fullMarks", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['EASY', 'MEDIUM', 'HARD']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "difficulty", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "instructions", void 0);
class CreateQuestionOptionDto {
    optionText;
    isCorrect;
}
exports.CreateQuestionOptionDto = CreateQuestionOptionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQuestionOptionDto.prototype, "optionText", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateQuestionOptionDto.prototype, "isCorrect", void 0);
class CreateQuestionDto {
    question;
    questionType;
    points;
    correctAnswer;
    options;
}
exports.CreateQuestionDto = CreateQuestionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['MCQ', 'TRUE_FALSE', 'SHORT_ANSWER']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "questionType", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'Points must be at least 1' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "points", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "correctAnswer", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateQuestionOptionDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "options", void 0);
class CompleteQuizDto {
    quizId;
    questions;
}
exports.CompleteQuizDto = CompleteQuizDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CompleteQuizDto.prototype, "quizId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateQuestionDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CompleteQuizDto.prototype, "questions", void 0);
class CreateCompleteQuizDto {
    groupId;
    title;
    description;
    timeLimit;
    fullMarks;
    difficulty;
    instructions;
    questions;
}
exports.CreateCompleteQuizDto = CreateCompleteQuizDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCompleteQuizDto.prototype, "groupId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ message: 'Title must be a string' }),
    __metadata("design:type", String)
], CreateCompleteQuizDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCompleteQuizDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1, { message: 'Time limit must be at least 1 minute' }),
    (0, class_validator_1.Max)(480, { message: 'Time limit cannot exceed 8 hours' }),
    __metadata("design:type", Number)
], CreateCompleteQuizDto.prototype, "timeLimit", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCompleteQuizDto.prototype, "fullMarks", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['EASY', 'MEDIUM', 'HARD']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCompleteQuizDto.prototype, "difficulty", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCompleteQuizDto.prototype, "instructions", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateQuestionDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateCompleteQuizDto.prototype, "questions", void 0);
class GetQuizDto {
    quizId;
}
exports.GetQuizDto = GetQuizDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetQuizDto.prototype, "quizId", void 0);
class GetQuizzesByGroupDto {
    groupId;
}
exports.GetQuizzesByGroupDto = GetQuizzesByGroupDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetQuizzesByGroupDto.prototype, "groupId", void 0);
class StartQuizAttemptDto {
    quizId;
    userId;
}
exports.StartQuizAttemptDto = StartQuizAttemptDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StartQuizAttemptDto.prototype, "quizId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StartQuizAttemptDto.prototype, "userId", void 0);
class SaveUserAnswerDto {
    attemptId;
    questionId;
    selectedOptionId;
    userAnswer;
}
exports.SaveUserAnswerDto = SaveUserAnswerDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveUserAnswerDto.prototype, "attemptId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveUserAnswerDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveUserAnswerDto.prototype, "selectedOptionId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveUserAnswerDto.prototype, "userAnswer", void 0);
class CompleteQuizAttemptDto {
    userId;
    attemptId;
}
exports.CompleteQuizAttemptDto = CompleteQuizAttemptDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CompleteQuizAttemptDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CompleteQuizAttemptDto.prototype, "attemptId", void 0);
class GetQuizAttemptDto {
    attemptId;
}
exports.GetQuizAttemptDto = GetQuizAttemptDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetQuizAttemptDto.prototype, "attemptId", void 0);
class GetUserQuizAttemptsDto {
    userId;
    quizId;
}
exports.GetUserQuizAttemptsDto = GetUserQuizAttemptsDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetUserQuizAttemptsDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetUserQuizAttemptsDto.prototype, "quizId", void 0);
class GetQuizLeaderboardDto {
    quizId;
}
exports.GetQuizLeaderboardDto = GetQuizLeaderboardDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetQuizLeaderboardDto.prototype, "quizId", void 0);


/***/ }),

/***/ "./apps/api-gateway/src/quiz/quizGateway.controller.ts":
/*!*************************************************************!*\
  !*** ./apps/api-gateway/src/quiz/quizGateway.controller.ts ***!
  \*************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuizGatewayController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_auth_guard_1 = __webpack_require__(/*! ../jwt-auth.guard */ "./apps/api-gateway/src/jwt-auth.guard.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const quiz_gateway_dto_1 = __webpack_require__(/*! ./dtos/quiz-gateway.dto */ "./apps/api-gateway/src/quiz/dtos/quiz-gateway.dto.ts");
let QuizGatewayController = class QuizGatewayController {
    quizClient;
    constructor(quizClient) {
        this.quizClient = quizClient;
    }
    async createQuiz(createQuizDto, req, res) {
        try {
            console.log('Received quiz data:', createQuizDto);
            const quizData = {
                ...createQuizDto,
            };
            console.log('Sending to quiz service:', quizData);
            const result = await (0, rxjs_1.lastValueFrom)(this.quizClient.send('create_quiz', quizData));
            console.log('Response from quiz service:', result);
            if (!result?.success) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
            }
            return res.status(common_1.HttpStatus.CREATED).json(result);
        }
        catch (error) {
            console.error('Quiz creation error:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error creating quiz: ' + (error?.message || error),
                data: null,
                errorDetails: error,
            });
        }
    }
    async completeQuizWithQuestions(completeQuizDto, req, res) {
        try {
            console.log('Received complete quiz data:', completeQuizDto);
            const result = await (0, rxjs_1.lastValueFrom)(this.quizClient.send('complete_quiz_with_questions', completeQuizDto));
            console.log('Response from quiz service:', result);
            if (!result?.success) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
            }
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            console.error('Quiz completion error:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error completing quiz: ' + (error?.message || error),
                data: null,
                errorDetails: error,
            });
        }
    }
    async createCompleteQuiz(createCompleteQuizDto, req, res) {
        try {
            console.log('Received complete quiz creation data:', createCompleteQuizDto);
            const result = await (0, rxjs_1.lastValueFrom)(this.quizClient.send('create_complete_quiz', createCompleteQuizDto));
            console.log('Response from quiz service:', result);
            if (!result?.success) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
            }
            return res.status(common_1.HttpStatus.CREATED).json(result);
        }
        catch (error) {
            console.error('Complete quiz creation error:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error creating complete quiz: ' + (error?.message || error),
                data: null,
                errorDetails: error,
            });
        }
    }
    async getQuizzesByGroup(groupId, req, res) {
        try {
            console.log('Received get quizzes by group request for groupId:', groupId);
            const result = await (0, rxjs_1.lastValueFrom)(this.quizClient.send('get_quizzes_by_group', { groupId }));
            console.log('Response from quiz service:', result);
            if (!result?.success) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
            }
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            console.error('Get quizzes by group error:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error fetching quizzes: ' + (error?.message || error),
                data: null,
                errorDetails: error,
            });
        }
    }
    async getQuizById(quizId, req, res) {
        try {
            console.log('Getting quiz by ID:', quizId);
            const result = await (0, rxjs_1.lastValueFrom)(this.quizClient.send('get_quiz_by_id', { quizId }));
            console.log('Response from quiz service:', result);
            if (!result?.success) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
            }
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            console.error('Get quiz by ID error:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error fetching quiz: ' + (error?.message || error),
                data: null,
                errorDetails: error,
            });
        }
    }
    async startQuizAttempt(startQuizAttemptDto, req, res) {
        try {
            console.log('Starting quiz attempt:', startQuizAttemptDto);
            const result = await (0, rxjs_1.lastValueFrom)(this.quizClient.send('start_quiz_attempt', startQuizAttemptDto));
            console.log('Response from quiz service:', result);
            if (!result?.success) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
            }
            return res.status(common_1.HttpStatus.CREATED).json(result);
        }
        catch (error) {
            console.error('Start quiz attempt error:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error starting quiz attempt: ' + (error?.message || error),
                data: null,
                errorDetails: error,
            });
        }
    }
    async saveUserAnswer(saveUserAnswerDto, req, res) {
        try {
            console.log('Saving user answer:', saveUserAnswerDto);
            const result = await (0, rxjs_1.lastValueFrom)(this.quizClient.send('save_user_answer', saveUserAnswerDto));
            console.log('Response from quiz service:', result);
            if (!result?.success) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
            }
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            console.error('Save user answer error:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error saving answer: ' + (error?.message || error),
                data: null,
                errorDetails: error,
            });
        }
    }
    async completeQuizAttempt(completeQuizAttemptDto, req, res) {
        try {
            console.log('Completing quiz attempt:', completeQuizAttemptDto);
            const result = await (0, rxjs_1.lastValueFrom)(this.quizClient.send('complete_quiz_attempt', completeQuizAttemptDto));
            console.log('Response from quiz service:', result);
            if (!result?.success) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
            }
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            console.error('Complete quiz attempt error:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error completing quiz attempt: ' + (error?.message || error),
                data: null,
                errorDetails: error,
            });
        }
    }
    async getUserQuizAttempts(userId, quizId, req, res) {
        try {
            console.log('Getting user quiz attempts for userId:', userId, 'quizId:', quizId);
            const getUserQuizAttemptsDto = {
                userId,
                quizId,
            };
            const result = await (0, rxjs_1.lastValueFrom)(this.quizClient.send('get_user_quiz_attempts', getUserQuizAttemptsDto));
            console.log('Response from quiz service:', result);
            if (!result?.success) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json(result);
            }
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            console.error('Get user quiz attempts error:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error fetching user quiz attempts: ' + (error?.message || error),
                data: null,
                errorDetails: error,
            });
        }
    }
};
exports.QuizGatewayController = QuizGatewayController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof quiz_gateway_dto_1.CreateQuizDto !== "undefined" && quiz_gateway_dto_1.CreateQuizDto) === "function" ? _b : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuizGatewayController.prototype, "createQuiz", null);
__decorate([
    (0, common_1.Post)('complete'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof quiz_gateway_dto_1.CompleteQuizDto !== "undefined" && quiz_gateway_dto_1.CompleteQuizDto) === "function" ? _c : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuizGatewayController.prototype, "completeQuizWithQuestions", null);
__decorate([
    (0, common_1.Post)('create-complete'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof quiz_gateway_dto_1.CreateCompleteQuizDto !== "undefined" && quiz_gateway_dto_1.CreateCompleteQuizDto) === "function" ? _d : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuizGatewayController.prototype, "createCompleteQuiz", null);
__decorate([
    (0, common_1.Get)('group/:groupId'),
    __param(0, (0, common_1.Param)('groupId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuizGatewayController.prototype, "getQuizzesByGroup", null);
__decorate([
    (0, common_1.Get)(':quizId'),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuizGatewayController.prototype, "getQuizById", null);
__decorate([
    (0, common_1.Post)('attempt/start'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof quiz_gateway_dto_1.StartQuizAttemptDto !== "undefined" && quiz_gateway_dto_1.StartQuizAttemptDto) === "function" ? _e : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuizGatewayController.prototype, "startQuizAttempt", null);
__decorate([
    (0, common_1.Post)('attempt/save-answer'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof quiz_gateway_dto_1.SaveUserAnswerDto !== "undefined" && quiz_gateway_dto_1.SaveUserAnswerDto) === "function" ? _f : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuizGatewayController.prototype, "saveUserAnswer", null);
__decorate([
    (0, common_1.Put)('attempt/complete'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof quiz_gateway_dto_1.CompleteQuizAttemptDto !== "undefined" && quiz_gateway_dto_1.CompleteQuizAttemptDto) === "function" ? _g : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuizGatewayController.prototype, "completeQuizAttempt", null);
__decorate([
    (0, common_1.Get)('attempts/user/:userId/quiz/:quizId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('quizId')),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuizGatewayController.prototype, "getUserQuizAttempts", null);
exports.QuizGatewayController = QuizGatewayController = __decorate([
    (0, common_1.Controller)('quiz'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Inject)('quiz-leaderboard-service')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], QuizGatewayController);


/***/ }),

/***/ "./apps/api-gateway/src/workspace/dtos/workspace-gateway.dto.ts":
/*!**********************************************************************!*\
  !*** ./apps/api-gateway/src/workspace/dtos/workspace-gateway.dto.ts ***!
  \**********************************************************************/
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
exports.JoinLeaveGroupDto = exports.CreateGroupDto = exports.GetWorkspaceDetailsDto = exports.LeaveWorkspaceDto = exports.JoinWorkspaceDto = exports.CreateWorkspaceDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateWorkspaceDto {
    workspacename;
    description;
}
exports.CreateWorkspaceDto = CreateWorkspaceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkspaceDto.prototype, "workspacename", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWorkspaceDto.prototype, "description", void 0);
class JoinWorkspaceDto {
    workspaceId;
}
exports.JoinWorkspaceDto = JoinWorkspaceDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], JoinWorkspaceDto.prototype, "workspaceId", void 0);
class LeaveWorkspaceDto {
    workspaceId;
}
exports.LeaveWorkspaceDto = LeaveWorkspaceDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LeaveWorkspaceDto.prototype, "workspaceId", void 0);
class GetWorkspaceDetailsDto {
    workspaceId;
}
exports.GetWorkspaceDetailsDto = GetWorkspaceDetailsDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetWorkspaceDetailsDto.prototype, "workspaceId", void 0);
class CreateGroupDto {
    groupname;
    description;
}
exports.CreateGroupDto = CreateGroupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "groupname", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "description", void 0);
class JoinLeaveGroupDto {
    groupId;
}
exports.JoinLeaveGroupDto = JoinLeaveGroupDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], JoinLeaveGroupDto.prototype, "groupId", void 0);


/***/ }),

/***/ "./apps/api-gateway/src/workspace/workspaceGateway.controller.ts":
/*!***********************************************************************!*\
  !*** ./apps/api-gateway/src/workspace/workspaceGateway.controller.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkspaceGatewayController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const jwt_auth_guard_1 = __webpack_require__(/*! ../jwt-auth.guard */ "./apps/api-gateway/src/jwt-auth.guard.ts");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const workspace_gateway_dto_1 = __webpack_require__(/*! ./dtos/workspace-gateway.dto */ "./apps/api-gateway/src/workspace/dtos/workspace-gateway.dto.ts");
let WorkspaceGatewayController = class WorkspaceGatewayController {
    workspaceServiceClient;
    constructor() {
        this.workspaceServiceClient = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.TCP,
            options: {
                host: '127.0.0.1',
                port: 3003,
            },
        });
    }
    async createWorkspace(createWorkspaceDto, req) {
        const userId = req.user.sub || req.user.userId || req.user.id;
        const workspaceServiceDto = {
            workspacename: createWorkspaceDto.workspacename,
            description: createWorkspaceDto.description
        };
        try {
            const result = await this.workspaceServiceClient
                .send('create_workspace', { userId, createWorkspaceDto: workspaceServiceDto })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(err => {
                if (err instanceof rxjs_1.TimeoutError) {
                    return (0, rxjs_1.throwError)(() => new common_1.HttpException('Service timeout', common_1.HttpStatus.REQUEST_TIMEOUT));
                }
                return (0, rxjs_1.throwError)(() => new common_1.HttpException(err.message || 'Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }))
                .toPromise();
            return {
                success: true,
                message: 'Workspace created successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to create workspace', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async joinWorkspace(joinWorkspaceDto, req) {
        const userId = req.user.sub || req.user.userId || req.user.id;
        if (!userId) {
            throw new common_1.HttpException('User ID not found in token', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            const result = await this.workspaceServiceClient
                .send('join_workspace', { userId, joinWorkspaceDto })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(err => {
                if (err instanceof rxjs_1.TimeoutError) {
                    return (0, rxjs_1.throwError)(() => new common_1.HttpException('Service timeout', common_1.HttpStatus.REQUEST_TIMEOUT));
                }
                if (err.message) {
                    if (err.message.includes('already joined this workspace')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('You have already joined this workspace', common_1.HttpStatus.CONFLICT));
                    }
                    if (err.message.includes('cannot join a workspace that you created')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('You cannot join a workspace that you created. You are already the admin of this workspace', common_1.HttpStatus.CONFLICT));
                    }
                    if (err.message.includes('Workspace not found')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('Workspace not found', common_1.HttpStatus.NOT_FOUND));
                    }
                }
                return (0, rxjs_1.throwError)(() => new common_1.HttpException(err.message || 'Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }))
                .toPromise();
            return {
                success: true,
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to join workspace', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async leaveWorkspace(leaveWorkspaceDto, req) {
        const userId = req.user.sub || req.user.userId || req.user.id;
        if (!userId) {
            throw new common_1.HttpException('User ID not found in token', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            const result = await this.workspaceServiceClient
                .send('leave_workspace', { userId, leaveWorkspaceDto })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(err => {
                if (err instanceof rxjs_1.TimeoutError) {
                    return (0, rxjs_1.throwError)(() => new common_1.HttpException('Service timeout', common_1.HttpStatus.REQUEST_TIMEOUT));
                }
                if (err.message) {
                    if (err.message.includes('Workspace not found')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('Workspace not found', common_1.HttpStatus.NOT_FOUND));
                    }
                    if (err.message.includes('not a member')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('You are not a member of this workspace', common_1.HttpStatus.FORBIDDEN));
                    }
                    if (err.message.includes('admins cannot leave')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('Workspace admins cannot leave their own workspace. You must transfer admin rights or delete the workspace instead.', common_1.HttpStatus.BAD_REQUEST));
                    }
                }
                return (0, rxjs_1.throwError)(() => new common_1.HttpException(err.message || 'Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }))
                .toPromise();
            return {
                success: true,
                message: 'Successfully left the workspace',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to leave workspace', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserWorkspaces(req) {
        const userId = req.user.sub || req.user.userId || req.user.id;
        if (!userId) {
            throw new common_1.HttpException('User ID not found in token', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            const result = await this.workspaceServiceClient
                .send('get_user_workspaces', { userId })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(err => {
                if (err instanceof rxjs_1.TimeoutError) {
                    return (0, rxjs_1.throwError)(() => new common_1.HttpException('Service timeout', common_1.HttpStatus.REQUEST_TIMEOUT));
                }
                return (0, rxjs_1.throwError)(() => new common_1.HttpException(err.message || 'Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }))
                .toPromise();
            return {
                success: true,
                message: 'User workspaces retrieved successfully!!!',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve workspaces', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllWorkspaces() {
        try {
            const result = await this.workspaceServiceClient
                .send('get_all_workspaces', {})
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(err => {
                if (err instanceof rxjs_1.TimeoutError) {
                    return (0, rxjs_1.throwError)(() => new common_1.HttpException('Service timeout', common_1.HttpStatus.REQUEST_TIMEOUT));
                }
                return (0, rxjs_1.throwError)(() => new common_1.HttpException(err.message || 'Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }))
                .toPromise();
            return {
                success: true,
                message: 'Available workspaces retrieved successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve available workspaces', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getWorkspaceDetails(getWorkspaceDetailsDto, req) {
        const userId = req.user.sub || req.user.userId || req.user.id;
        if (!userId) {
            throw new common_1.HttpException('User ID not found in token', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            const result = await this.workspaceServiceClient
                .send('get_workspace_details', { userId, workspaceId: getWorkspaceDetailsDto.workspaceId })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(err => {
                if (err instanceof rxjs_1.TimeoutError) {
                    return (0, rxjs_1.throwError)(() => new common_1.HttpException('Service timeout', common_1.HttpStatus.REQUEST_TIMEOUT));
                }
                if (err.message) {
                    if (err.message.includes('Workspace not found')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('Workspace not found', common_1.HttpStatus.NOT_FOUND));
                    }
                    if (err.message.includes('not a member')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('You are not a member of this workspace', common_1.HttpStatus.FORBIDDEN));
                    }
                }
                return (0, rxjs_1.throwError)(() => new common_1.HttpException(err.message || 'Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }))
                .toPromise();
            return {
                success: true,
                message: 'Workspace details retrieved successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve workspace details', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createGroup(workspaceId, createGroupDto, req) {
        const userId = req.user.sub || req.user.userId || req.user.id;
        if (!userId) {
            throw new common_1.HttpException('User ID not found in token', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            const result = await this.workspaceServiceClient
                .send('create_group', { userId, workspaceId, createGroupDto })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(err => {
                if (err instanceof rxjs_1.TimeoutError) {
                    return (0, rxjs_1.throwError)(() => new common_1.HttpException('Service timeout', common_1.HttpStatus.REQUEST_TIMEOUT));
                }
                if (err.message) {
                    if (err.message.includes('Workspace not found')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('Workspace not found', common_1.HttpStatus.NOT_FOUND));
                    }
                    if (err.message.includes('not a member')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('You are not a member of this workspace', common_1.HttpStatus.FORBIDDEN));
                    }
                    if (err.message.includes('Only workspace admins')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('Only workspace admins can create groups', common_1.HttpStatus.FORBIDDEN));
                    }
                    if (err.message.includes('group with this name already exists')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('A group with this name already exists in this workspace', common_1.HttpStatus.CONFLICT));
                    }
                }
                return (0, rxjs_1.throwError)(() => new common_1.HttpException(err.message || 'Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }))
                .toPromise();
            return {
                success: true,
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to create group', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getWorkspaceGroups(workspaceId, req) {
        const userId = req.user.sub || req.user.userId || req.user.id;
        if (!userId) {
            throw new common_1.HttpException('User ID not found in token', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            const result = await this.workspaceServiceClient
                .send('get_workspace_groups', { userId, workspaceId })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(err => {
                if (err instanceof rxjs_1.TimeoutError) {
                    return (0, rxjs_1.throwError)(() => new common_1.HttpException('Service timeout', common_1.HttpStatus.REQUEST_TIMEOUT));
                }
                if (err.message) {
                    if (err.message.includes('Workspace not found')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('Workspace not found', common_1.HttpStatus.NOT_FOUND));
                    }
                    if (err.message.includes('not a member')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('You are not a member of this workspace', common_1.HttpStatus.FORBIDDEN));
                    }
                }
                return (0, rxjs_1.throwError)(() => new common_1.HttpException(err.message || 'Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }))
                .toPromise();
            return {
                success: true,
                message: 'Groups retrieved successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve groups', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async joinLeaveGroup(joinLeaveGroupDto, req) {
        const userId = req.user.sub || req.user.userId || req.user.id;
        if (!userId) {
            throw new common_1.HttpException('User ID not found in token', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            const result = await this.workspaceServiceClient
                .send('join_leave_group', { userId, joinLeaveGroupDto })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(err => {
                if (err instanceof rxjs_1.TimeoutError) {
                    return (0, rxjs_1.throwError)(() => new common_1.HttpException('Service timeout', common_1.HttpStatus.REQUEST_TIMEOUT));
                }
                if (err.message) {
                    if (err.message.includes('Group not found')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('Group not found', common_1.HttpStatus.NOT_FOUND));
                    }
                    if (err.message.includes('not a member of the workspace')) {
                        return (0, rxjs_1.throwError)(() => new common_1.HttpException('You are not a member of the workspace that contains this group', common_1.HttpStatus.FORBIDDEN));
                    }
                }
                return (0, rxjs_1.throwError)(() => new common_1.HttpException(err.message || 'Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }))
                .toPromise();
            return {
                success: true,
                message: result.message,
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to perform group operation', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async onModuleDestroy() {
        await this.workspaceServiceClient.close();
    }
};
exports.WorkspaceGatewayController = WorkspaceGatewayController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof workspace_gateway_dto_1.CreateWorkspaceDto !== "undefined" && workspace_gateway_dto_1.CreateWorkspaceDto) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGatewayController.prototype, "createWorkspace", null);
__decorate([
    (0, common_1.Post)('join'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof workspace_gateway_dto_1.JoinWorkspaceDto !== "undefined" && workspace_gateway_dto_1.JoinWorkspaceDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGatewayController.prototype, "joinWorkspace", null);
__decorate([
    (0, common_1.Post)('leave'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof workspace_gateway_dto_1.LeaveWorkspaceDto !== "undefined" && workspace_gateway_dto_1.LeaveWorkspaceDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGatewayController.prototype, "leaveWorkspace", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGatewayController.prototype, "getUserWorkspaces", null);
__decorate([
    (0, common_1.Get)('available'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkspaceGatewayController.prototype, "getAllWorkspaces", null);
__decorate([
    (0, common_1.Post)('details'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof workspace_gateway_dto_1.GetWorkspaceDetailsDto !== "undefined" && workspace_gateway_dto_1.GetWorkspaceDetailsDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGatewayController.prototype, "getWorkspaceDetails", null);
__decorate([
    (0, common_1.Post)(':workspaceId/groups'),
    __param(0, (0, common_1.Param)('workspaceId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof workspace_gateway_dto_1.CreateGroupDto !== "undefined" && workspace_gateway_dto_1.CreateGroupDto) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGatewayController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Get)(':workspaceId/groups'),
    __param(0, (0, common_1.Param)('workspaceId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGatewayController.prototype, "getWorkspaceGroups", null);
__decorate([
    (0, common_1.Post)('groups/join-leave'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof workspace_gateway_dto_1.JoinLeaveGroupDto !== "undefined" && workspace_gateway_dto_1.JoinLeaveGroupDto) === "function" ? _f : Object, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGatewayController.prototype, "joinLeaveGroup", null);
exports.WorkspaceGatewayController = WorkspaceGatewayController = __decorate([
    (0, common_1.Controller)('api/workspaces'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [])
], WorkspaceGatewayController);


/***/ }),

/***/ "./apps/api-gateway/src/ws-jwt-auth.guard.ts":
/*!***************************************************!*\
  !*** ./apps/api-gateway/src/ws-jwt-auth.guard.ts ***!
  \***************************************************/
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
var WsJwtAuthGuard_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WsJwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
let WsJwtAuthGuard = WsJwtAuthGuard_1 = class WsJwtAuthGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const client = context.switchToWs().getClient();
        try {
            const cookies = this.parseCookies(client.handshake.headers.cookie);
            let accessToken = cookies?.accessToken;
            if (!accessToken) {
                accessToken = client.handshake.auth?.token ||
                    client.handshake.headers?.authorization?.replace('Bearer ', '');
            }
            if (!accessToken) {
                throw new common_1.UnauthorizedException('No token found');
            }
            const decoded = this.jwtService.verify(accessToken);
            client.user = decoded;
            client.userId = decoded.id || decoded.userId || decoded.sub;
            return true;
        }
        catch (error) {
            console.error('WebSocket authentication failed:', error);
            return false;
        }
    }
    parseCookies(cookieHeader) {
        if (!cookieHeader)
            return {};
        return cookieHeader
            .split(';')
            .reduce((cookies, cookie) => {
            const [name, value] = cookie.trim().split('=');
            if (name && value) {
                cookies[name] = decodeURIComponent(value);
            }
            return cookies;
        }, {});
    }
    static authenticateSocket(client, jwtService) {
        try {
            const cookies = WsJwtAuthGuard_1.parseCookiesStatic(client.handshake.headers.cookie);
            let accessToken = cookies?.accessToken;
            if (!accessToken) {
                accessToken = client.handshake.auth?.token ||
                    client.handshake.headers?.authorization?.replace('Bearer ', '');
            }
            if (!accessToken) {
                return false;
            }
            const decoded = jwtService.verify(accessToken);
            client.user = decoded;
            client.userId = decoded.id || decoded.userId || decoded.sub;
            return true;
        }
        catch (error) {
            console.error('WebSocket authentication failed:', error.message);
            return false;
        }
    }
    static parseCookiesStatic(cookieHeader) {
        if (!cookieHeader)
            return {};
        return cookieHeader
            .split(';')
            .reduce((cookies, cookie) => {
            const [name, value] = cookie.trim().split('=');
            if (name && value) {
                cookies[name] = decodeURIComponent(value);
            }
            return cookies;
        }, {});
    }
};
exports.WsJwtAuthGuard = WsJwtAuthGuard;
exports.WsJwtAuthGuard = WsJwtAuthGuard = WsJwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], WsJwtAuthGuard);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/websockets":
/*!*************************************!*\
  !*** external "@nestjs/websockets" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/api-gateway/src/main.ts");
/******/ 	
/******/ })()
;