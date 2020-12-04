// Buffer
// 创建 buffer
/**
 * Buffer.from()、
 * Buffer.alloc()
 * Buffer.allocUnsafe() 
 * 方法均可以创建 
 * 
 * 
 * 
 */

//  Buffer.from()用法：
// Buffer.from(array)
// Buffer.from(arrayBuffer[, byteOffset[, length]])
// Buffer.from(buffer)
// Buffer.from(string[, encoding])

// Buffer.alloc()
// Buffer.allocUnsafe() 

// 创建一个 1KB 的 buffer：
const buf = Buffer.alloc(1024)
//或
const buf2 = Buffer.allocUnsafe(1024)

const tt=Buffer.from('hello!')
tt.toString()//hello!
// 更改 buffer 的内容
tt.write('Hey!')

// 复制 buffer
let bufcopy = Buffer.alloc(4)
tt.copy(bufcopy)


// buffer有length可循环，可使用slice()进行切片