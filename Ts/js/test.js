"use strict";
/*
 * @Author: your name
 * @Date: 2021-01-13 10:53:28
 * @LastEditTime: 2021-01-15 16:23:36
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
