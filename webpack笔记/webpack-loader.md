# loader

定义:loader 只是一个导出为函数的 JavaScript 模块

    module.exports = function(source) { 
        return source; 
    };

## loader执行顺序：

多个 Loader 串行执行 顺序从后到前


## 为什么是从后到前执行的呢？

### 函数组合一般有两种情况：

* Unix 中的 pipline ：从左往右


* Compose(webpack采取的是这种) ：从右往左

compose = (f, g) => (...args) => f(g(...args));


# 开发loader：

## 辅助工具loader-runner：

## loader-runner 介绍：

### 定义:

loader-runner 允许你在不安装 webpack 的情 况下运行 loaders
### 作用:

·作为 webpack 的依赖，webpack 中使用它执行 loader 
·进行 loader 的开发和调试


## loader 的单独运行：使用 loader-runner 

    import { runLoaders } from "loader-runner";

    runLoaders({

        resource: “/abs/path/to/file.txt?query”, 
        // String: 资源的绝对路径(可以增加查询字符串)

        loaders: [“/abs/path/to/loader.js?query”],
        // String[]: 加载器的绝对路径（可选地包括查询字符串）
	    // {loader, options}[]: 加载器的绝对路径，带有选项对象

       
        context: { minimize: true }, 
        // 基础上下文之外的额外 loader 上下文

        readResource: fs.readFile.bind(fs),
       // 可选：读取资源的函数
        // 仅在未提供 'processResource' 时使用
        // 必须有签名 function(path, function(err, buffer))
        // 默认使用 fs.readFile 

        processResource : ( loaderContext ,  resourcePath ,  callback )  =>  { ... } , 
        // 可选：处理资源的函数 
        // 必须有签名 function(context, path, function(err, buffer)) 
        // 默认为 readResource被使用并且资源被添加一个 fileDependency 

    }, function(err, result) {

        // err: Error?
        // result.result: Buffer | String

    }) 

### 开发一个 raw-loader :将一个文件内容提取为string


    //src/raw-loader.js:
    module.exports = function(source) { 
        const json = JSON.stringify(source)
                .replace(/\u2028/g, ‘\\u2028 ' ) // 为了安全起见, ES6模板字符串的问题
                .replace(/\u2029/g, '\\u2029');

                return `export default ${json}`; 
    };

    //src/demo.txt
    foobar


### 使用 loader-runner 调试 loader


    //run-loader.js:
    const fs = require("fs");
    const path = require("path");
    const { runLoaders } = require("loader-runner"); 
    runLoaders({ 
        resource: "./demo.txt",
        loaders: [path.resolve(__dirname, "./loaders/raw-loader")],
        readResource: fs.readFile.bind(fs),
    },(err, result) => {
        err ? console.error(err) : console.log(result)
    });

    //运行查看结果:

    node run-loader.js

## loader 的参数获取：通过 loader-utils 的 getOptions 方法获取


    const loaderUtils = require("loader-utils");
    module.exports = function(content) {
        const { name } = loaderUtils.getOptions(this);
    };
## loader 的异常处理：

### 同步的loader：1、loader内直接通过 throw 抛出 2、通过this.callback 传递错误

    this.callback(//callback是loader上下文的一个回调函数
        err: Error | null,
        content: string | Buffer, 
        sourceMap?: SourceMap,
        meta?: any
    );

* 一般情况下，我们通过this.callback 返回我们的loader后的数据，而不是直接return
  
        // return `export default ${json}`//返回结果  1
        this.callback(null, json)//返回结果 2 ---常用

        // throw new Error('Error')//抛出异常的方式 1
        // this.callback(new Error('Error'),json)//抛出异常的方式 2---常用
* 回传多个值：
        this.callback(null, json，1，2，3，4)//返回结果 2 ---常用 值：[json,1,2,3,4]

## 异步的loader：

### 通过 this.async 来返回一个异步函数

* 第一个参数是 Error，第二个参数是处理的结果


示意代码:

    module.exports = function(input) {
        const callback = this.async();

        // No callback -> return synchronous results 
        // if (callback) { ... }
        
        callback(null, input + input); 
    };

## 在 loader 中使用缓存:

### webpack 中默认开启 loader 缓存 

* 可以使用 this.cacheable(false) 关掉缓存
### 缓存条件: loader 的结果在相同的输入下有确定的输出 

* 有依赖的 loader 无法使用缓存
  
## loader 如何进行文件输出：

### 通过 this.emitFile 进行文件写入

    const loaderUtils = require("loader-utils");
    module.exports = function(content) {

        const url = loaderUtils.interpolateName(this, "[hash].[ext]", {
            content, 
        });

        this.emitFile(url, content);//输出内容到指定位置
        //__webpack_public_path__ 全局的output的值
        const path = `__webpack_public_path__ + ${JSON.stringify(url)};`;

        return `export default ${path}`; 
    };


## 实战开发一个自动合成雪碧图的 loader

支持的语法:
background: url('a.png?__sprite');
background: url('b.png?__sprite');
--合成-->
background: url('sprite.png');

### 如何将两张图片合成一张图片?

使用： spritesmith (https://www.npmjs.com/package/spritesmith) spritesmith 
使用示例：

    const sprites = ['./images/1.jpg', './images/2.jpg'];
    Spritesmith.run({src: sprites}, function handleResult (err, result) { 
        result.image;
        result.coordinates;
        result.properties;
    });