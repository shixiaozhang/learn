# HTML 和 JS 内联

* raw-loader@^0.5.1版本 内联 html；---引入meta信息
## 先安装：npm  i raw-loader@0.5.1 -D
## 之后就可以在html中使用下面的语法引入 html 和 js
<script>${require(' raw-loader!babel-loader!. /meta.html')}</script>

* raw-loader 内联 JS
<script>${require('raw-loader!babel-loader!../node_modules/lib-flexible')}</script>

raw-loader!babel-loader：调用raw-loader读取文件 然后在调用babel-loader转换es6及其他js代码

# CSS 内联

* ⽅案⼀:借助 style-loader

module.exports = { 
    module: {
        rules: [
                {
                    test: /\.scss$/, 
                    use: [
                            {
                                loader: 'style-loader', 
                                    options: {
                                        insertAt: 'top', // 样式插入到 <head>
                                        singleton: true, //将所有的style标签合并成一个  
                                    }
                            }, 
                            "css-loader", 
                            "less-loader"
                    ], 
                },
            ] 
    },
};
* 方案⼆: html-inline-css-webpack-plugin（广泛使用）：将打包好的 css 代码内连到html头部
  
安装：
npm i html-inline-css-webpack-plugin -D

配置：
onst MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
 
module.exports = {
  
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin(),
    new HTMLInlineCSSWebpackPlugin(),
  ],
}

参数：
interface Config {
  filter?(fileName: string): boolean
  replace?: {
    target: string
    position?: 'before' | 'after'
    removeTarget?: boolean
    leaveCssFile?: boolean
  }
}



## 地址：https://www.npmjs.com/package/html-inline-css-webpack-plugin-wilddog




# 图片、字体内联

图片和字体的内联可以借助 url-loader，通过修改 webpack 配置让小于 10k 的图片或者字体文件在构建阶段自动 base64。