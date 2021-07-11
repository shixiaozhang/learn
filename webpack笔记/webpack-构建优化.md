# 缩小构建目标


##  目的:

* 尽可能的少构建模块

* 比如 babel-loader 不解析 node_modules

    rules: [
            {
                test: /.js$/,
                exclude:'node_modules',//剔除依赖目录
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
            }
        }


# 减少文件搜索范围

* 优化 resolve.modules 配置(减少模块搜索层级) 
* 优化 resolve.mainFields 配置
* 优化 resolve.extensions 配置
* 合理使用 alias
* 
    module.exports = {
        resolve:{
            alias:{//简短缩写，模块路径缩写；
                'react':path.resolve(__dirname,'./node_modules/react/umd/react.production.min.js'),
            },
            modules:[path.resolve(__dirname,'node_modules')],//限制搜索node_modules 文件的范围
            extensions:['.js'],//模块后缀优先搜索类型
            mainfields:['main']//寻找入口文件的时候，寻找package.json中的main字段
        }
    }


# 构建体积优化:动态 Polyfill



# 体积优化策略总结

* Scope Hoisting 
* Tree-shaking 
* 公共资源分离 
* 图片压缩
* 动态 Polyfill