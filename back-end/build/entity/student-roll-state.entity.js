"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRollState = void 0;
var typeorm_1 = require("typeorm");
var StudentRollState = /** @class */ (function () {
    function StudentRollState() {
    }
    StudentRollState.prototype.prepareToCreate = function (input) {
        this.state = input.state;
        this.student_id = input.student_id;
        this.roll_id = input.roll_id;
    };
    StudentRollState.prototype.prepareToUpdate = function (input) {
        if (input.state !== undefined)
            this.state = input.state;
        if (input.student_id !== undefined)
            this.student_id = input.student_id;
        if (input.roll_id !== undefined)
            this.roll_id = input.roll_id;
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], StudentRollState.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], StudentRollState.prototype, "student_id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], StudentRollState.prototype, "roll_id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], StudentRollState.prototype, "state", void 0);
    StudentRollState = __decorate([
        typeorm_1.Entity()
    ], StudentRollState);
    return StudentRollState;
}());
exports.StudentRollState = StudentRollState;
//# sourceMappingURL=student-roll-state.entity.js.map