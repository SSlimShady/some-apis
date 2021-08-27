"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
var student_controller_1 = require("./controller/student-controller");
var roll_controller_1 = require("./controller/roll-controller");
var group_controller_1 = require("./controller/group-controller");
exports.Routes = [
    {
        method: "get",
        route: "/student/get-all",
        controller: student_controller_1.StudentController,
        action: "allStudents",
    },
    {
        method: "get",
        route: "/student/get-by-id",
        controller: student_controller_1.StudentController,
        action: "getStudent",
    },
    {
        method: "post",
        route: "/student/create",
        controller: student_controller_1.StudentController,
        action: "createStudent",
    },
    {
        method: "put",
        route: "/student/update",
        controller: student_controller_1.StudentController,
        action: "updateStudent",
    },
    {
        method: "delete",
        route: "/student/delete",
        controller: student_controller_1.StudentController,
        action: "removeStudent",
    },
    {
        method: "get",
        route: "/roll/get-all",
        controller: roll_controller_1.RollController,
        action: "allRolls",
    },
    {
        method: "get",
        route: "/roll/get-by-id",
        controller: roll_controller_1.RollController,
        action: "getRoll",
    },
    {
        method: "post",
        route: "/roll/create",
        controller: roll_controller_1.RollController,
        action: "createRoll",
    },
    {
        method: "put",
        route: "/roll/update",
        controller: roll_controller_1.RollController,
        action: "updateRoll",
    },
    {
        method: "delete",
        route: "/roll/delete",
        controller: roll_controller_1.RollController,
        action: "removeRoll",
    },
    {
        method: "post",
        route: "/roll/add-student-states",
        controller: roll_controller_1.RollController,
        action: "addStudentRollStates",
    },
    {
        method: "post",
        route: "/roll/add-student-roll-state",
        controller: roll_controller_1.RollController,
        action: "addStudentRollState",
    },
    {
        method: "put",
        route: "/roll/update-student-roll-state",
        controller: roll_controller_1.RollController,
        action: "updateStudentRollState",
    },
    {
        method: "post",
        route: "/group/create",
        controller: group_controller_1.GroupController,
        action: "createGroup",
    },
    {
        method: "get",
        route: "/group/get-all",
        controller: group_controller_1.GroupController,
        action: "allGroups",
    }
];
//# sourceMappingURL=routes.js.map