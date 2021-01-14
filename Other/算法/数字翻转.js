/*
 * @Author: your name
 * @Date: 2021-01-14 19:17:41
 * @LastEditTime: 2021-01-14 19:33:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Other\算法\数字翻转.js
 */
var reverse = function(x) {
    if(x===0) return 0;
    x=x.toString().split('')
    x.reverse();
    if(x[x.length-1]==='-'){
            x.pop();
            x.splice(0,0,'-')
    }
    let str='';
    for (let index = 0; index < x.length; index++) {
        str+=x[index]
    }
    if(Math.abs(str) <= 2**31 - 1){
        return str
    }else{
        return 0
    }

};

console.log(reverse(-123));