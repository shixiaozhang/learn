//? 解析AST 语法树 =》输出代码 实现 es6 =》 es5
//? 分析依赖


// npm i babylon -S 用于代码解析
// npm i babel-traverse -S 用于分析依赖
// npm i babel-core -S  ast 转 es5

const fs = require('fs')
const babylon = require('babylon') //转换AST 的库
const traverse = require('babel-traverse').default //分析依赖的库
const { transformFromAst } = require('babel-core')
module.exports = {
    // 转换代码
    getAST: (path) => {
        // 获取文件内容
        const source = fs.readFileSync(path, 'utf-8');
        return babylon.parse(source, {
            sourceType: 'module'
        })
    },
    // 分析依赖
    getDependencies: (ast) => {
        const dependencies = [];//存放依赖
        traverse(ast, {
            //import 引入的分析
            ImportDeclaration: ({ node }) => {
                dependencies.push(node.source.value)
            }
        })


        return dependencies //返回依赖项 [ './greeting.js' ]
    },
    // AST 转es5 
    transform: (ast) => {
        // 解析 es6 以及更高级js
        const { code } = transformFromAst(ast, null, {
            presets: ['env']//env就是这个babel插件：npm install babel-preset-env -S
        })
        return code
    }

}