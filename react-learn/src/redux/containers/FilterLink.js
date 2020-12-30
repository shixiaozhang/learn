/*
 * @Author: your name
 * @Date: 2020-12-30 17:37:03
 * @LastEditTime: 2020-12-30 20:29:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\redux\containers\FilterLink.js
 */
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
  // ? state 这个值是 redux 中 store的值
  // ? ownProps 这个值是 FilterLink 组件接受的 props
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
// const setVisibilityFilter = filter => {
//   return {
//     type: 'SET_VISIBILITY_FILTER',
//     filter
//   }
// }
const mapDispatchToProps = (dispatch, ownProps) => {
  // ?  dispatch接受的是redux中store 的 dispatch 的方法 ；
  // ? 接受一个 {type:'' ,xxxx}类似的对象；通过type的值，调用redux 中的修改方法
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink