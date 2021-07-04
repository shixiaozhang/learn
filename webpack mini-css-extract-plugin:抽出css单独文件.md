# mini-css-extract-plugin:抽出css单独文件
## 安装

cnpm i mini-css-extract-plugin  -D
cnpm i optimize-css-assets-webpack-plugin  -D

## 使用
### 1、先增加MiniCssExtractPlugin.loader,
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
### 3、再调用 OptimizeCSSAssetsPlugin  引入css
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