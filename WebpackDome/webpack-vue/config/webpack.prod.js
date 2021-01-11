/*
 * @Author: your name
 * @Date: 2021-01-11 10:15:24
 * @LastEditTime: 2021-01-11 10:56:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpack-vue\config\webpack.prod.js
 */
const {merge}=require('webpack-merge')
const base=require('./webpack.base')

module.exports=merge(base,{
    mode:'production'
})