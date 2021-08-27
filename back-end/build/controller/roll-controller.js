"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollController = void 0;
var typeorm_1 = require("typeorm");
var roll_entity_1 = require("../entity/roll.entity");
var student_roll_state_entity_1 = require("../entity/student-roll-state.entity");
var lodash_1 = require("lodash");
var RollController = /** @class */ (function () {
    function RollController() {
        this.rollRepository = typeorm_1.getRepository(roll_entity_1.Roll);
        this.studentRollStateRepository = typeorm_1.getRepository(student_roll_state_entity_1.StudentRollState);
    }
    RollController.prototype.allRolls = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.rollRepository.find()];
            });
        });
    };
    RollController.prototype.createRoll = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var params, createRollInput, roll;
            return __generator(this, function (_a) {
                params = request.body;
                createRollInput = {
                    name: params.name,
                    completed_at: params.completed_at,
                };
                roll = new roll_entity_1.Roll();
                roll.prepareToCreate(createRollInput);
                return [2 /*return*/, this.rollRepository.save(roll)];
            });
        });
    };
    RollController.prototype.updateRoll = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = request.body;
                this.rollRepository.findOne(params.id).then(function (roll) {
                    var updateRollInput = {
                        id: params.id,
                        name: params.name,
                        completed_at: params.completed_at,
                    };
                    roll.prepareToUpdate(updateRollInput);
                    return _this.rollRepository.save(roll);
                });
                return [2 /*return*/];
            });
        });
    };
    RollController.prototype.removeRoll = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var rollToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rollRepository.findOne(request.params.id)];
                    case 1:
                        rollToRemove = _a.sent();
                        return [4 /*yield*/, this.rollRepository.remove(rollToRemove)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RollController.prototype.getRoll = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.studentRollStateRepository.find({ roll_id: request.params.id })];
            });
        });
    };
    RollController.prototype.addStudentRollStates = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var params, studentRollStates;
            return __generator(this, function (_a) {
                params = request.body;
                studentRollStates = lodash_1.map(params, function (param) {
                    var createStudentRollStateInput = {
                        roll_id: param.roll_id,
                        student_id: param.student_id,
                        state: param.state,
                    };
                    var studentRollState = new student_roll_state_entity_1.StudentRollState();
                    studentRollState.prepareToCreate(createStudentRollStateInput);
                    return studentRollState;
                });
                return [2 /*return*/, this.studentRollStateRepository.save(studentRollStates)];
            });
        });
    };
    RollController.prototype.addStudentRollState = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var params, createStudentRollStateInput, studentRollState;
            return __generator(this, function (_a) {
                params = request.body;
                createStudentRollStateInput = {
                    roll_id: params.roll_id,
                    student_id: params.student_id,
                    state: params.state,
                };
                studentRollState = new student_roll_state_entity_1.StudentRollState();
                studentRollState.prepareToCreate(createStudentRollStateInput);
                return [2 /*return*/, this.studentRollStateRepository.save(studentRollState)];
            });
        });
    };
    RollController.prototype.updateStudentRollState = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = request.body;
                this.studentRollStateRepository.findOne(params.id).then(function (studentRollState) {
                    var updateStudentRollStateInput = {
                        id: params.id,
                        roll_id: params.roll_id,
                        student_id: params.student_id,
                        state: params.state,
                    };
                    studentRollState.prepareToUpdate(updateStudentRollStateInput);
                    return _this.studentRollStateRepository.save(studentRollState);
                });
                return [2 /*return*/];
            });
        });
    };
    return RollController;
}());
exports.RollController = RollController;
//# sourceMappingURL=roll-controller.js.map