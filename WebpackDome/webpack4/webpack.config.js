let path=require('path')//node 自带的path模块可以获取自身所在的目录
// console.log(path.resolve(__dirname,"dist"))
//安装cnpm install html-webpack-plugin 
let htmlWebpackPlugin=require('html-webpack-plugin')
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
    mode:"development",
    //loader配置
    module:{
      //对某种格式文件转换处理,rules转换规则
      rules:[
        {
          test:/\.css$/,
          use:[//loader转换方式从下往上执行（逆序）
            //将js的样式内容插入style标签里面
            "style-loader",
            //将css转换为js
            "css-loader"
          ]
        }
      ]
    },
    //插件的配置
    plugins:[
      new htmlWebpackPlugin({
        template:'./src/index.html'
      })
    ]
}