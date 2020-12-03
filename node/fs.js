// fs 使用简略 
// fs 同步方法 ：加Sync 如open----》openSync    stat----》statSync
const fs=require('fs')
const path=require('path')
fs.open('./','r',(err,fd)=>{
     //fd 是文件描述符。
    console.log(fd);
})
/** r  该标志意味着打开文件用于读取
 *  r+ 打开文件用于读写。
    w+ 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件。
    a 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件。
    a+ 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件
 */
// 使用 fs.openSync 方法打开文件，该方法会返回文件描述符（而不是在回调中提供）
try {
  const fd = fs.openSync('./', 'r')
} catch (err) {
  console.error(err)
}

// Node.js 获得文件的详细信息
fs.stat('./',(err,stats)=>{
    console.log(stats.isDirectory());
})


/**
 * 使用 stats.isFile() 和 stats.isDirectory() 判断文件是否目录或文件。
    使用 stats.isSymbolicLink() 判断文件是否符号链接。
    使用 stats.size 获取文件的大小（以字节为单位）。
 * 
 */

//  读取文件 
fs.readFile('./test.txt','utf-8',(err,data)=>{
    console.log(data);//我是文件对象fs读取到的值
})
// 同步readFileSync()
try {
    const data = fs.readFileSync('./test.txt', 'utf8')
    console.log(data)
  } catch (err) {
    console.error(err)
  }

// 写入文件 同步方法 fs.writeFileSync()
// 默认情况下，此 API 会替换文件的内容（如果文件已经存在），不存在创建文件
const content='我是被写入的内容。'

fs.writeFile('./test.txt',content,err=>{
    if(err){
        console.error(err);
    }else{
        console.log('ok');
    }
})
// 可以通过指定标志来修改默认的行为：
fs.writeFile('./test.txt', content, { flag: 'a+' }, err => {})

// 追加到文件 appendFile
const appendCont='我是追加的内容。'
fs.appendFile('./test.txt',appendCont,err=>{
    if(err){
        console.error(err);
    }else{
        console.log('ok');
    }
})


// 检查文件夹是否存在 fs.access()

// 创建新的文件夹     fs.mkdir()或 fs.mkdirSync() 

// 读取目录的内容       fs.readdir()或 fs.readdirSync() 
const folderPath = '/Users/joe'

// 获取完整的路径
fs.readdirSync(folderPath).map(fileName => {
    return path.join(folderPath, fileName)
  })


//   重命名文件夹 fs.rename  或 fs.renameSync()

// 删除文件夹 fs.rmdir()或 fs.rmdirSync()
/**
 * 删除包含内容的文件夹可能会更复杂。

    在这种情况下，最好安装 fs-extra 模块，该模块非常受欢迎且维护良好。 它是 fs 模块的直接替代品，在其之上提供了更多的功能。

    在此示例中，需要的是 remove() 方法。
    const fs = require('fs-extra')

            const folder = '/Users/joe'

            fs.remove(folder, err => {
            console.error(err)
            })
 */