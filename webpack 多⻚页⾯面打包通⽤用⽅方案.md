## 利用 glob.sync 同步查询文件


 entry: glob.sync(path.join(__dirname, './src/*/index.js'))//获取 src/*/index.js下的所有index
* 要把多个入口的文件路径格式配置相同如：
* 在src目录下，用不同的文件夹名，区别不同的页面文件；然后在该文件夹下，配置相同的名称的index.js ，index.html作为入口和模版
* glob 库可以查询获取匹配查找到我们需要的文件
### 实现：

npm i glob

const glob = require('glob')
const path = require('path');


const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"))
    console.log(entryFiles);
    // [
    //     '/Users/Z/project/learn/webpack视频课相关/示例代码/code/chapter02-main/my-project/src/index/index.js',
    //     '/Users/Z/project/learn/webpack视频课相关/示例代码/code/chapter02-main/my-project/src/search/index.js'
    //   ] 
    entryFiles.forEach(entryFile=>{
        // 正则匹配，获取文件夹name
        const match=entryFile.match(/src\/(.*)\/index\.js$/)
        const pageName=match&&match[1]
        console.log(pageName);
        entry[pageName]=entryFile//此处也可写为 match[0] ---》 src/index/index.js
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: ['search'],
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
const {entry,htmlWebpackPlugins}=setMPA()

填入配置项
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
    plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name]_[contenthash:8].css'
            }),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano')
            }),
            // 自动引入多个入口的模版html
            ...htmlWebpackPlugins,
    ]
}