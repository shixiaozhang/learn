/*
 * @Author: your name
 * @Date: 2021-01-15 17:40:56
 * @LastEditTime: 2021-01-15 17:45:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Other\算法\回文数.js
 */
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    let list = x.toString().split('')
    list = list.reverse().toString()
    list = list.replace(/,/g, '')
    
    return list===x.toString()
};
console.log(isPalindrome(-121));