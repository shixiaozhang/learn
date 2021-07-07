/*
 * @Author: your name
 * @Date: 2021-01-06 18:43:00
 * @LastEditTime: 2021-07-07 22:24:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpack5\webpack.config.js
 */
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  //入口文件
  entry: {
    "swapPairs-build": path.resolve(__dirname, './src/index.js'),
    "swapPairs-build.min": path.resolve(__dirname, './src/index.js'),

  },
  output: {
    publicPath: './',
    //s输出的文件名
    filename: "[name].js",
    //输出的路径
    path: path.resolve(__dirname, "dist"),
    // 打包关健
    library: 'swapPairs',//库的全局名字
    libraryExport: 'default',//优化使用体验
    libraryTarget: 'umd'//通用支持设置，指定库的引入方式
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/
      })
    ]
  },
  mode: "none",
  
}