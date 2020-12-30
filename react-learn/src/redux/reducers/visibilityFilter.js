/*
 * @Author: your name
 * @Date: 2020-12-30 17:27:50
 * @LastEditTime: 2020-12-30 17:29:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\redux\reducers\visibilityFilter.js
 */
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter
      default:
        return state
    }
  }
  
  export default visibilityFilter