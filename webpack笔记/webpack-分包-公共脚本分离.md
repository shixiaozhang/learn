# 基础库分离
## 1、利用 html-webpack-externals-plugin 插件实现

cnpm i html-webpack-externals-plugin -D

### 将 react、react-dom 基础 包通过 cdn 引⼊入，不打⼊ bundle 中-就是把例如react一样的包通过cnd引入，不把他编译到最终的包中；

* webpack.config.js

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')//基础库分离
plugins:[
  new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://unpkg.com/react@17/umd/react.production.min.js',//可以是本地文件，也可以是cdn
                    global: 'React'
                },
                {
                    module: 'react-dom',
                    entry: 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',//可以是本地文件，也可以是cdn
                    global: 'ReactDom'
                },
            ]
        }),    
]

* index.html

    <script src="https://unpkg.com/react@17/umd/react.production.min.js">
    </script>
     <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js">
    </script>

## 2、利用 externals

* index.html

    <script
    src="https://code.jquery.com/jquery-3.1.0.js"
    integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
    crossorigin="anonymous">
    </script>

* webpack.config.js

    externals: {
    jquery: 'jQuery'
    }

* 使用
  
    import $ from 'jquery';

    $('.my-element').animate(...);


## 3、optimization.splitChunks 实现：

##  分离基础包 react  、react-dom：
1、先配置optimization.splitChunks参数，提取react和react-dom为公共包；
2、再在HtmlWebpackPlugin的chunks配置中添加公共包的名字；用于引入公共包
3、HtmlWebpackPlugin中 chunks配置的东西就是我们 最终会引入到模版html中的js 
module.exports = {

 //optimization.splitChunks 实现提取react和react-dom
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /(react|react-dom)/,
                    name: 'vendors',
                    chunks: 'all',
                },

            },
        },
    },
    plugins:[
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src/search/index.html'),
                filename: 'search.html',
                chunks: ['search','vendors'],
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
    ]
}

##  分离页面的公共文件：

optimization: {
        splitChunks: {
            minSize:1000,//引入文件的大小小于这个值的文件不会被打包
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2,//最少引用的次数
                },
            },
        },
    },

详细配置见：'./webpack4.0打包代码分割optimization.splitChunks的配置详解.md'
'../otherCode/bi-designer/vue.config.js'中有实战配置
