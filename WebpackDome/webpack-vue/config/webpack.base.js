/*
 * @Author: your name
 * @Date: 2021-01-11 10:14:49
 * @LastEditTime: 2021-01-11 15:14:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpack-vue\config\webpack.base.js
 */
const path=require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports={
    entry:'/src/main.js',
    output:{
        path:path.join(__dirname,'../dist'),
        filename:'[name].[chunkhash].js'
    },
    resolve:{
        alias:{
            assets:path.join(__dirname,'./src/assets'),
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions:['.js','.vue','.json']
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader'

            },
            {
                test: /\.(c|le)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
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
    plugins:[
        new CleanWebpackPlugin(),
         // 请确保引入这个插件！
       
        new htmlWebpackPlugin({
            template: path.join(__dirname,'../src/index.html'),
            filename: 'index.html'
        }),

        new VueLoaderPlugin(),
        
    ]
}