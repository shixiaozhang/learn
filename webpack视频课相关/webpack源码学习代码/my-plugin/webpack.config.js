const path = require('path')
const MyPlugin = require('./plugins/my-plugin')

module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'main.js'
    },
    plugins: [
        new MyPlugin({ name: 'xiaozhang' })
    ]
}
