/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/notification-service/src/dtos/email.dto.ts":
/*!*********************************************************!*\
  !*** ./apps/notification-service/src/dtos/email.dto.ts ***!
  \*********************************************************/
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
exports.EmailDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class EmailDto {
    email;
}
exports.EmailDto = EmailDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], EmailDto.prototype, "email", void 0);


/***/ }),

/***/ "./apps/notification-service/src/dtos/shareDoc.dto.ts":
/*!************************************************************!*\
  !*** ./apps/notification-service/src/dtos/shareDoc.dto.ts ***!
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
exports.ShareDocDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ShareDocDto {
    documentId;
    emailList;
}
exports.ShareDocDto = ShareDocDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ShareDocDto.prototype, "documentId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ShareDocDto.prototype, "emailList", void 0);


/***/ }),

/***/ "./apps/notification-service/src/dtos/welcomeEmail.dto.ts":
/*!****************************************************************!*\
  !*** ./apps/notification-service/src/dtos/welcomeEmail.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WelcomeEmailDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class WelcomeEmailDto {
    email;
    fullName;
}
exports.WelcomeEmailDto = WelcomeEmailDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], WelcomeEmailDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Full name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Full name is required' }),
    __metadata("design:type", String)
], WelcomeEmailDto.prototype, "fullName", void 0);


/***/ }),

/***/ "./apps/notification-service/src/filters/validation-exception.filter.ts":
/*!******************************************************************************!*\
  !*** ./apps/notification-service/src/filters/validation-exception.filter.ts ***!
  \******************************************************************************/
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

/***/ "./apps/notification-service/src/main.ts":
/*!***********************************************!*\
  !*** ./apps/notification-service/src/main.ts ***!
  \***********************************************/
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
const notification_service_module_1 = __webpack_require__(/*! ./notification-service.module */ "./apps/notification-service/src/notification-service.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const validation_exception_filter_1 = __webpack_require__(/*! ./filters/validation-exception.filter */ "./apps/notification-service/src/filters/validation-exception.filter.ts");
const envPath = path.resolve(process.cwd(), 'apps', 'notification-service', '.env');
dotenv.config({ path: envPath });
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(notification_service_module_1.NotificationServiceModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 4005,
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new validation_exception_filter_1.ValidationExceptionFilter());
    await app.listen();
    console.log('Notification service is running on port 3002');
}
bootstrap();


/***/ }),

/***/ "./apps/notification-service/src/notification-service.controller.ts":
/*!**************************************************************************!*\
  !*** ./apps/notification-service/src/notification-service.controller.ts ***!
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationServiceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const notification_service_service_1 = __webpack_require__(/*! ./notification-service.service */ "./apps/notification-service/src/notification-service.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const email_dto_1 = __webpack_require__(/*! ./dtos/email.dto */ "./apps/notification-service/src/dtos/email.dto.ts");
const welcomeEmail_dto_1 = __webpack_require__(/*! ./dtos/welcomeEmail.dto */ "./apps/notification-service/src/dtos/welcomeEmail.dto.ts");
const shareDoc_dto_1 = __webpack_require__(/*! ./dtos/shareDoc.dto */ "./apps/notification-service/src/dtos/shareDoc.dto.ts");
let NotificationServiceController = class NotificationServiceController {
    notificationServiceService;
    constructor(notificationServiceService) {
        this.notificationServiceService = notificationServiceService;
    }
    async sendResetPasswordEmail(emailDto) {
        return this.notificationServiceService.sendResetPasswordEmail(emailDto);
    }
    async sendWelcomeEmail(welcomeDto) {
        return this.notificationServiceService.sendWelcomeEmail(welcomeDto);
    }
    async sendShareDocumentEmail(shareDocDto) {
        return this.notificationServiceService.sendShareDocumentEmail(shareDocDto);
    }
};
exports.NotificationServiceController = NotificationServiceController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'reset-password' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof email_dto_1.EmailDto !== "undefined" && email_dto_1.EmailDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], NotificationServiceController.prototype, "sendResetPasswordEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'welcome-email' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof welcomeEmail_dto_1.WelcomeEmailDto !== "undefined" && welcomeEmail_dto_1.WelcomeEmailDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], NotificationServiceController.prototype, "sendWelcomeEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'share-document' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof shareDoc_dto_1.ShareDocDto !== "undefined" && shareDoc_dto_1.ShareDocDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], NotificationServiceController.prototype, "sendShareDocumentEmail", null);
exports.NotificationServiceController = NotificationServiceController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_service_service_1.NotificationServiceService !== "undefined" && notification_service_service_1.NotificationServiceService) === "function" ? _a : Object])
], NotificationServiceController);


