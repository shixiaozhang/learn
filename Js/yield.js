
// /**
//  * yield 用法和解释：
//  *  
//  * 
//  * 
//  * 
//  */

// /**
//  * Co 模块
//  */

// // 异步流程控制
// // 最原始异步流程的写法，就是类似上面例子里的回调函数嵌套法，用过的人都知道，那叫一个酸爽。
// // 后来出现了 Promise ，它极大提高了代码的可维护性，消除了万恶的回调嵌套问题，并且现在已经成为 ES6 标准的一部分。

// $.get('/api/data')
// .then(function(data) {
//     console.log(data);
//     return $.get('/api/user');
// })
// .then(function(user) {
//     console.log(user);
//     return $.get('/api/products');
// })
// .then(function(products) {
//     console.log(products);
// });
// // 之后在 nodejs 圈出现了 co 模块，它基于 ES6 的 generator 和 yield ，让我们能用同步的形式编写异步代码。
// co(function *() {
//     var data = yield $.get('/api/data');
//     console.log(data);
//     var user = yield $.get('/api/user');
//     console.log(user);
//     var products = yield $.get('/api/products');
//     console.log(products);
// });

//  * Generator 生成器
//  */

// function *gen() {
//     yield 'hello';
//     yield 'world';
//     return true;
// }
// // 以上代码定义了一个简单的 generator，看起来就像一个普通的函数，
// // 区别是function关键字后面有个*号，
// // 函数体内可以使用yield语句进行流程控制


// var iter = gen();
// var a = iter.next();
// console.log(a); // {value:'hello', done:false}
// var b = iter.next();
// console.log(b); // {value:'world', done:false}
// var c = iter.next();
// console.log(c); // {value:true, done:true}


// function sayhello() {
//     return Promise.resolve('hello').then(function(hello) {
//         console.log(hello);
//     });
// }
// function helloworld() {
//     sayhello();
//     console.log('world');
// }
// helloworld();
// 输出

// > "world"
// > "hello"

// // co 的方式，会先输出"hello"再输出"world"。

// function co(gen) {
//     var it = gen();
//     var ret = it.next();
//     ret.value.then(function(res) {
//         it.next(res);
//     });
// }
// function sayhello() {
//     return Promise.resolve('hello').then(function(hello) {
//         console.log(hello);
//     });
// }
// co(function *helloworld() {
//     yield sayhello();
//     console.log('world');
// });
// 输出

// > "hello"
// > "world"


// // 消除回调金字塔
// // 假设sayhello/sayworld/saybye是三个异步函数，用真正的 co 模块就可以这么写：

// var co = require('co');
// co(function *() {
//     yield sayhello();
//     yield sayworld();
//     yield saybye();
// });
// 输出

// > "hello"
// > "world"
// > "bye"
// function *gen() {
//     yield 'hello';
//     yield 'world';
//     yield
//     return true;
// }

// console.log(toString (gen()));
function *gen() {
    console.log('start');
     yield 'hello';
    yield 'world';
    return true;
   
}

var it = gen();
var ret = it.next() 
// var ret2 = it.next() 
// var ret3 = it.next() 
console.log(ret);
// console.log(ret2);
// console.log(ret3);



function *gen2(v) {
    console.log(v);
    console.log(yield);
    console.log(yield);
    console.log(yield 1);
   
}
var it2 = gen2('123');
var ret2 = it2.next(222) //这个值没穿进去，因为第一次调用,之前没有yield；生成器函数只有在next调用时才会运行；不调用不会运行
var ret22 = it2.next(333) 
var ret32 = it2.next(555)
var ret42 = it2.next(666)
// 这样可以打印出 123  333 555 666
console.log(ret2,ret22,ret32,ret42);//但是yield的返回值还是空

// { value: undefined, done: false } { value: undefined, done: false } { value: 1, done: false } { value: undefined, done: true }

//next() 中的值会传给上一个yield
// yield 本身的值；和yield 后通过next 获取的是两个不同概念；

// console.log(yield 'aa');
// yield 本身的值是 undefined；
// next( ) 获取的值是 ’aa‘
// 本次next 之后的下一次 next（val） 传入的val 可以作为 本次yield 本身值 也就是 console.log(yield 'aa')打印的值