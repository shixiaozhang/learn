# 统计信息 stats

* errors-only : 只在发生错误的时候输出
* minimal： 只在发生错误或者有新的编译时输出
* none ： 没有输出
* normal： 标准输出
* verbose ： 全部输出


    module.exports = {
        stats:"errors-only"
    }

# 如何优化命令⾏的构建⽇志
使⽤用 friendly-errors-webpack-plugin 

* success: 构建成功的⽇日志提示
* warning: 构建警告的⽇日志提示
* error: 构建报错的⽇日志提示
* stats 设置成 errors-only


module.exports = { 
    entry: {
        app: './src/app.js',
        search: './src/search.js'
         },
    output: {
        filename: '[name][chunkhash:8].js', path: __dirname + '/dist'
        },
    plugins: [
        new FriendlyErrorsWebpackPlugin()
        ],
    stats: 'errors-only' 
 };