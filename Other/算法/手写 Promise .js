/*
 * @Author: your name
 * @Date: 2021-01-18 13:46:58
 * @LastEditTime: 2021-01-19 16:48:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Other\算法\手写 Promise .js
 */
// https://github.com/sisterAn/JavaScript-Algorithms/issues/85
const PENDING = 'pending';//等待
const FUFILLED = 'fulfiled';//成功
const REJECTED = 'rejected';//失败
function MyPromise(callback) {
    const _this = this;
    _this.value = void 0;
    _this.crurrentState = PENDING
    _this.resovle = function (value) {
        _this.value = value;
        _this.crurrentState = FUFILLED
    }
    _this.reject = function (value) {
        _this.value = value
        _this.crurrentState = REJECTED
    }
    callback(_this.resovle, _this.reject)
}

MyPromise.prototype.then = function (resolve, reject) {
    resolve(this.value);
    reject(this.value);

}


let exmp = function (params) {
    return new MyPromise(function (resolve, reject) {
        if (params) {
            resolve(params)
        } else {
            reject('1111')
        }

    })
}
exmp('22222').then(res => {
    console.log(res, 'res');
}, err => {
    console.log(err, 'err');
})
