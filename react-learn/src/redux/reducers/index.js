/*
 * @Author: your name
 * @Date: 2020-12-30 17:27:30
 * @LastEditTime: 2020-12-30 17:54:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\redux\reducers\index.js
 */
import { combineReducers,createStore,subscribe } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})
let store=createStore(todoApp)

store.subscribe(()=>{
    console.log(store.getState());
})
export default store