const { runLoaders } = require('loader-runner')//可以直接运行loader的插件
const fs = require('fs')
const path = require('path')

runLoaders({
    resource: path.join(__dirname, './src/demo.txt'),
    loaders: [
       
        {
            loader: path.join(__dirname, './loader/raw-loader.js'),
            options: {
                name: 'test'
            }
        }
    ],
    context: {
        minimize: true
    },
    readResource: fs.readFile.bind(fs)
}, (err, result) => {
    err ? console.log(err) : console.log(result);
})