/*
 * @Author: your name
 * @Date: 2021-01-06 20:36:55
 * @LastEditTime: 2021-01-08 17:15:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpack简单版\webpack.config.js
 */
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
console.log(path.resolve(__dirname),)
console.log(path.join(__dirname),)

module.exports = {
    // entry:"./src/index.js",//单一入口
    // entry: {//多入口时，有可能会重复引入某个依赖
    //     app: './src/index.js',
    //     index:'./src/app.js'
    // },
    entry: {//多入口时，去除重复的依赖
        index: {
          import: './src/index.js',
          dependOn: 'shared',
        },
        app: {
          import: './src/app.js',
          dependOn: 'shared',
        },
        shared: 'lodash',
      },
    output: {
        publicPath: './',
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].bilud.js'
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,
               
                use: [
                    // 'style-loader',//会把css内嵌到js中
                    MiniCssExtractPlugin.loader,//“抽离css到单独的文件”
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {//es6 转 es5
                        presets: ['@babel/preset-env']
                    }
                }
            },
            
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,//压缩后的文件大小
                    esModule: false,
                    name: 'img/[hash:10].[ext]'//打包后的文件名和目录
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
               
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 每次打包前先清除之前的打包内容
        new MiniCssExtractPlugin({//“抽离css到单独的文件”
            filename: 'css/index.css',
          }),
          
        new htmlWebpackPlugin({
            template: "./indexcopy.html", // 打包 html 模板，会把入口文件自动引入
            filename: "index.html", // 打包后生成的文件名
        }),
        new htmlWebpackPlugin({//可以生成多个html
            
            filename: "index2.html", // 打包后生成的文件名
        })
    ],
    devServer: {
        // 告诉服务器内容的来源。仅在需要提供静态文件时才进行配置。
        // devServer.publicPath 将用于确定 bundle 的来源，并具有优先级高于 contentBase。
        contentBase: path.join(__dirname, "dist"),
        compress: true,//启动编码压缩
        port: 8888,//端口号
        inline: true, //实时刷新
        hot: true, // 开启热更新,
        //自动打开浏览器
        open: true
    }
    // devServer: {
    //     open: true,
    //     contentBase: path.join(__dirname, './dist'),
    //     compress: true,//启动编码压缩
    //     // historyApiFallback: true, //不跳转
    //     inline: true, //实时刷新
    //     hot: true, // 开启热更新,
    //     port: 8000
    //   }
}