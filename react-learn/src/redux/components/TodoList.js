/*
 * @Author: your name
 * @Date: 2020-12-30 16:36:59
 * @LastEditTime: 2020-12-30 17:52:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\redux\TodoList.js
 */
import React from 'react'
import PropTypes  from 'prop-types'
import Todo from './Todo'
const TodoList = ({ todos, onTodoClick }) => (
    <ul>
      {todos.map(todo => (
        <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
      ))}
    </ul>
  )
  

// TodoList.PropTypes = {
//     todos: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         completed: PropTypes.bool.isRequired,
//         text: PropTypes.string.isRequired
//       }).isRequired
//     ).isRequired,
//     onTodoClick: PropTypes.func.isRequired
//   }
export default TodoList