/*
 * @Author: your name
 * @Date: 2020-12-30 16:36:50
 * @LastEditTime: 2020-12-30 20:22:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\redux\Todo.js
 */
import React from 'react'

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

export default Todo