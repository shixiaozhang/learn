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
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')  // ? 优化日志输出
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')//打包速度分析

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');//打包体积分析

const TerserPlugin=require('terser-webpack-plugin'); //并行压缩
const { DllReferencePlugin } = require('webpack'); //DLL 打包引入

const HardSourceWebpackPlugin=require('hard-source-webpack-plugin') //开启模块缓存

const smp = new SpeedMeasurePlugin()//初始化插件


const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"))
    // console.log(entryFiles);
    // [
    //     '/Users/Z/project/learn/webpack视频课相关/示例代码/code/chapter02-main/my-project/src/index/index.js',
    //     '/Users/Z/project/learn/webpack视频课相关/示例代码/code/chapter02-main/my-project/src/search/index.js'
    //   ] 
    entryFiles.forEach(entryFile => {
        // 获取文件夹name
        const match = entryFile.match(/src\/(.*)\/index\.js$/)
        const pageName = match && match[1]
        // console.log(pageName);
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
    // console.log(entry);
    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins } = setMPA()

const config = {
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
    resolve:{
        alias:{//简短缩写，模块路径缩写；
         'react':path.resolve(__dirname,'./node_modules/react/umd/react.production.min.js'),
         'react-dom':path.resolve(__dirname,'./node_modules/react-dom/umd/react-dom.production.min.js'),
        },
        modules:[path.resolve(__dirname,'node_modules')],//限制搜索node_modules 文件的范围
        extensions:['.js'],//模块后缀优先搜索类型
        mainFields:['main']//寻找入口文件的时候，寻找package.json中的main字段
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude:path.resolve('node_modules'),//剔除依赖目录
                include:path.resolve('src'),
                use: [{
                    //? 开启多进程打包
                    loader: 'thread-loader',
                    options: {
                        workers: 3,//?开启三个进程
                    }
                },
                {
                    loader:'babel-loader',
                    // options: {
                    //     //开启 babel-loader的缓存
                    //     cacheDirectory: true
                    // }
                },
                    // 'eslint-loader'
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
                test: /.(gif|png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: [0.65, 0.90],
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                // the webp option will enable WEBP
                                webp: {
                                    quality: 75
                                }
                            }
                    },
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

        // ? 打包体积分析
        // new BundleAnalyzerPlugin(),

        // //? 抛出错误代码
        function () {
            // 构建完成会自动触发done 这个hook；
            // webpack 4 ：this.hooks.done.tap(...)
            // webpack 3 ：this.plugin(...)
            this.hooks.done.tap('done', //监听 done hook‘
                (stats) => {
                    //通过 stats.compilation.errors 获取错误对象；
                    if (stats.compilation.errors &&
                        stats.compilation.errors.length &&
                        process.argv.indexOf('- -watch') == -1) {
                        //打印错误
                        console.log('build error');
                        // 抛出错误状态码
                        process.exit(1);
                    }
                })
        },
        //? DllPluginreact之类的基础包 引入： 
        //引入基础包 
        new webpack.DllReferencePlugin({
            manifest:require('./build/library/library.json')
        }),
          //引入业务包包 
        new webpack.DllReferencePlugin({
            manifest:require('./build/library/library_dom.json')
        }),


        //? 开启模块缓存
        new HardSourceWebpackPlugin(),    

        //?分离react之类的基础包 的方式之一：  
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'react',
        //             entry: 'https://unpkg.com/react@17/umd/react.production.min.js',//可以是本地文件，也可以是cdn
        //             global: 'React'
        //         },
        //         {
        //             module: 'react-dom',
        //             entry: 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',//可以是本地文件，也可以是cdn
        //             global: 'ReactDOM'
        //         },
        //     ],
        // }),
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
    //? 开启并行压缩
    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: 4, //并行数量，值为： number ｜true ｜false
            cache:true //开启缓存
          }),
        ],
      },
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
    // ? 详细参数案例：
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

    // stats: "errors-only",//日志输出的类型
};

module.exports = smp.wrap(config)//包裹配置，进行速度分析