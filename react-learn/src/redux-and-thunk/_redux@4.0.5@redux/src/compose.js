/*
 * @Author: your name
 * @Date: 2020-12-31 10:33:07
 * @LastEditTime: 2021-01-05 15:43:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \redux\examples\async\node_modules\_redux@4.0.5@redux\src\compose.js
 */
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

export default function compose(...funcs) {
    // ? 中间件数量为0 ：store.dispatch => store.dispatch 
    // ? 直接返回store原始的dispatch
  if (funcs.length === 0) {
    return arg => arg
  }
    // ? 中间件数量为1 ：
    // ? next => action => {} 
    // ? 变为 
    // ?  store.dispatch => action =>{} 
    
    // ?  thunk为例：
    // ?  

    
  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
