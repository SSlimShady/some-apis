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
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var routes_1 = require("./routes");
var student_entity_1 = require("./entity/student.entity");
typeorm_1.createConnection()
    .then(function (connection) { return __awaiter(void 0, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = express();
                app.use(cors());
                app.use(bodyParser.json());
                // register express routes from defined application routes
                routes_1.Routes.forEach(function (route) {
                    ;
                    app[route.method](route.route, function (req, res, next) {
                        var result = new route.controller()[route.action](req, res, next);
                        if (result instanceof Promise) {
                            result.then(function (result) { return (result !== null && result !== undefined ? res.send(result) : undefined); });
                        }
                        else if (result !== null && result !== undefined) {
                            res.json(result);
                        }
                    });
                });
                // start express server
                app.listen(4001);
                // insert 15 students
                return [4 /*yield*/, connection.manager.find(student_entity_1.Student).then(function (students) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log("We have " + students.length + " students");
                                    if (!(students.length === 0)) return [3 /*break*/, 16];
                                    return [4 /*yield*/, connection.manager.save(connection.manager.create(student_entity_1.Student, {
                                            first_name: "David",
                                            last_name: "Bowie",
                                            photo_url: "",
                                        }))];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, connection.manager.save(connection.manager.create(student_entity_1.Student, {
                                            first_name: "Robert",
                                            last_name: "Plant",
                                            photo_url: "",
                                        }))];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, connection.manager.save(connection.manager.create(student_entity_1.Student, {
                                            first_name: "James",
                                            last_name: "Bond",
                                            photo_url: "",
                                        }))];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, connection.manager.save(connection.manager.create(student_entity_1.Student, {
                                            first_name: "Bob",
                                            last_name: "Marley",
                                            photo_url: "",
                                        }))];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, connection.manager.save(connection.manager.create(student_entity_1.Student, {
                                            first_name: "Paul",
                                            last_name: "McCartney",
                                            photo_url: "",
                                        }))];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, connection.manager.save(connection.manager.create(student_entity_1.Student, {
                                            first_name: "George",
                                            last_name: "Harrison",
                                            photo_url: "",
                                        }))];
                                case 6:
                                    _a.sent();
                                    return [4 /*yield*/, connection.manager.save(connection.manager.create(student_entity_1.Student, {
                                            first_name: "Elton",
                                            last_name: "John",
                                            photo_url: "",
                                        }))];
                                case 7:
                                    _a.sent();
                                    return [4 /*yield*/, connection.manager.save(connection.manager.create(student_entity_1.Student, {
                                            first_name: "Simon",
                                            last_name: "Joyner",
                                            photo_url: "",
                                        }))];
                                case 8:
                                    _a.sent();
                                    return [4 /*yield*/, connection.manager.save(connection.manager.create(student_entity_1.Student, {
                                            first_name: "John",
                                            last_name: "Denver",
                                            photo_url: "",
                                        }))];
                                case 9:
                                    _a.sent();
                                    return [4 /*yield*/, connection.manager.save(connection.manager.create(student_entity_1.Student, {
                                            first_name: "Neil",
                                            last_name: "Diamond",
                                            photo_url: "",
                                        }))];
                                case 10:
                                    _a.sent();
                                    return [4 /*yield*/, connection.manager.save(connection.manager.create(student_entity_1.Student, {
                                            first_name: "Donna",
                                            last_name: "Summer",
                                            photo_url: "",
                                        }))];
                                case 11:
                                    _a.sent();
                                    return [4 /*yield*/, connection.manager.save(connection.manager.create(student_entity_1.Student, {
                                            first_name: "Aretha",
                                            last_name: "Franklin",
                                            photo_url: "",
                                        }))];
                                case 12:
                                    _a.sent();
                                    return [4 /*yield*/, connection.manager.save(connection.manager.create(student_entity_1.Student, {
                                            first_name: "Diana",
                                            last_name: "Ross",
                                            photo_url: "",
                                        }))];
                                case 13:
                                    _a.sent();
                                    return [4 /*yield*/, connection.manager.save(connection.manager.create(student_entity_1.Student, {
                                            first_name: "Kate",
                                            last_name: "Bush",
                                            photo_url: "",
                                        }))];
                                case 14:
                                    _a.sent();
                                    return [4 /*yield*/, connection.manager.save(connection.manager.create(student_entity_1.Student, {
                                            first_name: "Boz",
                                            last_name: "Scaggs",
                                            photo_url: "",
                                        }))];
                                case 15:
                                    _a.sent();
                                    _a.label = 16;
                                case 16: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                // insert 15 students
                _a.sent();
                console.log("Express server has started on port 4001. Open http://localhost:4001/student/get-all to see results");
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (error) { return console.log(error); });
//# sourceMappingURL=index.js.map