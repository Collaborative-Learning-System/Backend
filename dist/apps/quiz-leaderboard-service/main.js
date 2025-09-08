/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/quiz-leaderboard-service/src/entities/question-option.entity.ts":
/*!******************************************************************************!*\
  !*** ./apps/quiz-leaderboard-service/src/entities/question-option.entity.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuestionOption = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const question_entity_1 = __webpack_require__(/*! ./question.entity */ "./apps/quiz-leaderboard-service/src/entities/question.entity.ts");
let QuestionOption = class QuestionOption {
    optionId;
    questionId;
    optionText;
    isCorrect;
    question;
};
exports.QuestionOption = QuestionOption;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuestionOption.prototype, "optionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], QuestionOption.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250, nullable: false }),
    __metadata("design:type", String)
], QuestionOption.prototype, "optionText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], QuestionOption.prototype, "isCorrect", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_entity_1.Question, question => question.questionOptions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'questionId' }),
    __metadata("design:type", typeof (_a = typeof question_entity_1.Question !== "undefined" && question_entity_1.Question) === "function" ? _a : Object)
], QuestionOption.prototype, "question", void 0);
exports.QuestionOption = QuestionOption = __decorate([
    (0, typeorm_1.Entity)('questionOption')
], QuestionOption);


/***/ }),

/***/ "./apps/quiz-leaderboard-service/src/entities/question.entity.ts":
/*!***********************************************************************!*\
  !*** ./apps/quiz-leaderboard-service/src/entities/question.entity.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Question = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const quiz_entity_1 = __webpack_require__(/*! ./quiz.entity */ "./apps/quiz-leaderboard-service/src/entities/quiz.entity.ts");
const question_option_entity_1 = __webpack_require__(/*! ./question-option.entity */ "./apps/quiz-leaderboard-service/src/entities/question-option.entity.ts");
let Question = class Question {
    questionId;
    quizId;
    question;
    questionType;
    points;
    correctAnswer;
    quiz;
    questionOptions;
};
exports.Question = Question;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Question.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], Question.prototype, "quizId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Question.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        nullable: true,
        enum: ['MCQ', 'TRUE_FALSE', 'SHORT_ANSWER']
    }),
    __metadata("design:type", String)
], Question.prototype, "questionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], Question.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "correctAnswer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_entity_1.Quiz, quiz => quiz.questions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'quizId' }),
    __metadata("design:type", typeof (_a = typeof quiz_entity_1.Quiz !== "undefined" && quiz_entity_1.Quiz) === "function" ? _a : Object)
], Question.prototype, "quiz", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_option_entity_1.QuestionOption, questionOption => questionOption.question),
    __metadata("design:type", Array)
], Question.prototype, "questionOptions", void 0);
exports.Question = Question = __decorate([
    (0, typeorm_1.Entity)('question')
], Question);


/***/ }),

/***/ "./apps/quiz-leaderboard-service/src/entities/quiz.entity.ts":
/*!*******************************************************************!*\
  !*** ./apps/quiz-leaderboard-service/src/entities/quiz.entity.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Quiz = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const question_entity_1 = __webpack_require__(/*! ./question.entity */ "./apps/quiz-leaderboard-service/src/entities/question.entity.ts");
let Quiz = class Quiz {
    quizId;
    groupId;
    title;
    description;
    timeLimit;
    fullMarks;
    difficulty;
    instructions;
    questions;
};
exports.Quiz = Quiz;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Quiz.prototype, "quizId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], Quiz.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Quiz.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Quiz.prototype, "timeLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Quiz.prototype, "fullMarks", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        nullable: true,
        enum: ['EASY', 'MEDIUM', 'HARD']
    }),
    __metadata("design:type", String)
], Quiz.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "instructions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_entity_1.Question, question => question.quiz),
    __metadata("design:type", Array)
], Quiz.prototype, "questions", void 0);
exports.Quiz = Quiz = __decorate([
    (0, typeorm_1.Entity)('quiz')
], Quiz);


/***/ }),

/***/ "./apps/quiz-leaderboard-service/src/main.ts":
/*!***************************************************!*\
  !*** ./apps/quiz-leaderboard-service/src/main.ts ***!
  \***************************************************/
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
const quiz_leaderboard_service_module_1 = __webpack_require__(/*! ./quiz-leaderboard-service.module */ "./apps/quiz-leaderboard-service/src/quiz-leaderboard-service.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const envPath = path.resolve(process.cwd(), 'apps', 'quiz-leaderboard-service', '.env');
dotenv.config({ path: envPath });
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(quiz_leaderboard_service_module_1.QuizLeaderboardServiceModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 3004,
        },
    });
    await app.listen();
}
bootstrap();


/***/ }),

