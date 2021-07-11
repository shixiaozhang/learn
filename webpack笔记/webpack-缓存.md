# 缓存
## 目的:
提升二次构建速度
## 缓存思路:
* babel-loader 开启缓存(不好用)

                loader:'babel-loader',
                    options: {
                        //开启 babel-loader的缓存
                        cacheDirectory: true
                    }

  缺点：babel-loader在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积大冗余，同时也会减慢编译效率

* terser-webpack-plugin 开启缓存 (好用)
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

* 使用 cache-loader 或者 hard-source-webpack-plugin 用于 模块缓存;(好用)

    const HardSourceWebpackPlugin=require('hard-source-webpack-plugin') 
        //? 开启模块缓存
        plugins:[
            new HardSourceWebpackPlugin(),    

        ]
