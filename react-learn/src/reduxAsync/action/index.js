/*
 * @Author: your name
 * @Date: 2021-01-05 17:34:30
 * @LastEditTime: 2021-01-05 21:36:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\reduxAsync\action\index.js
 */
import {ADD_A,ADD_B,DEL_A,DEL_B,SHOW} from '../reducers/index'

export const add_a=(val)=>dispatch=>{
    dispatch({type:ADD_A,val})
}
export const add_b=(val)=>dispatch=>{
    dispatch({type:ADD_B,val})
}
export const del_a=(val)=>dispatch=>{
    dispatch({type:DEL_A,val})
}
export const del_b=(val)=>dispatch=>{
    dispatch({type:DEL_B,val})
}
export const show=(val)=>dispatch=>{
    dispatch({type:SHOW,class:val})
}
export const fetchPosts = () => dispatch => {
 
    return fetch(`http://127.0.0.1:8000/headers`)
      .then(response => response.json())
      .then(json => dispatch(add_b(json)))
  }