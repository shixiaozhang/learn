/*
 * @Author: your name
 * @Date: 2020-12-31 10:32:02
 * @LastEditTime: 2020-12-31 17:14:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \async\src\index.js
 */
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'

const middleware = [ thunk ]
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger())
// }

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)
store.subscribe(()=>{
  let  data=store.getState()
  console.log(data);
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
