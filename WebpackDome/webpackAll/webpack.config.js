/*
 * @Author: your name
 * @Date: 2021-04-21 16:24:29
 * @LastEditTime: 2021-04-21 16:29:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpackAll\webpack.config.js
 */
const path=require('path')
module.exports={
    mode:'none',
    entry:path.join(__dirname,'./src/index.js'),
    output:{
    filename:'index.js',
    path:path.join(__dirname,'./dist')    
    },
}