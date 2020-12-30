/*
 * @Author: your name
 * @Date: 2020-12-30 17:36:23
 * @LastEditTime: 2020-12-30 20:29:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\redux\containers\VisibleTodoList.js
 */
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  // ? 这里通过条件判断，把符合条件的值过滤出来，放到props中，给组件使用
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_ALL':
    default:
      return todos
  }
}

const mapStateToProps = state => {//? state ：这里可以取到 redux中store的值
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

// const toggleTodo = id => {
//   return {
//     type: 'TOGGLE_TODO',
//     id
//   }
// }
const mapDispatchToProps = dispatch => {
    // ?  dispatch接受的是redux中store 的 dispatch 的方法 ；
  // ? 接受一个 {type:'' ,xxxx}类似的对象；通过type的值，调用redux 中的修改方法
  return {
    onTodoClick: id => {//? 把id，添加到 redux中的store的结构里面
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  //? 这里面的两个函数的返回值都是存在props里面传给TodoList这个组件的
  //? 一个是值，一个是func 
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList