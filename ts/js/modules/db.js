"use strict";
// const bb="213123"
// const cc="213123"
// const dd="213123"
Object.defineProperty(exports, "__esModule", { value: true });
exports.MgDbM = exports.MySqlDbM = void 0;
var MySqlDbM = /** @class */ (function () {
    function MySqlDbM() {
    }
    MySqlDbM.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MySqlDbM.prototype.update = function (info) {
        console.log(info);
        return true;
    };
    MySqlDbM.prototype.delate = function (id) {
        console.log(id);
        return true;
    };
    MySqlDbM.prototype.get = function (id) {
        console.log(id);
        var list = [{
                id: 1,
                name: 'q23qweq'
            }];
        return list;
    };
    return MySqlDbM;
}());
exports.MySqlDbM = MySqlDbM;
var MgDbM = /** @class */ (function () {
    function MgDbM() {
    }
    MgDbM.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MgDbM.prototype.update = function (info) {
        console.log(info);
        return true;
    };
    MgDbM.prototype.delate = function (id) {
        console.log(id);
        return true;
    };
    MgDbM.prototype.get = function (id) {
        console.log(id);
        var list = [{
                id: 1,
                name: 'q23qweq'
            }];
        return list;
    };
    return MgDbM;
}());
exports.MgDbM = MgDbM;
