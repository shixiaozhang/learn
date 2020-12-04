// 流

// pipe()
// pipe() 方法的返回值是目标流，这是非常方便的事情，它使得可以链接多个 pipe() 调用
// src.pipe(dest1).pipe(dest2)
const http = require('http')
const fs = require('fs')

// const server = http.createServer((req, res) => {
//     // 普通传输
//     // fs.readFile(__dirname + '/data.txt', (err, data) => {
//     //     res.end(data)
//     //   })
//     // 流传输
//   const stream = fs.createReadStream(__dirname + '/data.txt')
//   stream.pipe(res)
// })
// server.listen(3000)
// 创建可读流
// stream 模块获取可读流
const stream=require('stream')
// 创建流对象
const readableStream=new stream.Readable()
// 实现 _read
readableStream._read=()=>{}
// 也可以使用 read 选项实现 _read
const readableStream2=new stream.Readable({
    read(){}
})
// 发送数据
readableStream.push('hello!')

// 创建可写流
const writableStream=new stream.Writable()

// 实现 _write
writableStream._write=(chunk,encoding,next)=>{
    console.log(chunk.toString());
    next()
}

// 传输可读流
// process.stdin.pipe(writableStream)




// 从可读流中获取数据
readableStream.pipe(writableStream)// 把可读流传入可写流里面

// 使用 readable 事件直接地消费可读流
readableStream.on('readable',()=>{
    console.log(readableStream.read().toString());
})
// 发送数据到可写流
writableStream.write('hey!')


// 当可读流与可写流建立pipe，为可读流push可写流自动获取
readableStream.push('hi!')
readableStream.push('ho!')
// 使用信号通知已结束写入的可写流
// writableStream.end()