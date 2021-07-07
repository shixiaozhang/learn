# webpack 打包库和组件
webpack 除了可以⽤用来打包应用，也可以用来打包 js 库
* 实现⼀个⼤整数加法库的打包
· 需要打包压缩版和⾮压缩版本
 ·⽀持 AMD/CJS/ESM 模块引⼊入

* 打包输出的库名称:
  
·未压缩版 large-number.js 
·压缩版 large-number.min.js //通过terser-webpack-plugin进行压缩可以压缩es6 语法；webpack4 默认压缩插件，uglifyjs压缩 遇到es6 会报错；uglifyjs3.0支持


    const path = require('path')
    const TerserPlugin = require('terser-webpack-plugin')
    module.exports = {
    //入口文件
    entry: {//两个版本的库名
        "swapPairs-build": path.resolve(__dirname, './src/index.js'),
        "swapPairs-build.min": path.resolve(__dirname, './src/index.js'),

    },
    output: {
        publicPath: './',
        //输出的文件名
        filename: "[name].js",
        //输出的路径
        path: path.resolve(__dirname, "dist"),
        // 打包关健
        library: 'swapPairs',//库的全局名称
        //如果不设置libraryExport ，我们引入组件使用需要这样；swapPairs.default
        libraryExport: 'default',//优化使用体验
        libraryTarget: 'umd'//指定库的引入方式,umd:通用支持设置
    },
    optimization: {//匹配要压缩的文件名称，自定义压缩
        minimize: true,
        minimizer: [
        new TerserPlugin({
            include: /\.min\.js$/
        })
        ]
    },
    mode: "none",//把所有的压缩去掉
    
    }
##  library: 'swapPairs',//库的全局名称

##  libraryExport: 'default',//优化使用体验

//如果不设置libraryExport ，我们引入组件使用需要这样；swapPairs.default

支持以下配置：
  
* libraryExport: 'default'-入口点的默认导出将分配给库目标：

    // if your entry has a default export of `MyDefaultModule`
    var MyDefaultModule = _entry_return_.default;

* libraryExport: 'MyModule'-指定的模块将被分配给库目标：

    var MyModule = _entry_return_.MyModule;

* libraryExport: ['MyModule', 'MySubModule']- 该数组被解释为要分配给库目标的模块的路径：

    var MySubModule = _entry_return_.MyModule.MySubModule;

* 使用libraryExport上面指定的配置，生成的库可以这样使用：

    MyDefaultModule.doSomething();
    MyModule.doSomething();
    MySubModule.doSomething();

##  libraryTarget: 'umd'//指定库的引入方式,umd:通用支持设置

其他参数包括：

* var：（默认值）当库加载完成，入口起点的返回值将分配给一个变量：

    var MyLibrary = _entry_return_;

    // 在一个单独的 script……
    MyLibrary.doSomething();

* assign : 这将产生一个隐含的变量，可能会潜在地存在于整个中已的值（谨慎使用）。

    MyLibrary = _entry_return_;

注意，如果MyLibrary在作用域中未在前面代码进行定义，则您的库将被设置在所有作用域内。

* commonjs：-入口起点的返回值将使用output.library中定义的值，分配给出口对象。名称也意味着，模块用于 CommonJS 环境：

    exports['MyLibrary'] = _entry_return_;

    require('MyLibrary').doSomething();

* commonjs2： 'commonjs2'-入口起点的返回值将分配给module.exports对象。这个名称也意味着用于 CommonJS 环境：

    module.exports = _entry_return_;

    require('MyLibrary').doSomething();

* amd： 将你的库公开为 AMD 模块。

    module.exports = {
    //...
        output: {
            library: 'MyLibrary',
            libraryTarget: 'amd'
        }
    };

生成的输出将使用“MyLibrary”作为模块名定义，即

    define('MyLibrary', [], function() {
    return _entry_return_;
    });
可以在脚本标签中，将 bundle 作为一个模块整体引入，并且可以像这样调用 bundle：

    require(['MyLibrary'], function(MyLibrary) {
    // 使用 library 做一些事……
    });

如果output.library未定义，将生成以下内容。

    define([], function() {
    return _entry_return_; // 此模块返回值，是入口 chunk 返回的值
    });

* global：入口起点的返回值将使用output.library中定义的值，分配给global对象的这个属性下。

    global['MyLibrary'] = _entry_return_;

    global.MyLibrary.doSomething();

* window ：入口起点的返回值将使用output.library中定义的值，分配给window对象的这个属性下。

    window['MyLibrary'] = _entry_return_;

    window.MyLibrary.doSomething();

* this ：入口起点的返回值将分配给这个的一个属性（这个由output.library定义）下，this的含义名称你：

    this['MyLibrary'] = _entry_return_;

    // 在一个单独的 script……

    this.MyLibrary.doSomething();

    MyLibrary.doSomething(); // 如果 this 是 window

# 设置⼊口⽂件

package.json 的 main 字段为 index.js
//index.js

    if (process.env.NODE_ENV === "production") {
         module.exports = require("./dist/large-number.min.js");
    } else {
        module.exports = require("./dist/large-number.js"); 
    }

# 发布到npm 上：

