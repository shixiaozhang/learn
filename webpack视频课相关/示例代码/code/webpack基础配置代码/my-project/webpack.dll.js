const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry: {
        //选择要 提取的包，可以多个。分成业务包，和基础包；
        library: [ //基础包示例
            'react',
        ],
        library_dom: [//react-dom是基础包，用作业务包示例
            'react-dom'
        ]
    },
    output: {
        filename: '[name]_[chunkhash].dll.js',
        path: path.join(__dirname, './build/library'),
        library: '[name]'//暴露除库的名字
    },
    plugins: [
        new webpack.DllPlugin({// 打包生产成 json描述文件
            context:__dirname,
            name:'[name]_[hash]',//json的name
            path:path.join(__dirname, './build/library/[name].json'),//json的位置
        })
    ]
        
    
}