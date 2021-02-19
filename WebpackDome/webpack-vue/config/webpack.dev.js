/*
 * @Author: your name
 * @Date: 2021-01-11 10:15:11
 * @LastEditTime: 2021-02-19 16:19:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpack-vue\config\webpack.dev.js
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
        port:8800
    }
})