let path=require('path')//node 自带的path模块可以获取自身所在的目录
console.log(path.resolve(__dirname,"dist"))
module.exports={
    //入口文件
    entry:"./src/index.js",
    output:{
        //s输出的文件名
        filename:"bundle.js",
        //输出的路径
      path:path.resolve(__dirname,"dist")
    },
    //设置模式 production
    mode:"development"
}