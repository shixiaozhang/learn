/*
 * @Author: your name
 * @Date: 2021-01-05 20:59:23
 * @LastEditTime: 2021-01-05 21:02:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\reduxAsync\index.js
 */
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer, { reducers } from './reducers/index'
import App from './containers/App'


const middleware=[thunk]

const store=createStore(reducers,applyMiddleware(...middleware))

store.subscribe(()=>{
    console.log(store.getState());
  })
  



  render(
      <Provider store={store}>
          <App></App>
      </Provider>,
      document.querySelector('root')
  )