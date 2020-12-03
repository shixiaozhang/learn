
// const readline=require('readline').createInterface({
//     input:process.stdin,
//     output:process.stdout
// })
// readline.question(`nijiaosha`,name=>{
//     console.log(`${name}`);
//     readline.close()
// })
// 搭建http服务器
const http=require('http');
const port =5000

const server=http.createServer((req,res)=>{
   // 可以访问 HTTP 请求头
   req.on('data', chunk => {
    console.log(`可用的数据块: ${chunk}`)
  })
  req.on('end', () => {
    //数据结束
  })
    res.statusCode=200
    res.setHeader('Content-Type', 'text/plain')
    res.end('aaa')
   
})
server.listen(port,()=>{
    console.log(`服务器运行在 http://:${port}/`);
})
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