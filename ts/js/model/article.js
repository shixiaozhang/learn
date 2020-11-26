"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mys = exports.Article = void 0;
var db_1 = require("../modules/db");
var Article = /** @class */ (function () {
    function Article(id) {
        this.id = id;
    }
    return Article;
}());
exports.Article = Article;
var Mys = new db_1.MySqlDbM();
exports.Mys = Mys;
