/*
 * @Author: your name
 * @Date: 2021-01-14 20:17:00
 * @LastEditTime: 2021-01-14 21:07:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edits
 * @FilePath: \learn\Other\算法\字符串压缩.js
 */
let str="aabcccccaaa";
// let reg=/([A-Za-z])\1*/g
// let res=str.match(reg)
// console.log(res);

var compressString = function(S) {
    let reg=/([A-Za-z])\1*/g;
    let res=S.match(reg);
    let newStr='';    
    console.log(typeof res);
    for (let index = 0; index < res.length; index++) {
        newStr+=`${res[index][0]}${res[index].length}`
    }
    if( newStr.length < S.length){
        return newStr
    }
    return S

};
console.log(compressString(str));