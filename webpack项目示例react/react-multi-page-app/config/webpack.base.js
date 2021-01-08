/*
 * @Author: your name
 * @Date: 2021-01-06 20:01:49
 * @LastEditTime: 2021-01-08 20:21:56
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \react-multi-page-app\config\webpack.base.js
 */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const { setEntry, setHtmlPlugin } = require('./webpack.util')

module.exports = {
  entry: setEntry,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
          //匹配图片、
          test: /\.(jpg|png|gif)$/,
          loader: 'url-loader',
          //图片限制：小于8k，base64处理减少请求数量，但是会使体积更大
          options: {
              limit: 8 * 1024,
              //关闭url-loader的es6的模块化解析，会与html-loader冲突
              esModule: false,
              //[hash:10]去图片hash的前十位
              //[ext]扩展名..
              name: 'static/img/[hash:10].[ext]'
          }
      }
    ]
  },
  plugins: [
    ...setHtmlPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]/index.css',
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
}