/***/ }),

/***/ "./apps/notification-service/src/notification-service.module.ts":
/*!**********************************************************************!*\
  !*** ./apps/notification-service/src/notification-service.module.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationServiceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const notification_service_controller_1 = __webpack_require__(/*! ./notification-service.controller */ "./apps/notification-service/src/notification-service.controller.ts");
const notification_service_service_1 = __webpack_require__(/*! ./notification-service.service */ "./apps/notification-service/src/notification-service.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
let NotificationServiceModule = class NotificationServiceModule {
};
exports.NotificationServiceModule = NotificationServiceModule;
exports.NotificationServiceModule = NotificationServiceModule = __decorate([
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
                        entities: [],
                        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
                        ssl: {
                            rejectUnauthorized: configService.get('DB_SSL_REJECT_UNAUTHORIZED') ===
                                'true',
                        },
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([]),
            microservices_1.ClientsModule.register([
                {
                    name: 'auth-service',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: 3001,
                    },
                },
            ]),
        ],
        controllers: [notification_service_controller_1.NotificationServiceController],
        providers: [notification_service_service_1.NotificationServiceService],
    })
], NotificationServiceModule);


/***/ }),

/***/ "./apps/notification-service/src/notification-service.service.ts":
/*!***********************************************************************!*\
  !*** ./apps/notification-service/src/notification-service.service.ts ***!
  \***********************************************************************/
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationServiceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const nodemailer = __importStar(__webpack_require__(/*! nodemailer */ "nodemailer"));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let NotificationServiceService = class NotificationServiceService {
    configService;
    authClient;
    transporter;
    from;
    constructor(configService, authClient) {
        this.configService = configService;
        this.authClient = authClient;
    }
    onModuleInit() {
        const host = this.configService.get('EMAIL_HOST');
        const port = this.configService.get('EMAIL_PORT');
        const secure = this.configService.get('EMAIL_SECURE');
        const user = this.configService.get('EMAIL_USER');
        const pass = this.configService.get('EMAIL_PASS');
        this.from = this.configService.get('EMAIL_FROM');
        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: {
                user,
                pass,
            },
        });
    }
    async sendResetPasswordEmail(emailDto) {
        const result = await this.authClient
            .send({ cmd: 'find-user-by-email' }, emailDto.email)
            .toPromise();
        if (!result.success) {
            return result;
        }
        const link = this.configService.get('LINK') + `/${result.data.userId}`;
        const html = this.resetPasswordTemplate(link);
        return this.sendMail(emailDto.email, 'Reset Password', undefined, html);
    }
    async sendShareDocumentEmail(shareDocDto) {
        const { documentId, emailList } = shareDocDto;
        const link = this.configService.get('DOCUMENT_LINK') + `/${documentId}`;
        await Promise.all(emailList.emails.map(async (email) => {
            const html = this.shareDocumentTemplate('Untitled Document', link, 'Harsha');
            return this.sendMail(email, 'Document Shared', undefined, html);
        }));
        return {
            success: true,
            message: 'Share Document Emails Sent Successfully',
        };
    }
    async sendWelcomeEmail(welcomeDto) {
        const html = this.welcomeEmailTemplate(welcomeDto.fullName);
        return this.sendMail(welcomeDto.email, 'Welcome to EduCollab', undefined, html);
    }
    resetPasswordTemplate = (link) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Password Reset - EduCollab</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family:Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f4f4f7">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border-radius:6px; overflow:hidden; margin:40px auto; box-shadow:0 2px 5px rgba(0,0,0,0.1);">
          
          <!-- Header Section -->
          <tr>
            <td bgcolor="#083c70" style="padding:30px; text-align:left;">
              <h2 style="margin:0; font-size:20px; font-weight:bold; color:#ffffff;">
                Password Reset Request - EduCollab
              </h2>
            </td>
          </tr>

          <!-- Body Section -->
          <tr>
            <td style="padding:30px; color:#333333; font-size:15px; line-height:1.6;">
              <p style="margin:0 0 15px 0;">Hi!</p>
              <p style="margin:0 0 20px 0;">
                We received a request to reset your password for your EduCollab account. 
                Click the button below to reset it:
              </p>

              <!-- CTA Button -->
              <p style="text-align:center; margin:30px 0;">
                <a href="${link}" 
                   style="display:inline-block; padding:14px 28px; background-color:#083c70; color:#ffffff; text-decoration:none; border-radius:4px; font-weight:bold; font-size:15px;">
                  Reset Password
                </a>
              </p>

              <p style="margin:0 0 10px 0;">
                If you did not request a password reset, please ignore this email. 
                This link will expire in 1 hour for your security.
              </p>
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td bgcolor="#fafafa" style="padding:20px; text-align:center; font-size:12px; color:#999999;">
              &copy; ${new Date().getFullYear()} EduCollab. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
    welcomeEmailTemplate = (fullName) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Welcome - EduCollab</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family:Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f4f4f7">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border-radius:6px; overflow:hidden; margin:40px auto; box-shadow:0 2px 5px rgba(0,0,0,0.1);">
          <!-- Header Section -->
          <tr>
            <td bgcolor="#083c70" style="padding:30px; text-align:left;">
              <h2 style="margin:0; font-size:20px; font-weight:bold; color:#ffffff;">
                Welcome to EduCollab, ${fullName}!
              </h2>
            </td>
          </tr>
          <!-- Body Section -->
          <tr>
            <td style="padding:30px; color:#333333; font-size:15px; line-height:1.6;">
              <p style="margin:0 0 15px 0;">Hi ${fullName}!</p>
              <p style="margin:0 0 20px 0;">
                Thank you for joining EduCollab. We're excited to have you on board!
              </p>
              <p style="margin:0 0 20px 0;">
                To get started, please visit our platform and explore the available resources.
              </p>
            </td>
          </tr>
          <!-- Footer Section -->
          <tr>
            <td bgcolor="#fafafa" style="padding:20px; text-align:center; font-size:12px; color:#999999;">
              &copy; ${new Date().getFullYear()} EduCollab. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
    shareDocumentTemplate = (docTitle, link, senderName) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Document Shared - EduCollab</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family:Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f4f4f7">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border-radius:6px; overflow:hidden; margin:40px auto; box-shadow:0 2px 5px rgba(0,0,0,0.1);">

          <!-- Header Section -->
          <tr>
            <td bgcolor="#083c70" style="padding:30px; text-align:left;">
              <h2 style="margin:0; font-size:20px; font-weight:bold; color:#ffffff;">
                Document Shared With You
              </h2>
            </td>
          </tr>

          <!-- Body Section -->
          <tr>
            <td style="padding:30px; color:#333333; font-size:15px; line-height:1.6;">
              <p style="margin:0 0 15px 0;">Hi!</p>
              <p style="margin:0 0 20px 0;">
                <strong>${senderName}</strong> has shared a document with you on EduCollab: 
                <em>${docTitle}</em>.
              </p>

              <!-- CTA Button -->
              <p style="text-align:center; margin:30px 0;">
                <a href="${link}" 
                   style="display:inline-block; padding:14px 28px; background-color:#083c70; color:#ffffff; text-decoration:none; border-radius:4px; font-weight:bold; font-size:15px;">
                  Open Document
                </a>
              </p>

              <p style="margin:0 0 10px 0;">
                If you cannot click the button, copy and paste the following URL into your browser:
                <br />
                <a href="${link}" style="color:#083c70;">${link}</a>
              </p>
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td bgcolor="#fafafa" style="padding:20px; text-align:center; font-size:12px; color:#999999;">
              &copy; ${new Date().getFullYear()} EduCollab. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
    async sendMail(to, subject, text, html) {
        try {
            await this.transporter.sendMail({
                from: this.from,
                to,
                subject,
                text,
                html,
            });
            return { success: true, message: 'Email Sent Successfully' };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.NotificationServiceService = NotificationServiceService;
exports.NotificationServiceService = NotificationServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('auth-service')),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], NotificationServiceService);


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

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/notification-service/src/main.ts");
/******/ 	
/******/ })()
;