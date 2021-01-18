"use strict";
/*
 * @Author: your name
 * @Date: 2021-01-13 10:53:28
 * @LastEditTime: 2021-01-18 17:13:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Ts\test.ts
 */
function rev(item) {
    return item;
}
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
var animal = {
    name: 'tom'
};
var tom = animal;
function createArray(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray(3, 'x'); // ['x', 'x', 'x']
var jiantou = function (val) { return val.toString(); }; // ==== var jiantou = function (val) { return val.toString(); };
var simple = function (foo) { return foo.toString(); }; //==== var simple = function (foo) { return foo.toString(); };
var simple2 = function (foo) { return foo.toString(); };
console.log(jiantou(10));
var Queue = /** @class */ (function () {
    function Queue() {
        var _this = this;
        this.data = [];
        this.push = function (item) { return _this.data.push(item); };
        this.pop = function () { return _this.data.shift(); };
    }
    Object.defineProperty(Queue.prototype, "datas", {
        get: function () {
            return this.data;
        },
        enumerable: false,
        configurable: true
    });
    return Queue;
}());
var queue = new Queue();
//   const queue = new Queue<number>();
queue.push(0);
queue.push('1'); // Oops，一个错误
// 一个使用者，走入了误区
//   console.log(queue.pop().toPrecision(1));
//   console.log(queue.pop().toPrecision(1)); // RUNTIME ERROR
console.log(queue.datas);
function iTakeAnAdder(adder) {
    return adder(1, 2);
}
var iTakeAnAdders = function (a, b) {
    //   return adder(1, 2);
    return a + b;
};
var point2D = { x: 0, y: 10 };
var point3D = { x: 0, y: 10, z: 20 };
function iTakePoint2D(point) {
    /* do something */
}
function iTakePointD(x, y, z) {
    /* do something */
}
iTakePoint2D(point2D); // ok, 完全匹配
iTakePoint2D(point3D); // 额外的信息，没关系
// iTakePointD(0, 10 ); // err 缺少信息
iTakePointD(0, 10, 20); // ok, 完全匹配
var Status;
(function (Status) {
    Status[Status["Ready"] = 0] = "Ready";
    Status[Status["Waiting"] = 1] = "Waiting";
})(Status || (Status = {}));
var statuss = Status.Ready;
var num = 1;
statuss = num;
console.log(statuss);
console.log(Status.Waiting);
console.log(Status);
num = statuss;
