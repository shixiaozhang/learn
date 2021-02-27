/*
 * @Author: your name
 * @Date: 2021-01-15 17:40:56
 * @LastEditTime: 2021-02-27 21:09:14
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

    return list === x.toString()
};
console.log(isPalindrome(-121));

Promise._race = promises => new Promise((resolve, reject) => {
    promises.forEach(promise => {
        promise.then(resolve, reject)
    })
})

Promise.myrace = function (iterator) {
    return new Promise((resolve, reject) => {
        try {
            let it = iterator[Symbol.iterator]();
            while (true) {
                let res = it.next();
                console.log(res);
                if (res.done) break;
                if (res.value instanceof Promise) {
                    res.value.then(resolve, reject);
                } else {
                    resolve(res.value)
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}