
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
// // 发送get请求https
// const https = require('https')
// const { on } = require('process')
// const options = {
//     hostname: 'nodejs.cn',
//     port: 443,
//     path: '/todos',
//     method: 'GET'
// }

// const req = https.request(options, res => {
//     console.log(`状态码:${res.statusCode}`)
//     res.on('data', d => {
//         process.stdout.write(d)
//     })
// })
// req.on("error", error => {
//     console.error(error);

// })
// req.end()
// // 发送post请求https
// const data =JSON.stringify({
//     todo:"do something"
// })
// const p_options={
//     hostname:'nodejs.cn',
//     port:443,
//     path:'/todos',
//     method:'POST',
//     headers:{
//         "Content-type":'application/json',
//         "Content-Length":data.length
//     }
// }
// const P_req=https.request(p_options,res=>{
//     console.log(res.statusCode);
//     res.on('data', d => {
//         process.stdout.write(d)
//       })
// })
// P_req.on('error', error => {
//     console.error(error)
//   })
//   P_req.write(data)
//   P_req.end()
// //   http请求
// const axios=require('axios')

// axios.post('http://nodejs.cn/todos',{
//     todo:'做点事情'
// }).then(res=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })


// express搭建项目
const path=require('path')
const express=require('express')
const app=express()
app.set("port", process.env.PORT || 3000);
app.get('/',(req,res)=>{
  res.send('测试')//普通返回值string
})
app.get("/headers", function(req, res) {
  res.set("Content-Type", "text/plain");

  console.log(req);
 
  res.render("custom-layout", { layout: "custom" })//json类型返回值
});
app.post("/headers", function(req, res) {
  res.set("Content-Type", "text/plain");

  console.log(req);
 
  res.send(req.query);
});
// 通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：
app.use(express.static('public'));
// 通过带有 /static 前缀地址来访问 public 目录中的文件了。
app.use('/static', express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(function(req, res) {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not Found");
});
// 定制 500 页面
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Server Error");
});
app.disable("x-powered-by");
app.listen(app.get("port"),()=>{
  console.log(`Example app listening on port ${app.get("port")}!`);
})



// fs
const fs=require('fs')
//  读取文件
fs.readFile('/node/path.js','utf-8',(err,data)=>{
  console.log(data);
})
