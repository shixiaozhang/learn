const loaderUtils = require('loader-utils')//获取参数的插件
const fs = require('fs');
const path = require('path');

//同步loader
const sync = function (source) {
        const { name } = loaderUtils.getOptions(this);//获取参数

        console.log("name", name);
        const json = JSON.stringify(source)
                .replace(/\u2028/g, '\\u2028')
                .replace(/\u2029/g, '\\u2029');
        // return `export default ${json}`//返回结果  1
        this.callback(null, json)//返回结果 2 ---常用

        // throw new Error('Error')//抛出异常的方式 1
        // this.callback(new Error('Error'),json)//抛出异常的方式 2---常用



}

//异步loader


const Async = function (source) {
        const { name } = loaderUtils.getOptions(this);//获取参数
        const callback = this.async() //获取异步的回调函数

        this.cacheable=false //关闭webpack 默认开启的缓存
        console.log("name", name);
        const json = JSON.stringify(source)
                .replace(/\u2028/g, '\\u2028')
                .replace(/\u2029/g, '\\u2029');

        fs.readFile(path.join(__dirname, '../src/async.txt'), 'utf-8', (err, data) => {
               if(err){
                callback(err, data);
               }else{
                callback(null, data);
               }
               
        })

}


module.exports = Async