const { getAST,getDependencies,transform } = require('./paraser')
const path = require('path')
const Compiler=require('./compiler')
const options=require('../simplepack.config')
let AST = getAST(path.join(__dirname, '../src/index.js'))

console.log(AST);
let dependencies=getDependencies(AST)

console.log(dependencies);

const source=transform(AST)
console.log(source);

new Compiler(options).run()