/*
 * @Author: your name
 * @Date: 2020-12-30 16:36:50
 * @LastEditTime: 2020-12-30 16:42:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\redux\Todo.js
 */
import React from 'react'
import PropTypes  from 'prop-types'

const Todo=({onClick,completed,text})=>(
    <li
    onClick={onClick}
    style={{
        textDecoration:completed?'line-through':'none'
    }}
    >
        {text}
    </li>
)
Todo.PropTypes={
    onClick:PropTypes.func.isRequired,
    completed:PropTypes.bool.isRequired,
    text:PropTypes.string.isRequired
}
export default Todo