/***/ "./apps/quiz-leaderboard-service/src/quiz-leaderboard-service.controller.ts":
/*!**********************************************************************************!*\
  !*** ./apps/quiz-leaderboard-service/src/quiz-leaderboard-service.controller.ts ***!
  \**********************************************************************************/
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
exports.QuizLeaderboardServiceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const quiz_leaderboard_service_service_1 = __webpack_require__(/*! ./quiz-leaderboard-service.service */ "./apps/quiz-leaderboard-service/src/quiz-leaderboard-service.service.ts");
let QuizLeaderboardServiceController = class QuizLeaderboardServiceController {
    quizLeaderboardServiceService;
    constructor(quizLeaderboardServiceService) {
        this.quizLeaderboardServiceService = quizLeaderboardServiceService;
    }
    async createQuiz(data) {
        try {
            console.log('Received data for quiz creation:', data);
            const createQuizDto = data.createQuizDto || data;
            const quiz = await this.quizLeaderboardServiceService.createQuiz(createQuizDto);
            return {
                success: true,
                data: quiz,
                message: 'Quiz created successfully'
            };
        }
        catch (error) {
            console.error('Error in createQuiz controller:', error);
            return {
                success: false,
                data: null,
                message: 'Error creating quiz: ' + (error?.message || error?.toString() || 'Unknown error')
            };
        }
    }
};
exports.QuizLeaderboardServiceController = QuizLeaderboardServiceController;
__decorate([
    (0, microservices_1.MessagePattern)('create_quiz'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizLeaderboardServiceController.prototype, "createQuiz", null);
exports.QuizLeaderboardServiceController = QuizLeaderboardServiceController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof quiz_leaderboard_service_service_1.QuizLeaderboardServiceService !== "undefined" && quiz_leaderboard_service_service_1.QuizLeaderboardServiceService) === "function" ? _a : Object])
], QuizLeaderboardServiceController);


/***/ }),

/***/ "./apps/quiz-leaderboard-service/src/quiz-leaderboard-service.module.ts":
/*!******************************************************************************!*\
  !*** ./apps/quiz-leaderboard-service/src/quiz-leaderboard-service.module.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuizLeaderboardServiceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const quiz_leaderboard_service_controller_1 = __webpack_require__(/*! ./quiz-leaderboard-service.controller */ "./apps/quiz-leaderboard-service/src/quiz-leaderboard-service.controller.ts");
const quiz_leaderboard_service_service_1 = __webpack_require__(/*! ./quiz-leaderboard-service.service */ "./apps/quiz-leaderboard-service/src/quiz-leaderboard-service.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const quiz_entity_1 = __webpack_require__(/*! ./entities/quiz.entity */ "./apps/quiz-leaderboard-service/src/entities/quiz.entity.ts");
const question_entity_1 = __webpack_require__(/*! ./entities/question.entity */ "./apps/quiz-leaderboard-service/src/entities/question.entity.ts");
const question_option_entity_1 = __webpack_require__(/*! ./entities/question-option.entity */ "./apps/quiz-leaderboard-service/src/entities/question-option.entity.ts");
let QuizLeaderboardServiceModule = class QuizLeaderboardServiceModule {
};
exports.QuizLeaderboardServiceModule = QuizLeaderboardServiceModule;
exports.QuizLeaderboardServiceModule = QuizLeaderboardServiceModule = __decorate([
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
                        entities: [quiz_entity_1.Quiz, question_entity_1.Question, question_option_entity_1.QuestionOption],
                        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
                        ssl: {
                            rejectUnauthorized: configService.get('DB_SSL_REJECT_UNAUTHORIZED') ===
                                'true',
                        },
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([quiz_entity_1.Quiz, question_entity_1.Question, question_option_entity_1.QuestionOption]),
        ],
        controllers: [quiz_leaderboard_service_controller_1.QuizLeaderboardServiceController],
        providers: [quiz_leaderboard_service_service_1.QuizLeaderboardServiceService],
    })
], QuizLeaderboardServiceModule);


/***/ }),

/***/ "./apps/quiz-leaderboard-service/src/quiz-leaderboard-service.service.ts":
/*!*******************************************************************************!*\
  !*** ./apps/quiz-leaderboard-service/src/quiz-leaderboard-service.service.ts ***!
  \*******************************************************************************/
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
exports.QuizLeaderboardServiceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const quiz_entity_1 = __webpack_require__(/*! ./entities/quiz.entity */ "./apps/quiz-leaderboard-service/src/entities/quiz.entity.ts");
const question_entity_1 = __webpack_require__(/*! ./entities/question.entity */ "./apps/quiz-leaderboard-service/src/entities/question.entity.ts");
const question_option_entity_1 = __webpack_require__(/*! ./entities/question-option.entity */ "./apps/quiz-leaderboard-service/src/entities/question-option.entity.ts");
let QuizLeaderboardServiceService = class QuizLeaderboardServiceService {
    quizRepository;
    questionRepository;
    questionOptionRepository;
    constructor(quizRepository, questionRepository, questionOptionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.questionOptionRepository = questionOptionRepository;
    }
    async createQuiz(createQuizDto) {
        try {
            console.log('Creating quiz with data:', createQuizDto);
            const quiz = this.quizRepository.create({
                groupId: createQuizDto.groupId,
                title: createQuizDto.title,
                description: createQuizDto.description,
                timeLimit: createQuizDto.timeLimit,
                fullMarks: createQuizDto.fullMarks || 0,
                difficulty: createQuizDto.difficulty,
                instructions: createQuizDto.instructions,
            });
            const savedQuiz = await this.quizRepository.save(quiz);
            console.log('Quiz saved successfully:', savedQuiz);
            return savedQuiz;
        }
        catch (error) {
            console.error('Error creating quiz in service:', error);
            throw error;
        }
    }
};
exports.QuizLeaderboardServiceService = QuizLeaderboardServiceService;
exports.QuizLeaderboardServiceService = QuizLeaderboardServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_entity_1.Quiz)),
    __param(1, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(2, (0, typeorm_1.InjectRepository)(question_option_entity_1.QuestionOption)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], QuizLeaderboardServiceService);


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
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/quiz-leaderboard-service/src/main.ts");
/******/ 	
/******/ })()
;