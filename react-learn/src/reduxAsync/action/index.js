/*
 * @Author: your name
 * @Date: 2021-01-05 17:34:30
 * @LastEditTime: 2021-01-05 17:59:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\reduxAsync\action\index.js
 */
import {ADD_A,ADD_B,DEL_A,DEL_B} from '../reducers/index'
const add_a=(val)=>dispatch=>{
    
    dispatch({type:ADD_A,val})
}