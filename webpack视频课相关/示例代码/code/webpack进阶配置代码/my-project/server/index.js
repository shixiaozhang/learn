if(typeof window==='undefined'){
    //? 处理打包 ssr 时的错误：ReferenceError: window is not defined
    global.window={}
}
const fs=require('fs')
const path =require('path')
const express = require('express')
const { renderToString } = require('react-dom/server')//? 这个是把react 组件转成字符串的html代码
const SSR = require('../dist/search-server')
const template=fs.readFileSync(path.join(__dirname,'../dist/search.html'),'utf-8')
const data =require('./data.json')

//? <!--HTML_PLACEHOLDER--> 这个可以自定义只是一个标志符
//? <!--INITIAL_DATA_PLACEHOLDER-->
const renderMarkUp = (str) => {
    const dataStr=JSON.stringify(data)
    return template.replace('<!--HTML_PLACEHOLDER-->',str)
    .replace('<!--INITIAL_DATA_PLACEHOLDER-->',`<script>window.__initial_data=${dataStr}</script>`)
}



const server = (port) => {

    const app = express()
    //设置静态目录
    app.use(express.static('dist'));
    app.get("/search", (req, res) => {
        const html = renderMarkUp(renderToString(SSR))
        res.status(200).send(html)
    });
    app.listen(port, () => {
        console.log("Server running");
    })
}

server(process.env.PORT || 3000)