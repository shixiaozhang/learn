# 文件指纹如何⽣生成

* Hash:和整个项⽬目的构建相关，只要项⽬目⽂文件有修改，整个项⽬目构建的 hash 值就会更更改 ---图片
* Chunkhash:和 webpack 打包的 chunk 有关，不不同的 entry 会⽣生成不不同的 chunkhash 值，无法在dev环境热更新时无法使用  ---js
* Contenthash:根据⽂文件内容来定义 hash ，⽂文件内容不不变，则 contenthash 不不变---css文件


## JS 的⽂文件指纹设置

### 设置 output 的 filename，使⽤用 [chunkhash]

module.exports = { 
    entry: {
        app: './src/app.js',
        serach:'./sec.search.js'
    }
    output: {
        filename: '[name][chunkhash:8].js',
        path: __dirname + '/dist'
    }
}



## css 的⽂文件指纹设置

### 设置 MiniCssExtractPlugin 的 filename， 使⽤用 [contenthash]

const MiniCssExtractPlugin=require('MiniCssExtractPlugin)
module.exports = { 
    entry: {
        app: './src/app.js',
        serach:'./sec.search.js'
    }
    output: {
        filename: '[name][chunkhash:8].js',
        path: __dirname + '/dist'
    },
    plugins: [
    new MiniCssExtractPlugin({
    filename: `[name][contenthash:8].css + });
    ]
}



## 图⽚片的⽂文件指纹设置

### 设置 file-loader 的 name，使⽤用 [hash]
    MiniCssExtractPlugin:抽出css单独文件
const MiniCssExtractPlugin=require('MiniCssExtractPlugin)
module.exports = { 
    entry: {
        app: './src/app.js',
        serach:'./sec.search.js'
    }
    output: {
        filename: '[name][chunkhash:8].js',
        path: __dirname + '/dist'
    },
    module: { 
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/, 
                use: [{
                    loader: 'file-loader’, 
                    options: {
                    name: 'img/[name][hash:8].[ext] '
                    }
                }] 
            }
        ]
    },
    plugins: [
    new MiniCssExtractPlugin({
    filename: `[name][contenthash:8].css + });
    ]
}

### 占位符名称   含义

[ext]       资源后缀名
[name]      文件名
[path]      文件相对路径
[folder]    文件所在文件夹
[contenthash]文件内容hash，默认是 md5 生成
[hash]      文件内容hash，默认是 md5 生成；与上边js，css的hash不同
[emoji]     一个随机指代文件内容 emoj



# ----------

# mini-css-extract-plugin:抽出css单独文件，生成文件指纹
## 安装

cnpm i mini-css-extract-plugin  -D
cnpm i optimize-css-assets-webpack-plugin cssnano  -D

## 使用
### 1、先增加MiniCssExtractPlugin.loader,与style-loader 互斥
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
### 2、再调用 MiniCssExtractPlugin 抽离出单独文件
    new MiniCssExtractPlugin({
        filename: '[name]_[contenthash:8].css'
    })
### 3、再调用 OptimizeCSSAssetsPlugin CSS 文件的压缩  

**optimize-css-assets-webpack-plugin需要依赖 cssnano*

    new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
    })

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

    module.export = {
       module: {
        rules: [
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }, 
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        })
       
    ]
}