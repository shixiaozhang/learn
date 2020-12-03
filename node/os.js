// os操作系统模块
const os =require('os')

// os.arch() 返回标识底层架构的字符串

console.log(os.arch());

// os.cpus() 返回关于系统上可用的 CPU 的信息。
console.log(os.cpus());


// os.endianness() 根据是使用大端序或小端序编译 Node.js，返回 BE 或 LE
console.log(os.endianness());

// os.freemem() 返回系统中可用的内存字节

console.log(os.freemem());

// os.homedir() 返回当前用户的主目录的路径

console.log(os.homedir());

// os.hostname() 返回主机名
console.log(os.hostname());


// os.loadavg() 返回操作系统对平均负载均衡的计量，尽在linux和macOS上有意义
console.log(os.loadavg());

// os.networkInterfaces() 返回系统上可用的网络接口的详细信息

console.log(os.networkInterfaces());


// os.platform() 返回为 Node.js 编译的平台：
console.log(os.platform());

// os.release() 返回标识操作系统版本号的字符串。
console.log(os.release());

// os.tmpdir() 返回指定的临时文件夹的路径。
// os.totalmem() 返回表示系统中可用的总内存的字节数。
// os.type() 标识操作系统：
console.log(os.type());
/**
 * Linux
macOS 上为Darwin
Windows 上为 Windows_NT
 */

//  os.uptime() 返回自上次重新启动以来计算机持续运行的秒数。


// 用户信息
console.log(os.userInfo());