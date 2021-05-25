/*
 * @Author: your name
 * @Date: 2021-04-21 16:24:29
 * @LastEditTime: 2021-05-17 14:47:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpackAll\webpack.config.js
 */
const path=require('path')
module.exports={
    mode:'none',
    entry:path.join(__dirname,'./src/index.js'),
    output:{
    filename:'index.js',
    path:path.join(__dirname,'./dist')
    },
    module: {
        //对某种格式文件转换处理,rules转换规则
        rules: [
        {
             //test:表示loader匹配的test正则，默认为css，这里可以是（less、sass、stylus）。
            //include:表示所要打包的文件夹。
            //exclude：表示要跳过打包的文件夹。
            //use：外部导入的loader。
            // 同一后缀文件使用多个 loader 时，loader 有执行顺序，从右向左依次执行
            // style-loader 提取css-loader打包后的css代码，并自动生成标签，然后插入 html 中
            // css-loader只是把 css 代码打包进 js 文件而已，并不做任何操作
            // less-loader 只是把 less 语法编译为 css 语法，然后 css-loader 把编译好的 css 内容插入 js 文件中，最后 style-loader 把 css 添加到标签并动态插入到 html 文件标签中
            // postcss-loader使用顺序，放在能够拿到 css 内容的地方就可以，拿到 css 内容，通过一些 js 插件处理 css 达到增强 css 的效果
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
}