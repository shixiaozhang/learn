<!--
 * @Author: your name
 * @Date: 2021-01-06 14:34:26
 * @LastEditTime: 2021-04-21 19:08:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\Webpack笔记.md
-->
# 简易搭建流程（多页面）

# react-webpack

当jsx转js 和 es6 转es5 时babel-loader 的配置

        options: {
                presets: ['@babel/preset-react', '@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties']
                }

或者在.babelrc 文件中配置：

    {
        "presets": ["@babel/preset-react", "@babel/preset-env"],
        "plugins": ["@babel/plugin-proposal-class-properties"]
    }

## 在 postcss.config.js文件中配置：

    module.exports = {  
        plugins: {  
        'autoprefixer': {browsers: 'last 5 version'}  
        }  
    } 

WebpackDome/webpack-vue/node_modules
## webpack-merge合并配置

webpack-merge做了两件事：它允许连接数组并合并对象，而不是覆盖组合。如下所示：

    const merge = require("webpack-merge");
    merge(
        {a : [1],b:5,c:20},
        {a : [2],b:10, d: 421}
    )
    //合并后的结果
    {a : [1,2] ,b :10 , c : 20, d : 421}



## --env值传参

    "dev": "webpack --env development ",
    "prod": "webpack --env production",
    "dev:server": "webpack-dev-server --env development "

使用--env允许将字符串传递给配置。我们来修改下package.json,使得env参数mode环境参数传入到webpack.config.js中，就可以判断是生产环境还是开发环境

## hash chunkhash contenthash

    hash 是随整个工程内容的变化而变化
    chunkhash 只影响一个 chunk 下的模块，一个文件所依赖的代码块会打包进一个 chunk
    contenthash 只根据自身的内容变化 而变化, 但是如果 contenthash 发生变化，他所属的 chunkhash 也会变化

## url-loader和file-loader

 url-loader和file-loader是什么关系呢？简答地说，url-loader封装了file-loader。url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader。通过上面的介绍，我们可以看到，url-loader工作分两种情况：1.文件大小小于limit参数，url-loader将会把文件转为DataURL；2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。因此我们只需要安装url-loader即可。、

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



    .  
    |-- src                             项目源代码  
    |-- components                    项目通用组件
    |-- pages                         项目功能模块
        |-- index.js                    项目入口文件
    |-- static                          项目静态资源，图片，字体文件  
    |-- webpack                         webpack 打包相关的配置  
    |-- config.js                     通用配置变量抽离
    |-- webpack.config.common.js      webpack 公共配置
    |-- webpack.config.dev.js         本地开发环境打包配置
    |-- webpack.config.production.js  正式环境打包配置
    |-- config.js
    |-- index.html                      打包模板
    |-- .babelrc                        babel 相关配置文件
    |-- postcss.config.js               postcss 相关配置文件
    |-- .npmrc                          npm 安装源设置
    |-- package.json         




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
<!-- 代理配置 -->
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
    
    //output 是用来定义程序出口的，对应entry多文件入口的情况写法，如果要支持CJS、UMD、ESM、html页面直接引入，都是在这里通过配置实现的
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


                //test:表示loader匹配的test正则，默认为css，这里可以是（less、sass、stylus）。
                //include:表示所要打包的文件夹。
                //exclude：表示要跳过打包的文件夹。
                //use：外部导入的loader。
    
                同一后缀文件使用多个 loader 时，loader 有执行顺序，从右向左依次执行
                style-loader 提取css-loader打包后的css代码，并自动生成标签，然后插入 html 中
                css-loader只是把 css 代码打包进 js 文件而已，并不做任何操作
                less-loader 只是把 less 语法编译为 css 语法，然后 css-loader 把编译好的 css 内容插入 js 文件中，最后 style-loader 把 css 添加到标签并动态插入到 html 文件标签中
                postcss-loader使用顺序，放在能够拿到 css 内容的地方就可以，拿到 css 内容，通过一些 js 插件处理 css 达到增强 css 的效果
                                
                test: /\.(c|le)ss$/,
                use: [//loader转换方式从下往上执行（逆序）
                //将js的样式内容插入style标签里面
                "style-loader",
                postcss-loader,
                //将css转换为js
                "css-loader",
                less-loader,
                
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
                template:path.join(__dirname,'./src/index.html'),//模板html文件地址
                filename:'index.html',//打包后的文件名
                favicon: path.resolve('src/logo.png')//引入的favicon图片地址
            }),
        ]
    }

# webpack : tree shaking 、通用文件提取 、Scope-Hoisting 、AMD/CJS/ESM以及页面引用就可以使用的高兼容库


## tree shaking
### js：作用

一 、 一个模块引用了没有被使用；

二、 一个模块中可能有很多方法，但实际使用中可能没有被全部使用到

三、 代码中Dead code 死代码

四 、 以上条件并不完全适用于副作用函数

五、 以上条件不完全适用于class

**这个功能在webpack 4中， “mode = production”时，会自动开启。**

### **使用要求及原理：**

**必须使用ES6语法，不支持CJS**，这里呢就关系到另一个问题import 和 require的区别

 因为 tree shaking只能对静态的代码进行分析；import引入属于静态引入，而require属于动态引入

### require/exports 是运行时动态加载，import/export 是静态编译

CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成

### require/exports 输出的是一个值的拷贝，import/export 模块输出的是值的引用

require/exports 输出的是值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

import/export 模块输出的是值的引用。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。

### 动态导入

import(modulePath) 表达式加载模块并返回一个 promise，该 promise resolve 为一个包含其所有导出的模块对象。

我们可以在代码中的任意位置动态地使用它。例如：

```text
import('/modules/my-module.js') //动态导入
  .then((module) => {
    // Do something with the module.
});
```



**tree-shaking需要对代码进行静态分析，因为import 是静态引入，require是动态引入，代码有没有被用到，不能等到代码运行时在做判断，需要在定义后就进行判断，当判断到代码没有被用到，且没有副作用时，tree-shaking会给代码加上注释，在生成bundle前删除代码。**

**用法：**

刚才也提到了必须使用es6，由于我们项目使用了babel，而babel会默认将所有es6 import转化成cjs，所以我们要关掉这个默认功能，babel的presents 中的 modules为false关闭es6转es5

![img](https://pic4.zhimg.com/80/v2-a5ae074e461205d5ef9b94200c6f9fab_720w.jpg)

tree shaking 不会对class内的方法进行优化，对副作用也是无法处理的

## Scope-Hoisting：**将所有模块按照引用顺序放在一个函数作用域中，并适当的重命名一些变量名，防止变量名冲突，从而减少代码体积，减少闭包函数的内存开销。**

使用：**跟tree-shaking一样必须使用es6才可以使用该功能，原理和tree-shaking也一样。****在mode= 'production'webpack会默认开启**

**不适用的情况下：**

![img](https://pic1.zhimg.com/80/v2-abed70b6549e597e43bd734fd4fcfb2c_720w.jpg)

第一：代码变多了，文件体积增大直接影响加载速度
第二、内存开销变大了，因为需要缓存作用域链，会有一部分内存无法释放掉

### 主动开启

![img](https://pic1.zhimg.com/80/v2-2186952273f36e6aa27eb037e5329ab0_720w.jpg)

这里的ModuleConcatenationPlugin 就是用来处理scopeHoisting，

![img](https://pic1.zhimg.com/80/v2-0f025a6c9b069e70c53f431a979b9b4c_720w.jpg)

第一、代码简洁了，没有闭包包裹的代码了。
第二、由于转成了纯函数，没有被缓存的作用域了。

