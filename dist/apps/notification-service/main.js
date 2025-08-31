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
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], EmailDto.prototype, "email", void 0);


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
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const envPath = path.resolve(process.cwd(), 'apps', 'notification-service', '.env');
dotenv.config({ path: envPath });
console.log('Loading .env from:', envPath);
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(notification_service_module_1.NotificationServiceModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 3002,
        },
    });
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationServiceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const notification_service_service_1 = __webpack_require__(/*! ./notification-service.service */ "./apps/notification-service/src/notification-service.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const email_dto_1 = __webpack_require__(/*! ./dtos/email.dto */ "./apps/notification-service/src/dtos/email.dto.ts");
let NotificationServiceController = class NotificationServiceController {
    notificationServiceService;
    constructor(notificationServiceService) {
        this.notificationServiceService = notificationServiceService;
    }
    async sendResetPasswordEmail(emailDto) {
        return this.notificationServiceService.sendResetPasswordEmail(emailDto);
    }
};
exports.NotificationServiceController = NotificationServiceController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'reset-password' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof email_dto_1.EmailDto !== "undefined" && email_dto_1.EmailDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], NotificationServiceController.prototype, "sendResetPasswordEmail", null);
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
let NotificationServiceModule = class NotificationServiceModule {
};
exports.NotificationServiceModule = NotificationServiceModule;
exports.NotificationServiceModule = NotificationServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            })
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationServiceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const nodemailer = __importStar(__webpack_require__(/*! nodemailer */ "nodemailer"));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let NotificationServiceService = class NotificationServiceService {
    configService;
    transporter;
    from;
    constructor(configService) {
        this.configService = configService;
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
        const link = this.configService.get('LINK');
        const html = this.resetPasswordTemplate(link);
        return this.sendMail(emailDto, 'Reset Password', undefined, html);
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
    async sendMail(to, subject, text, html) {
        console.log(to, subject, text, html);
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
            console.log(error);
            return { success: false, message: error.message };
        }
    }
};
exports.NotificationServiceService = NotificationServiceService;
exports.NotificationServiceService = NotificationServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
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