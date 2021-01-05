/*
 * @Author: your name
 * @Date: 2020-12-03 11:34:43
 * @LastEditTime: 2021-01-05 21:37:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\node\app.js
 */

// const readline=require('readline').createInterface({
//     input:process.stdin,
//     output:process.stdout
// })
// readline.question(`nijiaosha`,name=>{
//     console.log(`${name}`);
//     readline.close()
// })
// 搭建http服务器
// const http=require('http');
// const port =5000

// const server=http.createServer((req,res)=>{
//    // 可以访问 HTTP 请求头
//    req.on('data', chunk => {
//     console.log(`可用的数据块: ${chunk}`)
//   })
//   req.on('end', () => {
//     //数据结束
//   })
//     res.statusCode=200
//     res.setHeader('Content-Type', 'text/plain')
//     res.end('aaa')

// })
// server.listen(port,()=>{
//     console.log(`服务器运行在 http://:${port}/`);
// })


// express搭建项目
const path = require('path')
const express = require('express')
const app = express()

app.set("port", process.env.PORT || 8000);
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.get('/', (req, res) => {
  res.send('测试')//普通返回值string
})
app.get("/headers", (req, res) => {
  // res.set("Content-Type", "text/plain");

  console.log(req);
  // res.send('测试2')//普通返回值string
  res.json({
    id: '4',
    name: 'zzzzzzzzz',
    age: 29
  })//json类型返回值
});
app.post("/headers", function (req, res) {
  res.set("Content-Type", "text/plain");

  console.log(req);

  res.send(req.query);
});
// 通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：
app.use(express.static('public'));
// 通过带有 /static 前缀地址来访问 public 目录中的文件了。
app.use('/static', express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))
// 定制 404 页面
app.use(function (req, res) {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not Found");
});
// 定制 500 页面
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Server Error");
});
app.disable("x-powered-by");
app.listen(app.get("port"), () => {
  console.log(`Example app listening on port ${app.get("port")}!`);
})

