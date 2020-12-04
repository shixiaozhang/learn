const http=require('http')
// http.METHODS 列出了所有支持的 HTTP 方法：
console.log(http.METHODS);

//http.STATUS_CODES  列出了所有的 HTTP 状态代码及其描述：
console.log(http.STATUS_CODES);
// http.createServer()  返回 http.Server 类的新实例

const server=http.createServer((req,res)=>{
      //使用此回调处理每个单独的请求。
})

// http.request() 发送 HTTP 请求到服务器
/**类似于 http.request()，
 * 但会自动地设置 HTTP 方法为 GET，
 * 并自动地调用 req.end()。
 * */


//   http请求
const axios=require('axios')

axios.post('http://nodejs.cn/todos',{
    todo:'做点事情'
}).then(res=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})



 // 发送get请求https
 const https = require('https')
 const { on } = require('process')
 const options = {
     hostname: 'nodejs.cn',
     port: 443,
     path: '/todos',
     method: 'GET'
 }
 
 const req = https.request(options, res => {
     console.log(`状态码:${res.statusCode}`)
     res.on('data', d => {
         process.stdout.write(d)
     })
 })
 req.on("error", error => {
     console.error(error);
 
 })
 req.end()
 // 发送post请求https
 const data =JSON.stringify({
     todo:"do something"
 })
 const p_options={
     hostname:'nodejs.cn',
     port:443,
     path:'/todos',
     method:'POST',
     headers:{
         "Content-type":'application/json',
         "Content-Length":data.length
     }
 }
 const P_req=https.request(p_options,res=>{
     console.log(res.statusCode);
     res.on('data', d => {
         process.stdout.write(d)
       })
 })
 P_req.on('error', error => {
     console.error(error)
   })
   P_req.write(data)
   P_req.end()