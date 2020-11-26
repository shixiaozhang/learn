"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BB = void 0;
var BB;
(function (BB) {
    //和外界命名不相干
    BB.ZZZZZZZZ = 'ZZZZZZZZZZZZZZ';
    function cat() {
        console.log(BB.ZZZZZZZZ);
    }
    BB.cat = cat;
    var Dog = /** @class */ (function () {
        function Dog(name) {
            this.name = name;
        }
        Dog.prototype.setName = function () {
            console.log(this.name);
            console.log(BB.ZZZZZZZZ);
        };
        return Dog;
    }());
    BB.Dog = Dog;
})(BB = exports.BB || (exports.BB = {}));
