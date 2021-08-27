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
exports.Student = void 0;
var typeorm_1 = require("typeorm");
var Student = /** @class */ (function () {
    function Student() {
    }
    Student.prototype.prepareToCreate = function (input) {
        this.first_name = input.first_name;
        this.last_name = input.last_name;
        this.photo_url = input.photo_url;
    };
    Student.prototype.prepareToUpdate = function (input) {
        if (input.first_name !== undefined)
            this.first_name = input.first_name;
        if (input.last_name !== undefined)
            this.last_name = input.last_name;
        if (input.photo_url !== undefined)
            this.photo_url = input.photo_url;
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Student.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "first_name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "last_name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "photo_url", void 0);
    Student = __decorate([
        typeorm_1.Entity()
    ], Student);
    return Student;
}());
exports.Student = Student;
//# sourceMappingURL=student.entity.js.map