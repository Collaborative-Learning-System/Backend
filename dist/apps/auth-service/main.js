/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/auth-service/src/auth-service.controller.ts":
/*!**********************************************************!*\
  !*** ./apps/auth-service/src/auth-service.controller.ts ***!
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthServiceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_service_1 = __webpack_require__(/*! ./auth-service.service */ "./apps/auth-service/src/auth-service.service.ts");
const signup_dto_1 = __webpack_require__(/*! ./dtos/signup.dto */ "./apps/auth-service/src/dtos/signup.dto.ts");
const login_dto_1 = __webpack_require__(/*! ./dtos/login.dto */ "./apps/auth-service/src/dtos/login.dto.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const reset_password_dto_1 = __webpack_require__(/*! ./dtos/reset-password.dto */ "./apps/auth-service/src/dtos/reset-password.dto.ts");
const updateProfileDto_dto_1 = __webpack_require__(/*! ./dtos/updateProfileDto.dto */ "./apps/auth-service/src/dtos/updateProfileDto.dto.ts");
let AuthServiceController = class AuthServiceController {
    authServiceService;
    constructor(authServiceService) {
        this.authServiceService = authServiceService;
    }
    async signup(signupData) {
        const result = await this.authServiceService.signup(signupData);
        return result;
    }
    async login(loginData) {
        const result = await this.authServiceService.login(loginData);
        return result;
    }
    async logOut(userId) {
        const result = await this.authServiceService.logout(userId);
        return result;
    }
    async resetPassword(resetPasswordData) {
        const result = await this.authServiceService.resetPassword(resetPasswordData);
        return result;
    }
    async getUserData(userId) {
        const result = await this.authServiceService.getUserData(userId);
        return result;
    }
    async refresh(refreshToken) {
        const result = await this.authServiceService.refresh(refreshToken);
        return result;
    }
    async findUserByEmail(email) {
        const result = await this.authServiceService.findUserByEmail(email);
        return result;
    }
    async updateProfile(updateData) {
        const result = await this.authServiceService.updateProfile(updateData);
        return result;
    }
    async deleteUser(userId) {
        const result = await this.authServiceService.deleteUser(userId);
        return result;
    }
};
exports.AuthServiceController = AuthServiceController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'signup' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof signup_dto_1.SignupDto !== "undefined" && signup_dto_1.SignupDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthServiceController.prototype, "signup", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'login' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthServiceController.prototype, "login", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'logout' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthServiceController.prototype, "logOut", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'reset-password' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof reset_password_dto_1.ResetPasswordDto !== "undefined" && reset_password_dto_1.ResetPasswordDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthServiceController.prototype, "resetPassword", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-user-data' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthServiceController.prototype, "getUserData", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'refresh-token' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthServiceController.prototype, "refresh", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find-user-by-email' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthServiceController.prototype, "findUserByEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update-profile' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof updateProfileDto_dto_1.UpdateProfileDto !== "undefined" && updateProfileDto_dto_1.UpdateProfileDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AuthServiceController.prototype, "updateProfile", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete-account' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthServiceController.prototype, "deleteUser", null);
exports.AuthServiceController = AuthServiceController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_service_1.AuthServiceService !== "undefined" && auth_service_service_1.AuthServiceService) === "function" ? _a : Object])
], AuthServiceController);


/***/ }),

/***/ "./apps/auth-service/src/auth-service.module.ts":
/*!******************************************************!*\
  !*** ./apps/auth-service/src/auth-service.module.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthServiceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_controller_1 = __webpack_require__(/*! ./auth-service.controller */ "./apps/auth-service/src/auth-service.controller.ts");
const auth_service_service_1 = __webpack_require__(/*! ./auth-service.service */ "./apps/auth-service/src/auth-service.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const user_entity_1 = __webpack_require__(/*! ./entities/user.entity */ "./apps/auth-service/src/entities/user.entity.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const refresh_token_entity_1 = __webpack_require__(/*! ./entities/refresh-token.entity */ "./apps/auth-service/src/entities/refresh-token.entity.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let AuthServiceModule = class AuthServiceModule {
};
exports.AuthServiceModule = AuthServiceModule;
exports.AuthServiceModule = AuthServiceModule = __decorate([
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
                        entities: [user_entity_1.User, refresh_token_entity_1.RefreshToken],
                        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
                        ssl: {
                            rejectUnauthorized: configService.get('DB_SSL_REJECT_UNAUTHORIZED') ===
                                'true',
                        },
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, refresh_token_entity_1.RefreshToken]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    global: true,
                    secret: configService.get('JWT_SECRET'),
                }),
            }),
            microservices_1.ClientsModule.register([
                {
                    name: 'user-service',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: 3004,
                    },
                },
            ]),
        ],
        controllers: [auth_service_controller_1.AuthServiceController],
        providers: [auth_service_service_1.AuthServiceService],
    })
], AuthServiceModule);


