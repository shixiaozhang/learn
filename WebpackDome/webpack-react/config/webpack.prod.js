/*
 * @Author: your name
 * @Date: 2021-01-08 15:15:05
 * @LastEditTime: 2021-01-08 17:12:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpack-react\webpack\webpack.dev.js
 */
const {merge}=require('webpack-merge')
const base=require('./webpack.base')

module.exports=merge(base,{
    mode:'production'
})