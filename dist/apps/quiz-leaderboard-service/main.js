/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/quiz-leaderboard-service/src/dtos/attempt-answer.dto.ts":
/*!**********************************************************************!*\
  !*** ./apps/quiz-leaderboard-service/src/dtos/attempt-answer.dto.ts ***!
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
exports.AttemptAnswerResponseDto = exports.UpdateAttemptAnswerDto = exports.CreateAttemptAnswerDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateAttemptAnswerDto {
    attemptId;
    questionId;
    selectedOptionId;
    userAnswer;
}
exports.CreateAttemptAnswerDto = CreateAttemptAnswerDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAttemptAnswerDto.prototype, "attemptId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAttemptAnswerDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAttemptAnswerDto.prototype, "selectedOptionId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAttemptAnswerDto.prototype, "userAnswer", void 0);
class UpdateAttemptAnswerDto {
    selectedOptionId;
    userAnswer;
    isCorrect;
}
exports.UpdateAttemptAnswerDto = UpdateAttemptAnswerDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateAttemptAnswerDto.prototype, "selectedOptionId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAttemptAnswerDto.prototype, "userAnswer", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateAttemptAnswerDto.prototype, "isCorrect", void 0);
class AttemptAnswerResponseDto {
    attemptAnswerId;
    attemptId;
    questionId;
    selectedOptionId;
    userAnswer;
    isCorrect;
}
exports.AttemptAnswerResponseDto = AttemptAnswerResponseDto;


/***/ }),

/***/ "./apps/quiz-leaderboard-service/src/dtos/complete-quiz.dto.ts":
/*!*********************************************************************!*\
  !*** ./apps/quiz-leaderboard-service/src/dtos/complete-quiz.dto.ts ***!
  \*********************************************************************/
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
exports.CompleteQuizDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const question_dto_1 = __webpack_require__(/*! ./question.dto */ "./apps/quiz-leaderboard-service/src/dtos/question.dto.ts");
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
    (0, class_transformer_1.Type)(() => question_dto_1.CreateQuestionDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CompleteQuizDto.prototype, "questions", void 0);


/***/ }),

/***/ "./apps/quiz-leaderboard-service/src/dtos/question.dto.ts":
/*!****************************************************************!*\
  !*** ./apps/quiz-leaderboard-service/src/dtos/question.dto.ts ***!
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
exports.CreateQuestionDto = exports.CreateQuestionOptionDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
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


/***/ }),

/***/ "./apps/quiz-leaderboard-service/src/dtos/quiz-attempt.dto.ts":
/*!********************************************************************!*\
  !*** ./apps/quiz-leaderboard-service/src/dtos/quiz-attempt.dto.ts ***!
  \********************************************************************/
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
exports.QuizAttemptResponseDto = exports.UpdateQuizAttemptDto = exports.CreateQuizAttemptDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateQuizAttemptDto {
    quizId;
    userId;
}
exports.CreateQuizAttemptDto = CreateQuizAttemptDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateQuizAttemptDto.prototype, "quizId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateQuizAttemptDto.prototype, "userId", void 0);
class UpdateQuizAttemptDto {
    score;
    isCompleted;
}
exports.UpdateQuizAttemptDto = UpdateQuizAttemptDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], UpdateQuizAttemptDto.prototype, "score", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateQuizAttemptDto.prototype, "isCompleted", void 0);
class QuizAttemptResponseDto {
    attemptId;
    quizId;
    userId;
    score;
    attemptAt;
    isCompleted;
}
exports.QuizAttemptResponseDto = QuizAttemptResponseDto;


/***/ }),

