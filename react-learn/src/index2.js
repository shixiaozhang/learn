/*
 * @Author: your name
 * @Date: 2021-01-05 20:59:23
 * @LastEditTime: 2021-02-04 10:22:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\reduxAsync\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reducers } from './reduxAsync/reducers/index'
import App from './reduxAsync/containers/App'


const middleware=[thunk]

const store=createStore(reducers,applyMiddleware(...middleware))

store.subscribe(()=>{
    console.log(store.getState());
  })
  



  ReactDOM.render(
      <Provider store={store}>
          <App></App>
      </Provider>,
      document.getElementById('root')
  )