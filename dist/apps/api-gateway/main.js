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
const notificationGateway_controller_1 = __webpack_require__(/*! ./notification/notificationGateway.controller */ "./apps/api-gateway/src/notification/notificationGateway.controller.ts");
const workspaceGateway_controller_1 = __webpack_require__(/*! ./workspace/workspaceGateway.controller */ "./apps/api-gateway/src/workspace/workspaceGateway.controller.ts");
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
                }
            ]),
        ],
        controllers: [api_gateway_controller_1.ApiGatewayController, authGateway_controller_1.AuthGatewayController, notificationGateway_controller_1.NotificationGatewayController, workspaceGateway_controller_1.WorkspaceGatewayController],
        providers: [api_gateway_service_1.ApiGatewayService, jwt_auth_guard_1.JwtAuthGuard],
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
exports.AuthGatewayController = AuthGatewayController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)('auth-service')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], AuthGatewayController);


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
        const accessToken = req.cookies?.accessToken;
        const refreshToken = req.cookies?.refreshToken;
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
        origin: 'http://localhost:5173',
        credentials: true,
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
exports.NotificationGatewayController = NotificationGatewayController = __decorate([
    (0, common_1.Controller)('notification'),
    __param(0, (0, common_1.Inject)('notification-service')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], NotificationGatewayController);


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
exports.JoinWorkspaceDto = exports.CreateWorkspaceDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateWorkspaceDto {
    name;
    description;
}
exports.CreateWorkspaceDto = CreateWorkspaceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkspaceDto.prototype, "name", void 0);
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
var _a, _b;
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
        const userId = req.user.sub;
        console.log('Create Workspace DTO:----------------', createWorkspaceDto);
        try {
            const result = await this.workspaceServiceClient
                .send('create_workspace', { userId, createWorkspaceDto })
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
        const userId = req.user.sub;
        try {
            const result = await this.workspaceServiceClient
                .send('join_workspace', { userId, joinWorkspaceDto })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(err => {
                if (err instanceof rxjs_1.TimeoutError) {
                    return (0, rxjs_1.throwError)(() => new common_1.HttpException('Service timeout', common_1.HttpStatus.REQUEST_TIMEOUT));
                }
                return (0, rxjs_1.throwError)(() => new common_1.HttpException(err.message || 'Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }))
                .toPromise();
            return {
                success: true,
                message: 'Successfully joined workspace',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to join workspace', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserWorkspaces(req) {
        const userId = req.user.sub;
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
                message: 'User workspaces retrieved successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve workspaces', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getWorkspaceById(workspaceId, req) {
        const userId = req.user.sub;
        try {
            const result = await this.workspaceServiceClient
                .send('get_workspace_by_id', { workspaceId, userId })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(err => {
                if (err instanceof rxjs_1.TimeoutError) {
                    return (0, rxjs_1.throwError)(() => new common_1.HttpException('Service timeout', common_1.HttpStatus.REQUEST_TIMEOUT));
                }
                return (0, rxjs_1.throwError)(() => new common_1.HttpException(err.message || 'Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }))
                .toPromise();
            return {
                success: true,
                message: 'Workspace retrieved successfully',
                data: result
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve workspace', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGatewayController.prototype, "getUserWorkspaces", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGatewayController.prototype, "getWorkspaceById", null);
exports.WorkspaceGatewayController = WorkspaceGatewayController = __decorate([
    (0, common_1.Controller)('api/workspaces'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [])
], WorkspaceGatewayController);


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