/***/ "./apps/quiz-leaderboard-service/src/dtos/quiz.dto.ts":
/*!************************************************************!*\
  !*** ./apps/quiz-leaderboard-service/src/dtos/quiz.dto.ts ***!
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
exports.CreateQuizDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const question_dto_1 = __webpack_require__(/*! ./question.dto */ "./apps/quiz-leaderboard-service/src/dtos/question.dto.ts");
class CreateQuizDto {
    groupId;
    title;
    description;
    timeLimit;
    difficulty;
    instructions;
    questions;
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
    (0, class_validator_1.IsEnum)(['EASY', 'MEDIUM', 'HARD']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "difficulty", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuizDto.prototype, "instructions", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => question_dto_1.CreateQuestionDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateQuizDto.prototype, "questions", void 0);


/***/ }),

/***/ "./apps/quiz-leaderboard-service/src/entities/attemptanswer.entity.ts":
/*!****************************************************************************!*\
  !*** ./apps/quiz-leaderboard-service/src/entities/attemptanswer.entity.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttemptAnswer = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const quizattempt_entity_1 = __webpack_require__(/*! ./quizattempt.entity */ "./apps/quiz-leaderboard-service/src/entities/quizattempt.entity.ts");
let AttemptAnswer = class AttemptAnswer {
    attemptAnswerId;
    attemptId;
    questionId;
    selectedOptionId;
    userAnswer;
    isCorrect;
    attempt;
};
exports.AttemptAnswer = AttemptAnswer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AttemptAnswer.prototype, "attemptAnswerId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], AttemptAnswer.prototype, "attemptId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], AttemptAnswer.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", Object)
], AttemptAnswer.prototype, "selectedOptionId", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], AttemptAnswer.prototype, "userAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { nullable: true }),
    __metadata("design:type", Object)
], AttemptAnswer.prototype, "isCorrect", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quizattempt_entity_1.QuizAttempt, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'attemptId' }),
    __metadata("design:type", typeof (_a = typeof quizattempt_entity_1.QuizAttempt !== "undefined" && quizattempt_entity_1.QuizAttempt) === "function" ? _a : Object)
], AttemptAnswer.prototype, "attempt", void 0);
exports.AttemptAnswer = AttemptAnswer = __decorate([
    (0, typeorm_1.Entity)('attemptanswer')
], AttemptAnswer);


/***/ }),

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
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'optionid' }),
    __metadata("design:type", String)
], QuestionOption.prototype, "optionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false, name: 'questionid' }),
    __metadata("design:type", String)
], QuestionOption.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250, nullable: false, name: 'optiontext' }),
    __metadata("design:type", String)
], QuestionOption.prototype, "optionText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'iscorrect' }),
    __metadata("design:type", Boolean)
], QuestionOption.prototype, "isCorrect", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_entity_1.Question, question => question.questionOptions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'questionid' }),
    __metadata("design:type", typeof (_a = typeof question_entity_1.Question !== "undefined" && question_entity_1.Question) === "function" ? _a : Object)
], QuestionOption.prototype, "question", void 0);
exports.QuestionOption = QuestionOption = __decorate([
    (0, typeorm_1.Entity)('questionoption')
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
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'questionid' }),
    __metadata("design:type", String)
], Question.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false, name: 'quizid' }),
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
        enum: ['MCQ', 'TRUE_FALSE', 'SHORT_ANSWER'],
        name: 'questiontype'
    }),
    __metadata("design:type", String)
], Question.prototype, "questionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], Question.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'correctanswer' }),
    __metadata("design:type", String)
], Question.prototype, "correctAnswer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_entity_1.Quiz, quiz => quiz.questions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'quizid' }),
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
    difficulty;
    instructions;
    questions;
};
exports.Quiz = Quiz;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'quizid' }),
    __metadata("design:type", String)
], Quiz.prototype, "quizId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false, name: 'groupid' }),
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
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'timelimit' }),
    __metadata("design:type", Number)
], Quiz.prototype, "timeLimit", void 0);
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

