/*
 * @Author: your name
 * @Date: 2021-01-11 17:26:34
 * @LastEditTime: 2021-01-11 17:58:12
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
    let length = searchWord.length
    let strArr = searchWord.split('')
    console.log(strArr);
    
    let newStr = strArr.reduce((a, b) => {
        return `(${a})${b}`
    })
    newStr = `(${newStr})`

    let reg = new RegExp(newStr)
    let n = searchWord.match(reg)
    console.log(n)
    let Nproducts= products.map(item=>{
        item.split('').map(val=>{
            strArr.map((value,index)=>{
                value===val[index]
            })
        })
    })
        

    return products = products.sort()



};
console.log(suggestedProducts(["mobile", "mouse", "moneypot", "monitor", "mousepad"], "mouse"));