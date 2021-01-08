/*
 * @Author: your name
 * @Date: 2021-01-08 15:15:05
 * @LastEditTime: 2021-01-08 20:39:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpack-react\webpack\webpack.dev.js
 */
const {merge}=require('webpack-merge')
const path=require('path')
const base=require('./webpack.base')
module.exports=merge(base,{
    mode:'development',
    devServer:{
        open:true,
        contentBase:path.join(__dirname,'./dist'),
        inline:true,
        hot:true,
        port:8888
    }
})
