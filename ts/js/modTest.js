"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./model/user");
var article_1 = require("./model/article");
var u = new user_1.UserInfo({
    name: '123',
    pass: '123'
});
var addInfo = user_1.MgD.add(u);
var AA = article_1.Mys.get(1);
