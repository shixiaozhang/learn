"use strict";
// 基础类型
let typeString = "123";
let typeNumber = 123;
let typeBool = false;
let typeObject = {};
let typeSymbol = Symbol("key");
let typeUndefined = undefined;
let typeNull = null;
let tyoeBigint = 9007199254740991n || BigInt("1");
// 包装类型
let typeNumer2 = 123;
let typebool2 = false;
let typeString2 = "123";
let typeObject2 = {};
let typeSymbol2 = Symbol("key");
let typeArray = ["a"];
class typeClassType {
    constructor() { }
}
let typeClass = new typeClassType();
class Person {
    name;
    age;
}
const obj = {
    name: "xiaozhang",
    age: 12,
};
const func = (name) => {
    return `hello ${name}`;
};
function createPerson(ctr) {
    return new ctr("xiaozhang", 18);
}
const aObj = {};
aObj.name = "xiaozhan";
aObj.age = 18;
var Transplier;
(function (Transplier) {
    Transplier["Bable"] = "bable";
    Transplier["Postcss"] = "postcss";
    Transplier["Terser"] = "terser";
    Transplier["Prettier"] = "prettier";
    Transplier["TypeScriptCompiler"] = "typesvriptcompiler";
})(Transplier || (Transplier = {}));
const terser = Transplier.Terser;
