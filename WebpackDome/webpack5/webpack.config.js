/*
 * @Author: your name
 * @Date: 2021-01-06 18:43:00
 * @LastEditTime: 2021-01-06 21:21:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpack5\webpack.config.js
 */
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
        },
        {
          //匹配图片、
          test:/\.(jpg|png|gif)$/, 
          loader:'url-loader',
          //图片限制：小于8k，base64处理减少请求数量，但是会使体积更大
          options:{
            limit:8*1024,
            //关闭url-loader的es6的模块化解析，会与html-loader冲突
            esModule:false,
            //[hash:10]去图片hash的前十位
            //[ext]扩展名..
            name:'[hash:10].[ext]'
          }
        },
        {//处理htmlloader
          test:/\.html$/,
          loader:'html-loader'
        }
      ]
    },
    //插件的配置
    plugins:[
      new htmlWebpackPlugin({
        template:'./src/index.html'
      })
    ],
    //热更新过cnpm install webpack-dev-server -g
    //启动 webpack-dev-server
    devServer:{
      // 告诉服务器内容的来源。仅在需要提供静态文件时才进行配置。
      // devServer.publicPath 将用于确定 bundle 的来源，并具有优先级高于 contentBase。
      contentBase:path.resolve(__dirname,"dist"),
      //启动编码压缩
      compress:true,
      prot:6000,//端口号
      //自动打开浏览器
      open:true
    }
}