/***/ "./apps/quiz-leaderboard-service/src/entities/quizattempt.entity.ts":
/*!**************************************************************************!*\
  !*** ./apps/quiz-leaderboard-service/src/entities/quizattempt.entity.ts ***!
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
exports.QuizAttempt = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const attemptanswer_entity_1 = __webpack_require__(/*! ./attemptanswer.entity */ "./apps/quiz-leaderboard-service/src/entities/attemptanswer.entity.ts");
let QuizAttempt = class QuizAttempt {
    attemptId;
    quizId;
    userId;
    score;
    attemptAt;
    isCompleted;
    answers;
};
exports.QuizAttempt = QuizAttempt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'attemptid' }),
    __metadata("design:type", String)
], QuizAttempt.prototype, "attemptId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { name: 'quizid' }),
    __metadata("design:type", String)
], QuizAttempt.prototype, "quizId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { name: 'userid' }),
    __metadata("design:type", String)
], QuizAttempt.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2, default: 0, name: 'score' }),
    __metadata("design:type", Number)
], QuizAttempt.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'attemptat' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], QuizAttempt.prototype, "attemptAt", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false, name: 'iscompleted' }),
    __metadata("design:type", Boolean)
], QuizAttempt.prototype, "isCompleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attemptanswer_entity_1.AttemptAnswer, attemptAnswer => attemptAnswer.attempt),
    __metadata("design:type", Array)
], QuizAttempt.prototype, "answers", void 0);
exports.QuizAttempt = QuizAttempt = __decorate([
    (0, typeorm_1.Entity)('quizattempt')
], QuizAttempt);


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
            port: 3006,
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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuizLeaderboardServiceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const quiz_leaderboard_service_service_1 = __webpack_require__(/*! ./quiz-leaderboard-service.service */ "./apps/quiz-leaderboard-service/src/quiz-leaderboard-service.service.ts");
const quiz_dto_1 = __webpack_require__(/*! ./dtos/quiz.dto */ "./apps/quiz-leaderboard-service/src/dtos/quiz.dto.ts");
const complete_quiz_dto_1 = __webpack_require__(/*! ./dtos/complete-quiz.dto */ "./apps/quiz-leaderboard-service/src/dtos/complete-quiz.dto.ts");
const quiz_attempt_dto_1 = __webpack_require__(/*! ./dtos/quiz-attempt.dto */ "./apps/quiz-leaderboard-service/src/dtos/quiz-attempt.dto.ts");
const attempt_answer_dto_1 = __webpack_require__(/*! ./dtos/attempt-answer.dto */ "./apps/quiz-leaderboard-service/src/dtos/attempt-answer.dto.ts");
let QuizLeaderboardServiceController = class QuizLeaderboardServiceController {
    quizLeaderboardServiceService;
    constructor(quizLeaderboardServiceService) {
        this.quizLeaderboardServiceService = quizLeaderboardServiceService;
    }
    async createQuiz(createQuizDto) {
        try {
            console.log('Quiz service received data:', createQuizDto);
            const quiz = await this.quizLeaderboardServiceService.createQuiz(createQuizDto);
            console.log('Quiz service created quiz:', quiz);
            return {
                success: true,
                data: quiz,
                message: 'Quiz created successfully'
            };
        }
        catch (error) {
            console.error('Quiz service error:', error);
            return {
                success: false,
                data: null,
                message: 'Error creating quiz: ' + (error?.message || error)
            };
        }
    }
    async completeQuizWithQuestions(completeQuizDto) {
        try {
            console.log('Quiz service received complete quiz data:', completeQuizDto);
            const quiz = await this.quizLeaderboardServiceService.completeQuizWithQuestions(completeQuizDto);
            console.log('Quiz service completed quiz with questions:', quiz);
            return {
                success: true,
                data: quiz,
                message: 'Quiz completed successfully with questions and options'
            };
        }
        catch (error) {
            console.error('Quiz service complete error:', error);
            return {
                success: false,
                data: null,
                message: 'Error completing quiz: ' + (error?.message || error)
            };
        }
    }
    async createCompleteQuiz(createQuizDto) {
        try {
            console.log('Quiz service received complete quiz creation data:', createQuizDto);
            const quiz = await this.quizLeaderboardServiceService.createCompleteQuiz(createQuizDto);
            console.log('Quiz service created complete quiz:', quiz);
            return {
                success: true,
                data: quiz,
                message: 'Complete quiz created successfully'
            };
        }
        catch (error) {
            console.error('Quiz service complete creation error:', error);
            return {
                success: false,
                data: null,
                message: 'Error creating complete quiz: ' + (error?.message || error)
            };
        }
    }
    async getQuizzesByGroup(data) {
        try {
            console.log('Quiz service received get quizzes by group request:', data);
            const quizzes = await this.quizLeaderboardServiceService.getQuizByGroupId(data.groupId);
            console.log('Quiz service found quizzes:', quizzes);
            return {
                success: true,
                data: quizzes,
                message: `Found ${quizzes.length} quizzes for group`
            };
        }
        catch (error) {
            console.error('Quiz service get by group error:', error);
            return {
                success: false,
                data: null,
                message: 'Error fetching quizzes: ' + (error?.message || error)
            };
        }
    }
    async getQuizById(data) {
        try {
            console.log('Quiz service getting quiz by ID:', data.quizId);
            const quiz = await this.quizLeaderboardServiceService.getQuizById(data.quizId);
            console.log('Quiz service found quiz:', quiz);
            return {
                success: true,
                data: quiz,
                message: 'Quiz retrieved successfully'
            };
        }
        catch (error) {
            console.error('Quiz service get by ID error:', error);
            return {
                success: false,
                data: null,
                message: 'Error fetching quiz: ' + (error?.message || error)
            };
        }
    }
    async startQuizAttempt(createQuizAttemptDto) {
        try {
            console.log('Starting quiz attempt:', createQuizAttemptDto);
            const result = await this.quizLeaderboardServiceService.startQuizAttempt(createQuizAttemptDto);
            console.log('Quiz attempt started:', result);
            return {
                success: true,
                data: result,
                message: 'Quiz attempt started successfully'
            };
        }
        catch (error) {
            console.error('Start quiz attempt error:', error);
            return {
                success: false,
                data: null,
                message: 'Error starting quiz attempt: ' + (error?.message || error)
            };
        }
    }
    async saveUserAnswer(createAttemptAnswerDto) {
        try {
            console.log('Saving user answer:', createAttemptAnswerDto);
            const result = await this.quizLeaderboardServiceService.saveUserAnswer(createAttemptAnswerDto);
            console.log('User answer saved:', result);
            return {
                success: true,
                data: result,
                message: 'Answer saved successfully'
            };
        }
        catch (error) {
            console.error('Save user answer error:', error);
            return {
                success: false,
                data: null,
                message: 'Error saving answer: ' + (error?.message || error)
            };
        }
    }
    async completeQuizAttempt(data) {
        try {
            console.log('Completing quiz attempt:', data);
            const result = await this.quizLeaderboardServiceService.completeQuizAttempt(data.attemptId, data.userId);
            console.log('Quiz attempt completed:', result);
            return {
                success: true,
                data: result,
                message: 'Quiz attempt completed successfully'
            };
        }
        catch (error) {
            console.error('Complete quiz attempt error:', error);
            return {
                success: false,
                data: null,
                message: 'Error completing quiz attempt: ' + (error?.message || error)
            };
        }
    }
    async getUserQuizAttempts(data) {
        try {
            console.log('Getting user quiz attempts:', data);
            const result = await this.quizLeaderboardServiceService.getUserQuizAttempts(data.userId, data.quizId);
            console.log('User quiz attempts found:', result);
            return {
                success: true,
                data: result,
                message: 'User quiz attempts retrieved successfully'
            };
        }
        catch (error) {
            console.error('Get user quiz attempts error:', error);
            return {
                success: false,
                data: null,
                message: 'Error retrieving user quiz attempts: ' + (error?.message || error)
            };
        }
    }
};
exports.QuizLeaderboardServiceController = QuizLeaderboardServiceController;
__decorate([
    (0, microservices_1.MessagePattern)('create_quiz'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof quiz_dto_1.CreateQuizDto !== "undefined" && quiz_dto_1.CreateQuizDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], QuizLeaderboardServiceController.prototype, "createQuiz", null);
__decorate([
    (0, microservices_1.MessagePattern)('complete_quiz_with_questions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof complete_quiz_dto_1.CompleteQuizDto !== "undefined" && complete_quiz_dto_1.CompleteQuizDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], QuizLeaderboardServiceController.prototype, "completeQuizWithQuestions", null);
__decorate([
    (0, microservices_1.MessagePattern)('create_complete_quiz'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof quiz_dto_1.CreateQuizDto !== "undefined" && quiz_dto_1.CreateQuizDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], QuizLeaderboardServiceController.prototype, "createCompleteQuiz", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_quizzes_by_group'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizLeaderboardServiceController.prototype, "getQuizzesByGroup", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_quiz_by_id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizLeaderboardServiceController.prototype, "getQuizById", null);
__decorate([
    (0, microservices_1.MessagePattern)('start_quiz_attempt'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof quiz_attempt_dto_1.CreateQuizAttemptDto !== "undefined" && quiz_attempt_dto_1.CreateQuizAttemptDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], QuizLeaderboardServiceController.prototype, "startQuizAttempt", null);
__decorate([
    (0, microservices_1.MessagePattern)('save_user_answer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof attempt_answer_dto_1.CreateAttemptAnswerDto !== "undefined" && attempt_answer_dto_1.CreateAttemptAnswerDto) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], QuizLeaderboardServiceController.prototype, "saveUserAnswer", null);
__decorate([
    (0, microservices_1.MessagePattern)('complete_quiz_attempt'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizLeaderboardServiceController.prototype, "completeQuizAttempt", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_user_quiz_attempts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizLeaderboardServiceController.prototype, "getUserQuizAttempts", null);
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
const quizattempt_entity_1 = __webpack_require__(/*! ./entities/quizattempt.entity */ "./apps/quiz-leaderboard-service/src/entities/quizattempt.entity.ts");
const attemptanswer_entity_1 = __webpack_require__(/*! ./entities/attemptanswer.entity */ "./apps/quiz-leaderboard-service/src/entities/attemptanswer.entity.ts");
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
                        entities: [quiz_entity_1.Quiz, question_entity_1.Question, question_option_entity_1.QuestionOption, quizattempt_entity_1.QuizAttempt, attemptanswer_entity_1.AttemptAnswer],
                        synchronize: true,
                        ssl: {
                            rejectUnauthorized: configService.get('DB_SSL_REJECT_UNAUTHORIZED') ===
                                'true',
                        },
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([quiz_entity_1.Quiz, question_entity_1.Question, question_option_entity_1.QuestionOption, quizattempt_entity_1.QuizAttempt, attemptanswer_entity_1.AttemptAnswer]),
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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuizLeaderboardServiceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const quiz_entity_1 = __webpack_require__(/*! ./entities/quiz.entity */ "./apps/quiz-leaderboard-service/src/entities/quiz.entity.ts");
const question_entity_1 = __webpack_require__(/*! ./entities/question.entity */ "./apps/quiz-leaderboard-service/src/entities/question.entity.ts");
const question_option_entity_1 = __webpack_require__(/*! ./entities/question-option.entity */ "./apps/quiz-leaderboard-service/src/entities/question-option.entity.ts");
const quizattempt_entity_1 = __webpack_require__(/*! ./entities/quizattempt.entity */ "./apps/quiz-leaderboard-service/src/entities/quizattempt.entity.ts");
const attemptanswer_entity_1 = __webpack_require__(/*! ./entities/attemptanswer.entity */ "./apps/quiz-leaderboard-service/src/entities/attemptanswer.entity.ts");
let QuizLeaderboardServiceService = class QuizLeaderboardServiceService {
    quizRepository;
    questionRepository;
    questionOptionRepository;
    quizAttemptRepository;
    attemptAnswerRepository;
    dataSource;
    constructor(quizRepository, questionRepository, questionOptionRepository, quizAttemptRepository, attemptAnswerRepository, dataSource) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.questionOptionRepository = questionOptionRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.attemptAnswerRepository = attemptAnswerRepository;
        this.dataSource = dataSource;
    }
    async createQuiz(CreateQuizDto) {
        try {
            const quiz = this.quizRepository.create({
                groupId: CreateQuizDto.groupId,
                title: CreateQuizDto.title,
                description: CreateQuizDto.description,
                timeLimit: CreateQuizDto.timeLimit,
                difficulty: CreateQuizDto.difficulty,
                instructions: CreateQuizDto.instructions,
            });
            const savedQuiz = await this.quizRepository.save(quiz);
            return savedQuiz;
        }
        catch (error) {
            console.error('Error creating quiz:', error);
            throw error;
        }
    }
    async completeQuizWithQuestions(completeQuizDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const quiz = await queryRunner.manager.findOne(quiz_entity_1.Quiz, {
                where: { quizId: completeQuizDto.quizId }
            });
            if (!quiz) {
                throw new Error('Quiz not found');
            }
            for (const questionDto of completeQuizDto.questions) {
                const question = queryRunner.manager.create(question_entity_1.Question, {
                    quizId: quiz.quizId,
                    question: questionDto.question,
                    questionType: questionDto.questionType || 'MCQ',
                    points: questionDto.points || 1,
                    correctAnswer: questionDto.correctAnswer,
                });
                const savedQuestion = await queryRunner.manager.save(question_entity_1.Question, question);
                if (questionDto.options && questionDto.options.length > 0) {
                    for (const optionDto of questionDto.options) {
                        const option = queryRunner.manager.create(question_option_entity_1.QuestionOption, {
                            questionId: savedQuestion.questionId,
                            optionText: optionDto.optionText,
                            isCorrect: optionDto.isCorrect || false,
                        });
                        await queryRunner.manager.save(question_option_entity_1.QuestionOption, option);
                    }
                }
            }
            await queryRunner.commitTransaction();
            const completeQuiz = await this.quizRepository.findOne({
                where: { quizId: quiz.quizId },
                relations: ['questions', 'questions.questionOptions'],
            });
            if (!completeQuiz) {
                throw new Error('Quiz not found after creation');
            }
            return completeQuiz;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error completing quiz with questions:', error);
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async createCompleteQuiz(createQuizDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const quiz = queryRunner.manager.create(quiz_entity_1.Quiz, {
                groupId: createQuizDto.groupId,
                title: createQuizDto.title,
                description: createQuizDto.description,
                timeLimit: createQuizDto.timeLimit,
                difficulty: createQuizDto.difficulty,
                instructions: createQuizDto.instructions,
            });
            const savedQuiz = await queryRunner.manager.save(quiz_entity_1.Quiz, quiz);
            if (createQuizDto.questions && createQuizDto.questions.length > 0) {
                for (const questionDto of createQuizDto.questions) {
                    const question = queryRunner.manager.create(question_entity_1.Question, {
                        quizId: savedQuiz.quizId,
                        question: questionDto.question,
                        questionType: questionDto.questionType || 'MCQ',
                        points: questionDto.points || 1,
                        correctAnswer: questionDto.correctAnswer,
                    });
                    const savedQuestion = await queryRunner.manager.save(question_entity_1.Question, question);
                    if (questionDto.options && questionDto.options.length > 0) {
                        for (const optionDto of questionDto.options) {
                            const option = queryRunner.manager.create(question_option_entity_1.QuestionOption, {
                                questionId: savedQuestion.questionId,
                                optionText: optionDto.optionText,
                                isCorrect: optionDto.isCorrect || false,
                            });
                            await queryRunner.manager.save(question_option_entity_1.QuestionOption, option);
                        }
                    }
                }
            }
            await queryRunner.commitTransaction();
            const completeQuiz = await this.quizRepository.findOne({
                where: { quizId: savedQuiz.quizId },
                relations: ['questions', 'questions.questionOptions'],
            });
            if (!completeQuiz) {
                throw new Error('Quiz not found after creation');
            }
            return completeQuiz;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error creating complete quiz:', error);
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getQuizByGroupId(groupId) {
        try {
            const quizzes = await this.quizRepository.find({
                where: { groupId },
                relations: ['questions', 'questions.questionOptions'],
            });
            return quizzes;
        }
        catch (error) {
            console.error('Error fetching quizzes by groupId:', error);
            throw error;
        }
    }
    async getQuizById(quizId) {
        try {
            const quiz = await this.quizRepository.findOne({
                where: { quizId },
                relations: ['questions', 'questions.questionOptions'],
            });
            if (!quiz) {
                throw new Error('Quiz not found');
            }
            return quiz;
        }
        catch (error) {
            console.error('Error fetching quiz by ID:', error);
            throw error;
        }
    }
    async startQuizAttempt(createQuizAttemptDto) {
        try {
            const quizAttempt = this.quizAttemptRepository.create({
                quizId: createQuizAttemptDto.quizId,
                userId: createQuizAttemptDto.userId,
                score: 0,
                isCompleted: false,
            });
            const savedAttempt = await this.quizAttemptRepository.save(quizAttempt);
            return { attemptId: savedAttempt.attemptId };
        }
        catch (error) {
            console.error('Error starting quiz attempt:', error);
            throw error;
        }
    }
    async saveUserAnswer(createAttemptAnswerDto) {
        try {
            const question = await this.questionRepository.findOne({
                where: { questionId: createAttemptAnswerDto.questionId },
                relations: ['questionOptions'],
            });
            if (!question) {
                throw new Error('Question not found');
            }
            let isCorrect = null;
            if (question.questionType === 'MCQ' && createAttemptAnswerDto.selectedOptionId) {
                const selectedOption = question.questionOptions.find(option => option.optionId === createAttemptAnswerDto.selectedOptionId);
                isCorrect = selectedOption ? selectedOption.isCorrect : false;
            }
            else if (question.questionType === 'TRUE_FALSE' && createAttemptAnswerDto.selectedOptionId) {
                const selectedOption = question.questionOptions.find(option => option.optionId === createAttemptAnswerDto.selectedOptionId);
                isCorrect = selectedOption ? selectedOption.isCorrect : false;
            }
            else if (question.questionType === 'SHORT_ANSWER' && createAttemptAnswerDto.userAnswer) {
                const userAnswer = createAttemptAnswerDto.userAnswer.trim().toLowerCase();
                const correctAnswer = question.correctAnswer?.trim().toLowerCase();
                isCorrect = userAnswer === correctAnswer;
            }
            const existingAnswer = await this.attemptAnswerRepository.findOne({
                where: {
                    attemptId: createAttemptAnswerDto.attemptId,
                    questionId: createAttemptAnswerDto.questionId
                }
            });
            if (existingAnswer) {
                existingAnswer.selectedOptionId = createAttemptAnswerDto.selectedOptionId || null;
                existingAnswer.userAnswer = createAttemptAnswerDto.userAnswer || null;
                existingAnswer.isCorrect = isCorrect;
                const updatedAnswer = await this.attemptAnswerRepository.save(existingAnswer);
                return updatedAnswer;
            }
            else {
                const attemptAnswer = this.attemptAnswerRepository.create({
                    attemptId: createAttemptAnswerDto.attemptId,
                    questionId: createAttemptAnswerDto.questionId,
                    selectedOptionId: createAttemptAnswerDto.selectedOptionId || null,
                    userAnswer: createAttemptAnswerDto.userAnswer || null,
                    isCorrect: isCorrect,
                });
                const savedAnswer = await this.attemptAnswerRepository.save(attemptAnswer);
                return savedAnswer;
            }
        }
        catch (error) {
            console.error('Error saving user answer:', error);
            throw error;
        }
    }
    async completeQuizAttempt(attemptId, userId) {
        try {
            const quizAttempt = await this.quizAttemptRepository.findOne({
                where: { attemptId, userId },
                relations: ['answers']
            });
            if (!quizAttempt) {
                throw new Error('Quiz attempt not found');
            }
            if (quizAttempt.isCompleted) {
                throw new Error('Quiz attempt is already completed');
            }
            const questions = await this.questionRepository.find({
                where: { quizId: quizAttempt.quizId }
            });
            const totalPossiblePoints = questions.reduce((sum, question) => sum + question.points, 0);
            let userPoints = 0;
            const answers = await this.attemptAnswerRepository.find({
                where: { attemptId },
                relations: []
            });
            const questionPointsMap = new Map();
            questions.forEach(question => {
                questionPointsMap.set(question.questionId, question.points);
            });
            answers.forEach(answer => {
                if (answer.isCorrect) {
                    const questionPoints = questionPointsMap.get(answer.questionId) || 0;
                    userPoints += questionPoints;
                }
            });
            const percentageScore = totalPossiblePoints > 0 ? (userPoints / totalPossiblePoints) * 100 : 0;
            quizAttempt.score = Math.round(percentageScore * 100) / 100;
            quizAttempt.isCompleted = true;
            const updatedAttempt = await this.quizAttemptRepository.save(quizAttempt);
            return updatedAttempt;
        }
        catch (error) {
            console.error('Error completing quiz attempt:', error);
            throw error;
        }
    }
    async getUserQuizAttempts(userId, quizId) {
        try {
            const attempts = await this.quizAttemptRepository.find({
                where: {
                    userId,
                    quizId,
                    isCompleted: true
                },
                order: { attemptAt: 'DESC' }
            });
            if (attempts.length === 0) {
                return {
                    attempts: [],
                    bestScore: 0,
                    averageScore: 0,
                    totalAttempts: 0,
                };
            }
            const questions = await this.questionRepository.find({
                where: { quizId }
            });
            const totalQuestions = questions.length;
            const formattedAttempts = attempts.map(attempt => {
                const timeTaken = 0;
                return {
                    id: attempt.attemptId,
                    quizId: attempt.quizId,
                    userId: attempt.userId,
                    score: Math.round(attempt.score),
                    totalQuestions: totalQuestions,
                    percentage: attempt.score,
                    startedAt: attempt.attemptAt.toISOString(),
                    completedAt: attempt.attemptAt.toISOString(),
                    status: attempt.isCompleted ? 'COMPLETED' : 'IN_PROGRESS'
                };
            });
            const scores = attempts.map(attempt => parseFloat(attempt.score.toString())).filter(score => !isNaN(score));
            const bestScore = scores.length > 0 ? Math.max(...scores) : 0;
            const averageScore = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
            return {
                attempts: formattedAttempts,
                bestScore: Math.round(bestScore * 100) / 100,
                averageScore: Math.round(averageScore * 100) / 100,
                totalAttempts: attempts.length,
            };
        }
        catch (error) {
            console.error('Error fetching user quiz attempts:', error);
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
    __param(3, (0, typeorm_1.InjectRepository)(quizattempt_entity_1.QuizAttempt)),
    __param(4, (0, typeorm_1.InjectRepository)(attemptanswer_entity_1.AttemptAnswer)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _f : Object])
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