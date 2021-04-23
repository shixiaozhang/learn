/*
 * @Author: your name
 * @Date: 2021-03-24 10:37:03
 * @LastEditTime: 2021-04-23 16:42:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test\serve\app.js
 */
const path = require('path')
const express = require('express')
const app = express()
const port = 3000;
const HOST = 'http://127.0.0.1:5500'
app.use(express.json())

app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', HOST)
    // res.header('Access-Control-Expose-Headers', 'X-List-Version')//?给前端获取的请求头参数,前置header参数
    // res.header('X-List-Version', '1.3')//?给前端获取的请求头参数

    res.json({
        data: ['123123']
    })
})
app.post('/form', (req, res) => {
    console.log(req);
    // res.header('Access-Control-Allow-Origin', '*')//?通过cors
    res.header('Access-Control-Allow-Origin', HOST)//?携带cookie时，通过cors
    res.header('Access-Control-Allow-Credentials', true)//?通过携带cookie
    res.json({
        data: ['post']
    })
})
app.patch('/form', (req, res) => {
    console.log(req);
    // res.header('Access-Control-Allow-Origin', '*')//?通过cors
    res.header('Access-Control-Allow-Origin', HOST)//?携带cookie时，通过cors
    res.header('Access-Control-Allow-Credentials', true)//?通过携带cookie
    res.json({
        data: ['patch']
    })
})
app.options('/form', (req, res) => {//?通过非简单请求
    console.log(req);
    // res.header('Access-Control-Allow-Origin', '*')//?通过cors
    res.header('Access-Control-Allow-Origin', HOST)//?携带cookie时，通过cors
    res.header('Access-Control-Allow-Credentials', true)//?通过携带cookie
    res.header('Access-Control-Allow-Methods', 'PATCH')
    res.header('Access-Control-Allow-Headers', 'content-type,X-App-Version')//?通过不同的请求头
    res.header('Access-Control-Max-Age',300) //?快取300秒；300秒内不对同一资源做preflight 就是非简单请求的 options 验证    
    res.end()
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})