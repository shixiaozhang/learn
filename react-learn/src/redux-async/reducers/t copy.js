/*
 * @Author: your name
 * @Date: 2020-12-31 16:01:43
 * @LastEditTime: 2021-01-26 16:34:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \async\src\reducers\t.js
 */
// import { compose } from'redux'
function compose(...funcs) {//? 中间件嵌套函数
  if (funcs.length === 0) {
    returnarg => arg
  }
  
  if (funcs.length === 1) {
    return funcs[0]
  }
  
  return funcs.reduce(function reducer(a, b) {
    console.log(a,b);
    return function (...args) {
      return a(b(...args))
    }
  })
}

// ?分解：

1
function a(...args){
    return fun1(fun2(...args))
}
2
function b(...args){
  return a(fun3(...args))
}


b('a', 'b', 'c')

fun3('a', 'b', 'c')//? fn3 a  b  c

a(3)  //? fn1 a  b  c

fun2(3)//? fn2 3

fun1(2)//? fn1 2


  
function fun1(n) {
  console.log('fun1: ', n)
  return 1
}
function fun2(n) {
  console.log('fun2: ', n)
  return 2
}
function fun3(n1, n2, n3) {
  console.log('fun3: ', n1, n2, n3)
  return 3
}
const fun = compose(fun1, fun2, fun3)
fun('a', 'b', 'c')
// ? 结果：
// ? fun3:  a b c
// ? fun2:  3
// ? fun1:  2
