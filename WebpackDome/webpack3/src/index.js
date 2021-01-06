import data  from './data.json'

//引入css
import "./style.css"
function fn1(){
    console.log(111)
}
fn1()
console.log(data)
// 开发环境下打包命令
//webpack ./src/index.js -o ./dist/bundle.js --mode=development
//webpack 入口文件 -o 出口文件 --mode=development（开发)/（生产）production
//webpack默认可以处理js json
//生产环境比开发环境多了压缩和代码混淆




