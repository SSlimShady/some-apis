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
exports.Roll = void 0;
var typeorm_1 = require("typeorm");
var Roll = /** @class */ (function () {
    function Roll() {
    }
    Roll.prototype.prepareToCreate = function (input) {
        this.name = input.name;
        if (input.completed_at !== undefined)
            this.completed_at = input.completed_at;
    };
    Roll.prototype.prepareToUpdate = function (input) {
        if (input.name !== undefined)
            this.name = input.name;
        if (input.completed_at !== undefined)
            this.completed_at = input.completed_at;
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Roll.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Roll.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Roll.prototype, "completed_at", void 0);
    Roll = __decorate([
        typeorm_1.Entity()
    ], Roll);
    return Roll;
}());
exports.Roll = Roll;
//# sourceMappingURL=roll.entity.js.map