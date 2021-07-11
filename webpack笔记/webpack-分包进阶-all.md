# 分包进阶：

基础部分：./webpack-分包-公共脚本分离.md
## 进一步分包:预编译资源模块

### 思路:

将 react、react-dom、redux、react-redux 基础包和业务基础包打包成一个文件

### 方法:

使用 DLLPlugin 进行分包，DllReferencePlugin 对 manifest.json 引用


* DLLPlugin: 分包，打包公共文件包，对多个框架组件库进行提取；除了会生成公共包文件，还会生成manifest.json
  - manifest.json：对各种包的一个描述文件


* DllReferencePlugin：用来引用 DLLPlugin 分离出来的包；引用manifest.json 会自动引用打包的文件；

### 使用 DLLPlugin 进行分包

* 增加 script 命令：

        "dll": "webpack --config webpack.dll.js"

* 新建 DLL 配置文件：

        //webpack.dll.js

        const path = require('path')
        const webpack = require('webpack')
        module.exports = {
            entry: {
                //选择要 提取的包
                library: [
                    'react',
                ],
                library_dom: [
                    'react-dom'
                ]
            },
            output: {
                filename: '[name]_[chunkhash].dll.js',
                path: path.join(__dirname, './build/library'),
                library: '[name]'//暴露除库的名字
            },
            plugins: [
                new webpack.DllPlugin({
                    context:__dirname,
                    name:'[name]_[hash]',
                    path:path.join(__dirname, './build/library/[name].json'),
                })
            ]
        }

* 在webpack.prod.js 中引入

        //? DllPluginreact之类的基础包 引入： 
        //引入基础包 
        new webpack.DllReferencePlugin({
            manifest:require('./build/library/library.json')
        }),
          //引入业务包
        new webpack.DllReferencePlugin({
            manifest:require('./build/library/library_dom.json')
        }),