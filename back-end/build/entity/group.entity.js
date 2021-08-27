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
exports.Group = void 0;
var typeorm_1 = require("typeorm");
var Group = /** @class */ (function () {
    function Group() {
    }
    Group.prototype.prepareToCreate = function (input) {
        this.name = input.name;
        this.number_of_weeks = input.number_of_weeks;
        this.roll_states = input.roll_states;
        this.incidents = input.incidents;
        this.ltmt = input.ltmt;
        this.run_at = input.run_at;
        this.student_count = input.student_count;
    };
    Group.prototype.prepareToUpdate = function (input) {
        if (input.name !== undefined)
            this.name = input.name;
        if (input.number_of_weeks !== undefined)
            this.number_of_weeks = input.number_of_weeks;
        if (input.roll_states !== undefined)
            this.roll_states = input.roll_states;
        if (input.incidents !== undefined)
            this.incidents = input.incidents;
        if (input.ltmt !== undefined)
            this.ltmt = input.ltmt;
        if (input.run_at !== undefined)
            this.run_at = input.run_at;
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Group.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Group.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Group.prototype, "number_of_weeks", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Group.prototype, "roll_states", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Group.prototype, "incidents", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Group.prototype, "ltmt", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], Group.prototype, "run_at", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Group.prototype, "student_count", void 0);
    Group = __decorate([
        typeorm_1.Entity()
    ], Group);
    return Group;
}());
exports.Group = Group;
//# sourceMappingURL=group.entity.js.map