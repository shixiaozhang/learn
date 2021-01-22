/*
 * @Author: your name
 * @Date: 2021-01-08 15:14:19
 * @LastEditTime: 2021-01-22 15:48:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit 
 * @FilePath: \learn\WebpackDome\webpack-react\webpack\webpack.base.js
 */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // entry: {
    //     app: '/src/index.jsx'
    // },
    entry: {
        app: {
            import: '/src/index.jsx',
            dependOn: 'react_vendors',
        },
        react_vendors: {
            import: ['react', 'react-dom'],
            filename: '_commom/[name].js'
        }
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        // 项目路径别名
        alias: {
            // '@': path.resolve(__dirname, "./src/components"),
            '@': path.resolve(__dirname, "./static"),
        },
        extensions: ['.js', '.jsx', '.json']
    },
    performance: {
        // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
        hints: false,
        // 开发环境设置较大防止警告
        // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
        maxEntrypointSize: 5000000,
        // 最大单个资源体积，默认250000 (bytes)
        maxAssetSize: 3000000,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                // include: path.resolve(__dirname, '../src'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ["@babel/preset-env","@babel/preset-react"],
                    //     plugins: ['@babel/plugin-proposal-class-properties']
                    // }
                },

            },
            {
                test: /\.(c|le)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                //匹配图片、
                test: /\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/,
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

        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        })
    ]
}