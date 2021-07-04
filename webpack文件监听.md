# webpack 中的⽂文件监听 

## ⽂文件监听是在发现源码发⽣生变化时，⾃自动重新构建出新的输出⽂文件。

### webpack 开启监听模式，有两种⽅方式: 

* 启动 webpack 命令时，带上 --watch 参数 **唯⼀一缺陷:每次需要⼿手动刷新浏览器器**
  
* 在配置 webpack.config.js 中设置 watch: true



# ⽂文件监听的原理理分析

## 轮询判断⽂文件的最后编辑时间是否变化 某个⽂文件发⽣生了了变化，并不不会⽴立刻告诉监听者，⽽而是先缓存起来，等 aggregateTimeout

    module.export = {
        //默认 false，也就是不不开启
        watch: true, //只有开启监听模式时，watchOptions才有意义
        wathcOptions: {
            //默认为空，不监听的文件或者文件夹，支持正则匹配
            ignored: /node_modules/,
            //监听到变化发生后会等300ms再去执行，默认300ms
            aggregateTimeout: 300, 
            //判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次 
            poll: 1000
        }    
    }

# 热更新
## 1、webpack-dev-server

WDS 不不刷新浏览器器
WDS 不不输出⽂文件，⽽而是放在内存中
使⽤用 HotModuleReplacementPlugin插件

## HotModuleReplacementPlugin 是webpack自带的plugin ；

{
    Plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
 devServer: {
        contentBase: './dist',
        hot: true
    }
}


## 2、使用 webpack-dev-middleware 

* WDM 将 webpack 输出的⽂文件传输给服务器器
* 适⽤用于灵活的定制场景

    const express = require('express');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev- middleware');
    const app = express();
    const config = require('./webpack.config.js'); const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath
    }));
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!\n');
    });