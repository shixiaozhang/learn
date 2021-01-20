/*
 * @Author: your name
 * @Date: 2021-01-18 13:46:58
 * @LastEditTime: 2021-01-20 15:58:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Other\算法\手写 Promise .js
 */
// https://github.com/sisterAn/JavaScript-Algorithms/issues/85


/**
 *  规范：
 * 1.Promise 本质是一个状态机，每个 Promise 有三种状态：pending、fulfilled 以及rejected。状态转变只能是pending —> fulfilled 或者 pending —> rejected。状态转变不可逆。
 * 2、then 方法可以被同一个 promise 调用多次。
 * 3、then 方法必须返回一个 promise。规范2.2.7中规定， then 必须返回一个新的 Promise值穿透
 * 
 */
const PENDING = 'pending';//等待
const FULFILLED = 'fulfilled';//成功
const REJECTED = 'rejected';//失败
function MyPromise(callback) {
    const _this = this;
    _this.value = void 0;
    _this.currentState  = PENDING;

    _this.oonResolveCallbacks = [];
    //因为一个promise 当他在pending状态时； 可以接收多个then ；
    // 每个then里面的回调函数 不同 ；而且promise还没有成功或失败；
    // 所以把所有的回调函数 按顺序保存在数组中；以供 当promise 有结果是执行并传入结果；
    _this.onRejectedCallbacks = [];

    _this.resolve = function (value) {
        if (value instanceof MyPromise) {
            // 如果 value 是个 MyPromise，递归执行
            //  那么 value 中就会给他的then 传递一个 resovle（value）；
            //  在通过then中传入的 this。resolve 接收 resovle（value）的值；
            // 再来改变第一个promise的 this.value;
            // 从而使 最开始的 promise then 获取到最终的 this。value
            return value.then(_this.resolve, _this.reject)
        }
        setTimeout(() => {
            if (_this.currentState  === PENDING) {
                _this.currentState  = FULFILLED
                _this.value = value;
                _this.oonResolveCallbacks.forEach(cb => cb())
            }

        })

    }
    _this.reject = function (value) {
        setTimeout(() => { // 异步执行，保证顺序执行
            if (_this.currentState  === PENDING) {
                _this.currentState  = REJECTED // 状态管理
                _this.value = value
                _this.onRejectedCallbacks.forEach(cb => cb())
            }
        })
    }

    try {
        callback(_this.resolve, _this.reject)
    } catch (error) {
        _this.reject(error)
    }
}
/**
 * promise.then(onFulfilled, onRejected)
 * onFulfilled 特性：
 *          当 Promise 执行结束后其必须被调用，其第一个参数为 promise 的终值，也就是 resolve 传过来的值
 *          在 Promise 执行结束前不可被调用
 *          调用次数不可超过一次
 * onRejected 特性
        当 Promise 被拒绝执行后其必须被调用，第一个参数为 Promise 的拒绝原因，也就是reject传过来的值
        在 Promise 执行结束前不可被调用
        其调用次数不可超过一次
 
 * 多次调用:
        then 方法可以被同一个 promise 调用多次
        当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
        当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调
        
 * 返回 ：
        then方法会返回一个Promise

        

 */
