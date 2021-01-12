/*
 * @Author: your name
 * @Date: 2021-01-11 17:26:34
 * @LastEditTime: 2021-01-12 10:10:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Other\算法\搜索推荐系统.js
 */
/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function (products, searchWord) {
    let strArr = searchWord.split('')
    let newStr = strArr.reduce((a, b) => {
        return `(${a})${b}`
    })
    products = products.sort()
    newStr = `(${newStr})`
    let reg = new RegExp(newStr)
    let n = searchWord.match(reg)
    n=n.sort()
    n.pop()
    return n.map(item => {
        let reg = new RegExp('^'+item)
        let index=0
        let list = products.filter(val => {
       
            if(index===3){
                return false
            }
            if(reg.test(val)){
                index++
                return reg.test(val)
            }
        })
        return list
    })

};
console.log(suggestedProducts(["mobile", "mouse", "moneypot", "monitor", "mousepad"], "mouse"));