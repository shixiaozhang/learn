<!--
 * @Author: your name
 * @Date: 2021-01-06 14:34:26
 * @LastEditTime: 2021-05-22 11:43:47
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

contentBase：这个是用来指定devServer的代理路径，一般跟output的输出路径。
port：指定代理端口

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
    
    package.json
    
    {
    "start": "webpack serve --mode development --env development --config config/webpack.dev.js",
    "build": "webpack --config config/webpack.prod.js"
    }

![img](https://pic3.zhimg.com/80/v2-744e508fb2cdcff1026883b850fdd526_720w.png)

**跨域代理**：

![img](https://pic3.zhimg.com/80/v2-681559618dada04e15542993a5033f6e_720w.jpg)


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
                 "postcss-loader",
                //将css转换为js
                "css-loader",
                "less-loader",
                
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

# webpack : tree shaking  、Scope-Hoisting 、babel配置、通用文件提取、AMD/CJS/ESM以及页面引用就可以使用的高兼容库


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

## babel

### 输入es6代码通过编译器将字符串编译成es6的AST，再将es6 AST转换成es5 AST，再将AST编译成es5代码

### AST：js的抽象语法树，所有的js都会被编译成js的语法树结构，就像html编译成虚拟dom树一样；

### 操作AST ：npm i recast -S ；recast用来操作js语法树；

### 使用babel：npm i @babel/core @babel/preset-env babel-loader -D

配置：

![img](https://pic1.zhimg.com/80/v2-a41c1fdbeda1789461703bc92e1adcec_720w.jpg)

**新建.babelrc文件**

![img](https://pic1.zhimg.com/80/v2-ddd4b15896d707412759013e29a0e1d4_720w.jpg)

这个是babel的配置文件，简单的理解一下，核心就是这两个字段，presets和plugins，都是来进行代码编译的，区别是presets是plugins的集合。

**@babel/preset-env，现在官方网站主要推荐使用这个presets来做代码转义**

### 如何指定插件适配的浏览器运行环境

我们需要指定执行环境 Browserslist， Browserslist 的配置有几种方式，并按下面的优先级使用：

> @babel/preset-env 里的 targets
> package.json 里的 browserslist 字段
> .browserslistrc 配置文件

**首要推荐第二种，package.json 里的 browserslist 字段，原因是因为可能会有别的工具会公用这个这个字段，在统一的位置配置可以做到项目里的配置统一。目前的最佳实践是，在package.json中加入如下字段**

```text
"browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
```

这个配置基本就涵盖了市面上常用的浏览器，如果你是做移动端项目还要加上，移动端是适配项目

```text
"Android >= 4.0",
"iOS >= 8"
```

其实在实际开发中我们一般会用一些UI库，这里建议呢，看一下ui库的配置，改成跟它一样即可。

## 通用文件提取：

**css处理：npm i style-loader css-loader less-loader less postcss autoprefixer -D**

less：是个预编译拓展了css的功能，很多前端童鞋只是用了他的嵌套的写法。他的功能还是很强大的，这里不多说（推荐看element-plus源码学习各种高级用法，也许之后我会安排时间去写），即便只用了嵌套，也能享受它带来的简便了。

postcss：用来做CSS样式代码转换，配合其他插件来进行代码转换

autoprefixer：根据配置好的兼容，来给css添加前缀

![img](https://pic4.zhimg.com/80/v2-985c8dd5f0d9189acc89ab6592bb80bf_720w.jpg)

**新建postcss.config.js**：不配置这个js postcss不生效；



![img](https://pic1.zhimg.com/80/v2-d65fdbf93dfce21a1216a85e08786ea8_720w.jpg)

**二、优化--样式文件抽离、tree-shaking-css、压缩**

**样式文件抽离 mini-css-extract-plugin**

![img](https://pic4.zhimg.com/80/v2-b5c5cf7d4dc6cace380e804773f05a57_720w.jpg)

1、安装并引入插件

2、这里要注意，我们是要压缩css 所以style-loader就不需要了，这里要替换style-loader。

3、配置插件，按理来说需要配置hash的，但hash的相关内容我准备在之后统一讲，这里就暂时先这样。

**CSS压缩：optimize-css-assets-webpack-plugin**

```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')//安装引入
 new OptimizeCssAssetsWebpackPlugin(), //在plugins中配置插件
```

optimize-css-assets-webpack-plugin 还是有些配置项的可以指定样式的解析去，不过我们一般是用来压缩css 它默认的使用的就是cssnano来作为默认值

**tree-shaking-css:PurifyCSS**：这个会把我们的为使用的动态class删除；

一、一般情况下我们写样式很少会写不会用到的样式
二、非常影响构建速度
三、由于它是静态分析，一些动态的样式很有可能被一起擦除（用JS控制dom元素使用不用的class）

## 通用文件提取

**一、hash的种类、生成原理和作用**

> 1、Hash：和整个项目相关，只要有文件修改，整个hash值就会发生变化。
> 2、Chunkhash：和chunk有关，是文件打包成chunk时的hash，一般用于JS
> 3、Contenthash: 和文件内容有关的hash，一般用于CSS

## hash

### hash是跟整个项目相关的。无论你改任何文件都会修改打包后的Hash从而达到清除缓存的目的，但是也利用不上缓存给项目带来的性能提升了

![img](https://pic3.zhimg.com/80/v2-6476ec829388b94ea40f04b992161486_720w.jpg)

![img](https://pic2.zhimg.com/80/v2-28810223aaff5339e2bf791802fcc49d_720w.jpg)



## Chunkhash

### js 和css的hash是相同的，这是因为webpack处理样式的时候采用的是cssInJs的方式处理，当我们修改了js虽然没有修改css，整个chunk被修改了，css的hash也就跟着会被修改。这点对缓存也是不友好。

![img](https://pic3.zhimg.com/80/v2-864e1f50dfac15aa15c0d2c4f2d0ddba_720w.jpg)

## **Contenthash**

### JS 和css采用了不同的hash策略，js 由于有内容修改，chunk一定会发生改变，而css只会在他内容发生改变时才会修改hash值，不在受到js的影响了。

### 总结一下：JS采用Chunkhash而css应该采用Contenthash，来给文件增加指纹，最大限度的利用浏览器缓存策略。

![img](https://pic1.zhimg.com/80/v2-6070fdbd24d5a883c569235938882504_720w.jpg)

![img](https://pic1.zhimg.com/80/v2-3572caf38977eaea664f547301aac9e4_720w.jpg)

## **hash的优化**

**hash的值有些长，一般情况下取前8位就可以**

![img](https://pic4.zhimg.com/80/v2-82145ad89ab76c2c30d60dbd1a7741df_720w.jpg)

**公共文件抽离**

**html-webpack-externals-plugin**

```js
//安装和引用
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
//plugins中加入
new HtmlWebpackExternalsPlugin(
      {
        externals: [
          {
            module: 'axios',
            entry: 'https://cdn.bootcdn.net/ajax/libs/axios/0.11.0/axios.min.js',
            global: 'axios',
          },
        ],
      }
    ),
```

但是这个插件在多页的时候有个BUG，我还在处理，由于多页产生了多个htmlwebpackplugin会导致JS被重复引入。这个还在调研，不过可以用下面的方案完全替代



**splitchunksplugin****：这个无需安装，webpack4自带**

有些可能没有cdn或者没必要弄成公共库，发布到CDN上，如何处理呢，就是问题2那种情况

![img](https://pic1.zhimg.com/80/v2-ff3768b067c1faec02d3120627cb2588_720w.jpg)

**build结果**

![img](https://pic3.zhimg.com/80/v2-c9bb077458cd8b109622395b3911ebde_720w.jpg)

**dist多了一个common 的文件，其实将axios和utils里的几个通用代码都抽离成独立的JS了。**

**这个插件是webpack自带的，默认情况下就开启了，当然还可以做一些更细致的拆分，比如基础库的拆分，通用业务逻辑的拆分，可以通过test的匹配来进行进一步的拆分，有需要的童鞋请移步webpack官方文档。**

## **eslint** 

 **安装：npm i eslint  eslint-loader  -D**

![img](https://pic2.zhimg.com/80/v2-e2db3035fbcc30881251b9f7c5fc8125_720w.jpg)

**新建文件**：

**.eslintignore**：排除文件配置，有些没有必要参与格式化的在这里排除。

![img](https://pic1.zhimg.com/80/v2-a4edb4d284253d2c24eb9831ab5b3bbc_720w.jpg)

**.eslintrc.js 这个是eslint的配置文件**

![img](https://pic4.zhimg.com/80/v2-51a68af6731f0cc3c09df4b67d660c3f_720w.jpg)

比较核心的就是这6个字段

> parser：解析器，eslint有默认的解析器，默认只支持es5，也可以配置其他的解析器
> parserOptions：解析器的一些设置，比如我需要支持es6的相关语法就需要如上的配置
> plugins:解析器插件，主要是对解析器的拓展。
> env：环境配置，主要针对一些环境变量，比如浏览器环境的window，node环境的glob等可以不定义就使用。
> extends:继承一些  默认的eslint配置，这里使用的是recommended,还有像airbnb和ivweb这些比较库，个人建议，如果你的团队小于10人可以考虑ivweb 、10人以上可以考虑recommended自己在根据公司的风格拓展，airbnb个人认为没多大必要。
> rules：对规则的一些微调

## AMD/CJS/ESM以及页面引用就可以使用的高兼容库

修改输出配置：

![img](https://pic3.zhimg.com/80/v2-dcb9e5541ff6dcbdc5b71b3725213106_720w.jpg)

执行build后我们先看一下，webpack是如何实现的

![img](https://pic3.zhimg.com/80/v2-8a6a24db19996ff0a3480ac200a8b59e_720w.jpg)

## 压缩版和非压缩版的build

首先修改webpack.config.js

![img](https://pic1.zhimg.com/80/v2-3b0ee149c158507de5b9ffa57de98240_720w.jpg)

1、由于要区分压缩，我们需要自己来处理压缩，这里使用terser 为什么要用这个呢，原因很简单，我们看看webpack的package.json。

![img](https://pic4.zhimg.com/80/v2-beaefdf0fe29efee05743ae80ba7bed3_720w.jpg)

因为webpack4用的就是这个，这里不要直接用install安装把这个复制出来，在install，直接安装会装最新版，最新版是需要webpack5支持的。

2、因为要输出两个页面嘛，所以entry要配置两个，output的时候使用[name]来获取entry的key值作为文件名。

3、配置一下 TerserPlugin 这里用正则匹配一下.min 这样就做到了区分压缩啦，我们build一下。

Build结果

![img](https://pic3.zhimg.com/80/v2-2d52c9239ce8d60b214f0edf440b11da_720w.jpg)

完美，这样一个库的基本就实现了。