/***/ }),

/***/ "./apps/auth-service/src/auth-service.service.ts":
/*!*******************************************************!*\
  !*** ./apps/auth-service/src/auth-service.service.ts ***!
  \*******************************************************/
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
exports.AuthServiceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./entities/user.entity */ "./apps/auth-service/src/entities/user.entity.ts");
const bcrypt = __importStar(__webpack_require__(/*! bcrypt */ "bcrypt"));
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const refresh_token_entity_1 = __webpack_require__(/*! ./entities/refresh-token.entity */ "./apps/auth-service/src/entities/refresh-token.entity.ts");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let AuthServiceService = class AuthServiceService {
    userRepository;
    refreshTokenRepository;
    jwtService;
    userClient;
    constructor(userRepository, refreshTokenRepository, jwtService, userClient) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtService = jwtService;
        this.userClient = userClient;
    }
    async signup(signupData) {
        const { fullName, email, password } = signupData;
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            return {
                success: false,
                statusCode: 401,
                message: 'Email already in use',
            };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userRepository.save({
            fullName,
            email,
            password: hashedPassword,
            role: user_entity_1.UserRole.USER,
        });
        return {
            success: true,
            statusCode: 201,
            message: 'User registered successfully',
        };
    }
    async login(loginData) {
        const { email, password } = loginData;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return {
                success: false,
                statusCode: 401,
                message: 'Wrong Credentials',
            };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                success: false,
                statusCode: 401,
                message: 'Wrong Credentials',
            };
        }
        const tokens = await this.generateUserTokens(user.userId);
        return {
            success: true,
            statusCode: 200,
            message: 'User logged in successfully',
            data: { tokens, userId: user.userId },
        };
    }
    async refresh(refreshToken) {
        const user = await this.refreshTokenRepository.findOne({
            where: { token: refreshToken },
        });
        if (!user?.token) {
            return {
                success: false,
                statusCode: 401,
                message: 'Invalid refresh token',
            };
        }
        if (user.expiresAt < new Date()) {
            return {
                success: false,
                statusCode: 401,
                message: 'Refresh token expired',
            };
        }
        const tokens = await this.generateUserTokens(user.id);
        return {
            success: true,
            statusCode: 200,
            message: 'Tokens refreshed successfully',
            data: { tokens },
        };
    }
    async generateUserTokens(id) {
        const accessToken = this.jwtService.sign({ id }, {
            expiresIn: '24h',
        });
        const refreshToken = (0, uuid_1.v4)();
        await this.saveRefreshToken(refreshToken, id);
        return { accessToken, refreshToken };
    }
    async saveRefreshToken(refreshToken, id) {
        await this.refreshTokenRepository.save({
            token: refreshToken,
            id: id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
    }
    async logout(userId) {
        try {
            const user = await this.refreshTokenRepository.findOne({
                where: { id: userId },
            });
            if (user) {
                await this.refreshTokenRepository.remove(user);
                return {
                    success: true,
                    statusCode: 200,
                    message: 'User logged out successfully',
                };
            }
            return { success: false, statusCode: 404, message: 'User not found' };
        }
        catch (error) {
            return {
                success: false,
                statusCode: 500,
                message: 'Logout failed. Please Try Again Later',
            };
        }
    }
    async resetPassword(resetPasswordDto) {
        const user = await this.userRepository.findOne({
            where: { userId: resetPasswordDto.userId },
        });
        if (!user) {
            return {
                success: false,
                statusCode: 404,
                message: 'User not found',
            };
        }
        const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
        user.password = hashedPassword;
        await this.userRepository.save(user);
        return {
            success: true,
            statusCode: 200,
            message: 'Password reset successfully',
        };
    }
    async getUserData(userId) {
        const user = await this.userRepository.findOne({ where: { userId } });
        if (!user) {
            return {
                success: false,
                statusCode: 404,
                message: 'User not found',
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'User found',
            data: {
                userId: user.userId,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                bio: user.bio,
            },
        };
    }
    async findUserByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return {
                success: false,
                statusCode: 404,
                message: 'User not Exist with this email',
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'User found',
            data: user,
        };
    }
    async updateProfile(updateData) {
        const user = await this.userRepository.findOne({
            where: { userId: updateData.userId },
        });
        if (!user) {
            return {
                success: false,
                statusCode: 404,
                message: 'User not found',
            };
        }
        const IsEmailExist = await this.userRepository.findOne({
            where: { email: updateData.email },
        });
        if (IsEmailExist && IsEmailExist.email !== user.email) {
            return {
                success: false,
                statusCode: 409,
                message: 'Email already exists',
            };
        }
        user.fullName = updateData.fullName;
        user.email = updateData.email;
        user.bio = updateData.bio;
        await this.userRepository.save(user);
        return {
            success: true,
            statusCode: 200,
            message: 'Profile updated successfully',
        };
    }
    async deleteUser(userId) {
        const user = await this.userRepository.findOne({ where: { userId } });
        if (!user) {
            return {
                success: false,
                statusCode: 404,
                message: 'User not found',
            };
        }
        await this.userRepository.remove(user);
        return {
            success: true,
            statusCode: 200,
            message: 'Account Removed successfully',
        };
    }
};
exports.AuthServiceService = AuthServiceService;
exports.AuthServiceService = AuthServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __param(3, (0, common_1.Inject)('user-service')),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _c : Object, typeof (_d = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _d : Object])
], AuthServiceService);


