/*
 * @Author: your name
 * @Date: 2021-01-06 20:36:55
 * @LastEditTime: 2021-01-06 21:15:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpack简单版\webpack.config.js
 */
const path=require('path')
const htmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
    entry:{
        app:'./index.html'
    },
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'[name]/index.js'
    },
    module:{
        rules:[
            {
               test:/\.js$/,
               exclude:/node_modules/,
               use:{
                loader:'babel-loader' ,
                option:{//es6 转 es5
                    presets:['@babel/preset-env']
                }
               }
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.(jpg|png|gif)$/,
                loader:'url-loader',
                options:{
                    limit:8*1024,
                    esModule:false,
                    name:'[hash:10].[ext]'
                }
            },
            {
                test:/\.html$/,
                loader:'html-loader'
            }
        ]
    },
    pligins:[
        new htmlWebpackPlugin({
            template:'./index.html'
        })
    ],
    devServe:{
        contentBase:path.resolve(__dirname,'dist'),
        compress:true,
        prot:8888,
        open:true
    }
}