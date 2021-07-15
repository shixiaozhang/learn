# plugin

## 插件的运行环境

插件没有像 loader （使用loader-runner） 那样的独立运行环境，只能在 webpack 里面运行

### 搭建插件的运行环境



    const path = require("path");
    const DemoPlugin = require("./plugins/demo-plugin.js");
    const PATHS = {
        lib: path.join(__dirname, "app", "shake.js"), 
        build: path.join(__dirname, "build"),
    };

    module.exports = { 
        entry: {
            lib: PATHS.lib, 
        },
        output: {
            path: PATHS.build, 
            filename: "[name].js",
        },
        plugins: [new DemoPlugin()], 
    };





## 插件的基本结构

### 基本结构:

class MyPlugin {  //插件名称
    apply(compiler) { //插件上的 apply 方法
        compiler.hooks.done.tap(' My Plugi·n', ( //插件的 hooks

        stats/*statsispassedasargumen··twhendonehookistapped. */

        ) => {

        console.log('Hello World!'); //插件的处理逻辑

        })
    } 
}; 

module.exports = MyPlugin;

### 插件的使用：

    plugins:[
        new MyPlugin()
    ]

### 开发一个简单插件

//src/demo-plugin.js
module.exports = class DemoPlugin { 
    constructor(options) {
        this.options = options;//获取传递的参数
    } 
    apply() {
        console.log("apply", this.options);
    } 
};

//加入到 webpack 配置中

    module.exports = { 
        plugins: [
            new DemoPlugin({ name: "demo" })
        ] 
    };


### 插件的错误处理


* 参数校验阶段可以直接 throw 的方式抛出

    throw new Error(“ Error Message”)

* 通过 compilation 对象的 warnings 和 errors 接收

    compilation.warnings.push("warning"); 
    compilation.errors.push("error");


### 通过 Compilation 进行文件写入


* Compilation 上的 assets 可以用于文件写入
   
    - 可以将 zip 资源包设置到 compilation.assets 对象上

* 文件写入需要使用 webpack-sources (https://www.npmjs.com/package/webpack-sources)
  
    const { RawSource } = require("webpack-sources"); 

    module.exports = class DemoPlugin {
        constructor(options) {
            this.options = options;
        } 
        apply(compiler) {
            const { name } = this.options; 
            compiler.hooks.emit.tapAsync('ZipPlugin',(compilation,callback)=>{
                compilation.assets[name] = new RawSource("demo");
                callback() 
            })
        } 
    }

### 插件扩展:编写插件的插件

插件自身也可以通过暴露 hooks 的方式进行自身扩展，以 html-webpack-plugin 为例:

* html-webpack-plugin-alter-chunks (Sync) 
* html-webpack-plugin-before-html-generation (Async) 
* html-webpack-plugin-alter-asset-tags (Async) 
* html-webpack-plugin-after-html-processing (Async) 
* html-webpack-plugin-after-emit (Async)


### 编写一个压缩构建资源为zip包的插件

#### 要求:

* 生成的 zip 包文件名称可以通过插件传入
* 需要使用 compiler 对象上的特地 hooks 进行资源的生成

####  准备知识:Node.js 里面将文件压缩为 zip 包


使用 jszip (https://www.npmjs.com/package/jszip)

* jszip 使用示例


    var zip = new JSZip();

    zip.file("Hello.txt", "Hello World\n");//添加文件

    var img = zip.folder("images");//添加文件夹
    img.file("smile.gif", imgData, {base64: true});//文件夹添加文件

    zip.generateAsync({type:"blob"}).then(function(content) {
        // see FileSaver.js
        saveAs(content, "example.zip");//进行文件输出
    });

#### 复习:Compiler 上负责文件生成的 hooks

* Hooks 是 emit，是一个异步的 hook (AsyncSeriesHook) 
* emit 生成文件阶段，读取的是 compilation.assets 对象的值
* 可以将 zip 资源包设置到 compilation.assets 对象上