// 文件路径 简略


const path=require('path')

/**
 * dirname: 获取文件的父文件夹。
basename: 获取文件名部分。
extname: 获取文件的扩展名。
 * 
 */

const url='/users/joe/notes.txt'

let a=path.dirname(url)//返回路径的目录部分
let b=path.basename(url)//返回路径的最后一部分。 第二个参数可以过滤掉文件的扩展名：
let c=path.extname(url)//扩展名部分。
console.log(a,b,c);///users/joe    notes.txt     .txt
// 可以通过为 basename 指定第二个参数来获取不带扩展名的文件名
// path.basename(path,扩展名) .txt
let  d=path.basename(url,path.extname(url))
console.log(d);//notes

// 路径拼接
const name='joe'

let f=path.join('/','users',name,'notes.txt')
console.log(f);//\users\joe\notes.txt

// 获得相对路径的绝对路径计算
let e=path.resolve('path.js')
console.log(e);//C:\Users\DaFu\Desktop\work\learn\node\path.js

// 指定第二个文件夹参数
let g=path.resolve('node','path.js')
console.log(g);//C:\Users\DaFu\Desktop\work\learn\node\node\path.js

//第一个参数以斜杠开头，则表示它是绝对路径
let h=path.resolve('/node','path.js')
console.log(h);//C:\node\path.js

// path.normalize() 是另一个有用的函数，
// 当包含诸如 .、.. 或双斜杠之类的相对说明符时，其会尝试计算实际的路径
let k=path.normalize('/learn/node/public/..//fs.js')
console.log(k);//\learn\node\fs.js


// path.isAbsolute() 如果是绝对路径，则返回 true
let j=path.isAbsolute('/test/something')
console.log(j);//true

// path.parse() 解析对象的路径为组成其的片段：



let l=path.parse('/users/test.txt')
console.log(l);//{
                //   root: '/',
                //   dir: '/users',
                //   base: 'test.txt',
                //   ext: '.txt',
                //   name: 'test'
                // }

// path.relative() 接受 2 个路径作为参数。 基于当前工作目录，返回从第一个路径到第二个路径的相对路径。

let m=path.relative('/Users/joe', '/Users/joe/something/test.txt')
console.log(m);//something\test.txt

// 