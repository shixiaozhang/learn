<!--
 * @Author: your name
 * @Date: 2021-01-06 14:34:26
 * @LastEditTime: 2021-01-06 15:48:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\Webpack笔记.md
-->
# 简易搭建流程（多页面）

## npm 初始化

   
    mkdir webpack-demo
    cd webpack-demo

    npm init -y
    //或
     yarn init
    //或
    npm init
    
    npm install webpack webpack-cli --save-dev
    
## 约定目录

    |____README.md
    |____package.json
    |____src
    | |____utils
    | |____components
    | |____pages
    | | |____page2
    | | | |____index.css
    | | | |____index.jsx
    | | |____page1
    | | | |____index.css
    | | | |____index.jsx


## Webpack 配置

### 安装 Webpack

    yarn add -D 可以使用 npm i --save-dev 替代

    yarn add -D webpack webpack-cli


### 创建配置文件 


    新建 webpack.config.js


### 入口配置


    module.exports = {
    entry: {
        page1: "./src/pages/page1/index.jsx",
        page2: "./src/pages/page2/index.jsx",
        // ...
    },
    };

### 输出配置

    module.exports = {
        entry: {
            page1: "./src/pages/page1/index.jsx",
            page2: "./src/pages/page2/index.jsx",
            // ...
        },
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "[name]/index.js",
        },
    };
### html 插件配置

  安装 html-webpack-plugin

    yarn add -D html-webpack-plugin

    module.exports = {
    ...
    plugins: [
        new HtmlWebpackPlugin({
        filename: 'page1/index.html',
        chunks: ['page1']
        }),
        new HtmlWebpackPlugin({
        filename: 'page2/index.html',
        chunks: ['page2']
        }),
    ],
    }

### 热更新


   cnpm install webpack-dev-server -g
   yarn add webpack-dev-server -g
    //启动webpack-dev-server

    module.exports = {
        ...
        devServer:{

            contentBase:path.resolve(__dirname,"dist"),
            //启动编码压缩
            compress:true,
            prot:6000,//端口号
            //自动打开浏览器
            open:true
        }
    }
   



# 单文件示例：

    let path = require('path')//node 自带的path模块可以获取自身所在的目录

    // console.log(path.resolve(__dirname,"dist"))

    //安装cnpm install html-webpack-plugin 

    let htmlWebpackPlugin = require('html-webpack-plugin')
    
    module.exports = {
        //入口文件
        entry: "./src/index.js",

        output: {
            //s输出的文件名
            filename: "bundle.js",
            //输出的路径
            path: path.resolve(__dirname, "dist")
        },
        
        //设置模式 production
        //webpack 入口文件 -o 出口文件 --mode=development（开发)/（生产）production
        //webpack默认可以处理js json
        //生产环境比开发环境多了压缩和代码混淆

        mode: "development",

        //loader配置
        
        module: {
            
            //对某种格式文件转换处理,rules转换规则

            rules: [
            {
                test: /\.css$/,
                use: [//loader转换方式从下往上执行（逆序）
                //将js的样式内容插入style标签里面
                "style-loader",
                //将css转换为js
                "css-loader"
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
                //[ext]扩展名
                name: '[hash:10].[ext]'
                }
            },
            {//处理htmlloader
                test: /\.html$/,
                loader: 'html-loader'
            }
            ]
        },
        //插件的配置
        plugins: [
            new htmlWebpackPlugin({
            template: './src/index.html'
            })
        ]
    }