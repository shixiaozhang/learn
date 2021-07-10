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