MyPromise.prototype.then = function (onFulfilled, onRejected) {

    const _this = this;
    let promise2;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error };

    if (_this.currentState === FULFILLED) {
        return promise2 = new MyPromise(function (resolve, reject) {
            // setTimeout(() => {
                try {
                    var x = onFulfilled(_this.value)
                    // if (x instanceof MyPromise) {
                    //     // 通过then 中可以获取 x 的value ；
                    //     // 把 resolve 也就是 _this.resolve函数 传入x；
                    //     // 这样就可以 把promise2 的 _this.value 设置成x的value
                    //     x.then(resolve, reject)
                    // }
                    // resolve(x)//直接把x 作为promise2 的值
                     // 替换
                     resolutionProcedure(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        // })
    }

    if (_this.currentState === REJECTED) {
        return promise2 = new MyPromise(function (resolve, reject) {
            // setTimeout(() => {
            try {
                let x = onRejected(_this.value)
                // if (x instanceof MyPromise) {
                //     x.then(resolve, reject)
                // }
                 // 替换
                 resolutionProcedure(promise2, x, resolve, reject)
            } catch (error) {
                reject(error)
            }
        })
        // })
    }
    if (_this.currentState === PENDING) {
        // 如果当前的Promise还处于PENDING状态，我们并不能确定调用onFulfilled还是onRejected
        // 只有等待Promise的状态确定后，再做处理
        // 所以我们需要把我们的两种情况的处理逻辑做成callback放入promise1（此处即self/this）的回调数组内
        // 处理逻辑和以上相似

        return promise2 = new MyPromise(function (resolve, reject) {
            _this.oonResolveCallbacks.push(function () {
                try {
                    let x = onFulfilled(_this.value)
                    // if (x instanceof MyPromise) {
                    //     x.then(resolve, reject)
                    // }
                    // resovle(x)
                     // 替换
                     resolutionProcedure(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })

            _this.onRejectedCallbacks.push(function () {
                try {
                    let x = onRejected(_this.value)
                    // if (x instanceof MyPromise) {
                    //     x.then(resolve, reject)
                    // }
                    // resovle(x)
                    // 替换
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }
    
    function resolutionProcedure(promise2, x, resolve, reject) {
        // ，x 不能和 promise2 相同，避免循环引用
        if (promise2 === x) {
            return reject(new TypeError('Chaining cycle detected for promise!'))
        }
        if (x instanceof  MyPromise) {
            //跟初步实现本身无缝连接相似；
            // 但是当 x 还是pending 
            // 我们不知道他的返回值 value 是不是 一个其他类型的promise
            // 所以要在他 执行完成后 对他的 then在进行递归判断
            if (x.currentState === PENDING) {
                x.then(function (value) {
                    resolutionProcedure(promise, value, resolve, reject)
                }, reject)
            } else {
                // 如果 x 的状态已经确定了；就直接 在 then 中传入resolve,reject
                // 获取他的 值 传给 promise2
                x.then(resolve, reject)
            }
            return
        }
        let called = false;//x 是执行
    
        // 下面就是对其他 类型的promise 进行兼容；
        if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
            //判断x 如果不是 null ，是 函数或者对象；
            try {
                let then = x.then
                if (typeof then === 'function') {
                    // 判断 x 是否 拥有 then ；作为他是不是一个promise 的标准
                    // x 如果是一个promise 就把他的结果在传入resolutionProcedure
                    // 继续判断 知道返回一个 普通的值 x 或者 不返回值 
                    then.call(
                        x,
                        y => {
                            if (called) return
                            called = true
                            return resolutionProcedure(promise2, y, resolve, reject)
                        },
                        r => {
                            if (called) return
                            called = true
                            return reject(r)
                        })
                } else {
                    // 如果x 是普通值 就直接返回
                    resolve(x)
                }
            } catch (error) {
                if (called) return
                called = true
                return reject(called)
            }
        } else {
            resolve(x)
        }
    
    }
}

// catch的实现
MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}



// 与其他promise 形成无缝连接；
// 本质就是通过其他promise 的then 传入自身的 resolve和reject来获取value；


// finally 的实现
MyPromise.prototype.finally = function (callback) {
    
}



// let exmp = function (params) {
//     return new MyPromise(function (resolve, reject) {
//         if (params) {
//             resolve(params)
//         } else {
//             reject('1111')
//         }

//     })
// }
// exmp('22222').then(res => {
//     console.log(res, 'res');
// }, err => {
//     console.log(err, 'err');
// })

// const PP = new Promise(function (resolve, reject) {
//     resolve('1111')
//     // reject('1111')
// });
// // 不论 promise1 被 reject 还是被 resolve ，
// //  promise2 都会被 resolve，
// // 只有出现异常时才会被 rejected。
// PP.then(res => {
//     console.log(res, 'res1');
//     return 1
// }, err => {
//     console.log(err, 'err1');

// }).then(res => {
//     console.log(res, 'res2');
// }, err => {
//     console.log(err, 'err2');

// })
new MyPromise(function(resolve, reject) {
    setTimeout(function() {
        resolve('1')
    }, 1000)
}).then(function(res) {
    console.log(res);
    return  Promise.reject('2') // ES6 的 Promise
}).then(function(res) {
    console.log(res);

    return Promise.all([ // Q 的 Promise
        new MyPromise(resolve => resolve('3')) ,// 我们实现的Promise
        Promise.resolve('4') // ES6 的 Promise
    ])
}).then(res=>{
    console.log(res);
})
Promise.all([ // Q 的 Promise
    new MyPromise(resolve => resolve('3')) ,// 我们实现的Promise
    Promise.resolve('4') // ES6 的 Promise
]).then(res=>{
console.log(res);
})