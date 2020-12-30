/*
 * @Author: your name
 * @Date: 2020-12-30 16:36:59
 * @LastEditTime: 2020-12-30 20:22:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\redux\TodoList.js
 */
import React from 'react'
import Todo from './Todo'
const TodoList = ({ todos, onTodoClick }) => (
    <ul>
      {todos.map(todo => (
        <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
      ))}
    </ul>
  )
  


export default TodoList