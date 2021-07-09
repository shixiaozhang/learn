'use strict';
const glob = require('glob')
const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')//基础库分离
const FriendlyErrorsWebpackPlugin=require('friendly-errors-webpack-plugin')
const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"))
    console.log(entryFiles);
    // [
    //     '/Users/Z/project/learn/webpack视频课相关/示例代码/code/chapter02-main/my-project/src/index/index.js',
    //     '/Users/Z/project/learn/webpack视频课相关/示例代码/code/chapter02-main/my-project/src/search/index.js'
    //   ] 
    entryFiles.forEach(entryFile => {
        // 获取文件夹name
        const match = entryFile.match(/src\/(.*)\/index\.js$/)
        const pageName = match && match[1]
        console.log(pageName);
        entry[pageName] = entryFile
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                // chunks: [pageName,'vendors'], 
                chunks: [pageName, 'vendors'],//添加 vendors，用来引入 我们分离出来的 公共包
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            }),
        )

    })
    console.log(entry);
    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
    // entry: {
    //     index: './src/index/index.js',
    //     search: './src/search/index.js'
    // },
    // 自动引入多个入口的 js
    entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    // mode: 'none',
    module: {
        rules: [
            {
                test: /.js$/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,//? 1rem = 75px
                            remPrecesion: 8,//? 转换的时候rem 小数点位数
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        //手动开启 Scope-Hoisting，优惠打包，减少闭包，优化内存；
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CleanWebpackPlugin(),
        //? 分包css
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        //? 压缩css
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        // ? 优化日志输出
        new FriendlyErrorsWebpackPlugin(),

        // //? 抛出错误代码
        function() {
            // 构建完成会自动触发done 这个hook；
            // webpack 4 ：this.hooks.done.tap(...)
            // webpack 3 ：this.plugin(...)
            this.hooks.done.tap('done', //监听 done hook‘
                (stats) => { 
                    //通过 stats.compilation.errors 获取错误对象；
                    if (stats.compilation.errors &&
                    stats.compilation.errors.length && 
                    process.argv.indexOf('- -watch') == -1){
                        //打印错误
                        console.log('build error');
                        // 抛出错误状态码
                        process.exit(1); 
                    }
                }) 
        }, 


        //?分离react之类的基础包 的方式之一：  
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //       {
        //         module: 'react',
        //         entry: 'https://unpkg.com/react@17/umd/react.production.min.js',//可以是本地文件，也可以是cdn
        //         global: 'React'
        //       },
        //       {
        //         module: 'react-dom',
        //         entry: 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',//可以是本地文件，也可以是cdn
        //         global: 'ReactDOM'
        //     },
        //     ],
        //   }),
        // 自动引入多个入口的模版html
        ...htmlWebpackPlugins,
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, 'src/index/index.html'),
        //     filename: 'index.html',
        //     chunks: ['index'],
        //     inject: true,
        //     minify: {
        //         html5: true,
        //         collapseWhitespace: true,
        //         preserveLineBreaks: false,
        //         minifyCSS: true,
        //         minifyJS: true,
        //         removeComments: false
        //     }
        // }),
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, 'src/search/index.html'),
        //     filename: 'search.html',
        //     chunks: ['search'],
        //     inject: true,
        //     minify: {
        //         html5: true,
        //         collapseWhitespace: true,
        //         preserveLineBreaks: false,
        //         minifyCSS: true,
        //         minifyJS: true,
        //         removeComments: false
        //     }
        // }),

        //? 这个是把css 注入到html style中，一般不用
        // new HTMLInlineCSSWebpackPlugin(),
    ],
    //? optimization.splitChunks 实现提取react和react-dom
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /(react|react-dom)/,
    //                 name: 'vendors',
    //                 chunks: 'all',
    //             },

    //         },
    //     },
    // },
    // //? 分离页面的公共js文件：
    // optimization: {
    //     splitChunks: {
    //         minSize:0,//引入文件的大小
    //         cacheGroups: {
    //             commons: {
    //                 name: 'commons',
    //                 chunks: 'all',
    //                 minChunks: 3,//最少引用的次数
    //             },

    //         },
    //     },
    // },
    // optimization: {
    //     splitChunks: {
    //       chunks: 'async',
    //       minSize: 20000,
    //       minRemainingSize: 0,
    //       minChunks: 1,
    //       maxAsyncRequests: 30,
    //       maxInitialRequests: 30,
    //       enforceSizeThreshold: 50000,
    //       cacheGroups: {
    //         defaultVendors: {
    //           test: /[\\/]node_modules[\\/]/,
    //           priority: -10,
    //           reuseExistingChunk: true,
    //         },
    //         default: {
    //           minChunks: 2,
    //           priority: -20,
    //           reuseExistingChunk: true,
    //         },
    //       },
    //     },
    //   },

    stats:"errors-only",//日志输出的类型
};
