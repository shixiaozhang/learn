# 冒烟测试 (smoke testing)

冒烟测试是指对提交测试的软件在进行详细深入的测试之前而进行的预测试，这种
预测试的主要目的是暴露导致软件需重新发布的基本功能失效等严重问题。


## 冒烟测试执行

### 构建是否成功

在示例项目里面运行构建，看看是否有报错

![img](allImg/webpack-somke.png)

   

### 额外知识：

const projectRoot=process.cwd();//获取cmd 命令行此时的目录

process.chdir(path.join(__dirname, 'template'));//在node 运行的时候进入某个文件夹环境


### 每次构建完成 build 目录是否有内容输出

* 是否有 JS、CSS 等静态资源文件 
* 是否有 HTML 文件

### 使用mocha 编写单元测试用例

// test/html-test.js
    const glob = require('glob-all')
    describe('Checking generated html files',()=>{
        it('should generate html files',(done)=>{
            // 获取html文件
            const files=glob.sync([
                './dist/index.html',
                './dist/search.html'
            ]);
            // 判断文件时候存在
            if(files.length > 0){
                done()//存在则运行 回调done 表示成功
            }else{
                throw new Error('no html files generate ')
            }
        })
    })
// test/html-test.js
    const glob = require('glob-all')
    describe('Checking generated css js files',()=>{
        it('should generate css js files',(done)=>{
            // 获取html文件
            const files=glob.sync([//用 * 代替hash的值进行匹配
                './dist/index_*.js',
                './dist/search_*.js',
                './dist/search_*.css'
            ]);
            // 判断文件时候存在
            if(files.length > 0){
                done()//存在则运行 回调done 表示成功
            }else{
                throw new Error('no css js files generate ')
            }
        })
    })

// test/index.js
   const path = require('path')
    const webpack = require('webpack')
    const rimraf = require('rimraf') //删除文件夹的库
    const Mocha=require('mocha') // 引入单元测试包
    // 初始化 mocha 参数 
    const mocha=new Mocha({
        timeout:'10000ms'//超时时间
    })

    process.chdir(path.join(__dirname, 'template'));//在node 运行的时候进入某个文件夹环境

    rimraf('./dist', () => {//删除dist文件夹
        const prodConfig = require('../../lib/webpack.prod');//引入webpack配置
        webpack(prodConfig, (err, stats) => {//调用webpack 打包
            //获取打包后的 err 和其他信息 stats
            if (err) {
                //如果错误存在，打印 错误和抛出错误吗
                console.log(err);
                process.exit(2);//这里会推出进程
            }
            console.log(stats.toString({// 如果 编译成功，打印stats的各种信息
                colors: true,
                module: false,
                children: false
            }));

            console.log('webpack build success, begin run test.');
            // 增加测试用例
            mocha.addFile(path.join(__dirname,'html-test.js'))
            mocha.addFile(path.join(__dirname,'css-js-test.js'))
            // 启动测试用例
            mocha.run()
        })
    });


## 运行：node test/smoke/index

builder-webpack % node test/smoke/index