
/**
 * yield 用法和解释：
 *  （感觉不如promise和async ... await;)
 * 
 * 
 * 
 */

/**
 * Co 模块
 */

// 异步流程控制
// 最原始异步流程的写法，就是类似上面例子里的回调函数嵌套法，用过的人都知道，那叫一个酸爽。
// 后来出现了 Promise ，它极大提高了代码的可维护性，消除了万恶的回调嵌套问题，并且现在已经成为 ES6 标准的一部分。

$.get('/api/data')
.then(function(data) {
    console.log(data);
    return $.get('/api/user');
})
.then(function(user) {
    console.log(user);
    return $.get('/api/products');
})
.then(function(products) {
    console.log(products);
});
// 之后在 nodejs 圈出现了 co 模块，它基于 ES6 的 generator 和 yield ，让我们能用同步的形式编写异步代码。
co(function *() {
    var data = yield $.get('/api/data');
    console.log(data);
    var user = yield $.get('/api/user');
    console.log(user);
    var products = yield $.get('/api/products');
    console.log(products);
});

/**
 * Iterator 迭代器
 */
var lang = { name: 'JavaScript', birthYear: 1995 };
var it = Iterator(lang);
var pair = it.next(); 
console.log(pair); // ["name", "JavaScript"]
pair = it.next(); 
console.log(pair); // ["birthYear", 1995]
pair = it.next(); // A StopIteration exception is thrown


/**
 * Generator 生成器
 */

function *gen() {
    yield 'hello';
    yield 'world';
    return true;
}
// 以上代码定义了一个简单的 generator，看起来就像一个普通的函数，
// 区别是function关键字后面有个*号，
// 函数体内可以使用yield语句进行流程控制


var iter = gen();
var a = iter.next();
console.log(a); // {value:'hello', done:false}
var b = iter.next();
console.log(b); // {value:'world', done:false}
var c = iter.next();
console.log(c); // {value:true, done:true}


function sayhello() {
    return Promise.resolve('hello').then(function(hello) {
        console.log(hello);
    });
}
function helloworld() {
    sayhello();
    console.log('world');
}
helloworld();
输出

> "world"
> "hello"

// co 的方式，会先输出"hello"再输出"world"。

function co(gen) {
    var it = gen();
    var ret = it.next();
    ret.value.then(function(res) {
        it.next(res);
    });
}
function sayhello() {
    return Promise.resolve('hello').then(function(hello) {
        console.log(hello);
    });
}
co(function *helloworld() {
    yield sayhello();
    console.log('world');
});
输出

> "hello"
> "world"


// 消除回调金字塔
// 假设sayhello/sayworld/saybye是三个异步函数，用真正的 co 模块就可以这么写：

var co = require('co');
co(function *() {
    yield sayhello();
    yield sayworld();
    yield saybye();
});
输出

> "hello"
> "world"
> "bye"