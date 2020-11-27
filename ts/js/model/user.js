"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MgD = exports.UserInfo = void 0;
var db_1 = require("../modules/db");
var UserInfo = /** @class */ (function () {
    function UserInfo(params) {
        this.name = params.name;
        this.pass = params.pass;
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
var MgD = new db_1.MgDbM();
exports.MgD = MgD;