/***/ }),

/***/ "./apps/auth-service/src/dtos/login.dto.ts":
/*!*************************************************!*\
  !*** ./apps/auth-service/src/dtos/login.dto.ts ***!
  \*************************************************/
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
exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),

/***/ "./apps/auth-service/src/dtos/reset-password.dto.ts":
/*!**********************************************************!*\
  !*** ./apps/auth-service/src/dtos/reset-password.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResetPasswordDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ResetPasswordDto {
    userId;
    newPassword;
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8, {
        message: 'Password must be at least 8 characters long.',
    }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "newPassword", void 0);


/***/ }),

/***/ "./apps/auth-service/src/dtos/signup.dto.ts":
/*!**************************************************!*\
  !*** ./apps/auth-service/src/dtos/signup.dto.ts ***!
  \**************************************************/
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
exports.SignupDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class SignupDto {
    fullName;
    email;
    password;
}
exports.SignupDto = SignupDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8, {
        message: 'Password must be at least 8 characters long.',
    }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "password", void 0);


/***/ }),

/***/ "./apps/auth-service/src/dtos/updateProfileDto.dto.ts":
/*!************************************************************!*\
  !*** ./apps/auth-service/src/dtos/updateProfileDto.dto.ts ***!
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
exports.UpdateProfileDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateProfileDto {
    userId;
    fullName;
    email;
    bio;
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "bio", void 0);


/***/ }),

/***/ "./apps/auth-service/src/entities/refresh-token.entity.ts":
/*!****************************************************************!*\
  !*** ./apps/auth-service/src/entities/refresh-token.entity.ts ***!
  \****************************************************************/
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
exports.RefreshToken = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let RefreshToken = class RefreshToken {
    token;
    id;
    expiresAt;
};
exports.RefreshToken = RefreshToken;
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], RefreshToken.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], RefreshToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], RefreshToken.prototype, "expiresAt", void 0);
exports.RefreshToken = RefreshToken = __decorate([
    (0, typeorm_1.Entity)()
], RefreshToken);


/***/ }),

/***/ "./apps/auth-service/src/entities/user.entity.ts":
/*!*******************************************************!*\
  !*** ./apps/auth-service/src/entities/user.entity.ts ***!
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

/***/ "./apps/auth-service/src/filters/validation-exception.filter.ts":
/*!**********************************************************************!*\
  !*** ./apps/auth-service/src/filters/validation-exception.filter.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let ValidationExceptionFilter = class ValidationExceptionFilter {
    catch(exception, host) {
        const response = exception.getResponse();
        if (typeof response === 'object' &&
            response['message'] &&
            Array.isArray(response['message'])) {
            const validationErrors = response['message'];
            return {
                success: false,
                statusCode: 400,
                message: validationErrors,
            };
        }
        return {
            success: false,
            statusCode: 400,
            message: response['message'] || 'Bad Request',
        };
    }
};
exports.ValidationExceptionFilter = ValidationExceptionFilter;
exports.ValidationExceptionFilter = ValidationExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.BadRequestException)
], ValidationExceptionFilter);


/***/ }),

/***/ "./apps/auth-service/src/main.ts":
/*!***************************************!*\
  !*** ./apps/auth-service/src/main.ts ***!
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
const auth_service_module_1 = __webpack_require__(/*! ./auth-service.module */ "./apps/auth-service/src/auth-service.module.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const validation_exception_filter_1 = __webpack_require__(/*! ./filters/validation-exception.filter */ "./apps/auth-service/src/filters/validation-exception.filter.ts");
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const envPath = path.resolve(process.cwd(), 'apps', 'auth-service', '.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(auth_service_module_1.AuthServiceModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 3001,
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new validation_exception_filter_1.ValidationExceptionFilter());
    await app.listen();
    console.log('AuthService is running on TCP port 3001');
}
bootstrap();


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

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

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

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/auth-service/src/main.ts");
/******/ 	
/******/ })()
;