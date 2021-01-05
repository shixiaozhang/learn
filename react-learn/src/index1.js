/*
 * @Author: your name
 * @Date: 2020-12-14 14:16:53
 * @LastEditTime: 2020-12-30 17:35:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import store from './redux/reducers'
import App from './redux/components/App'

import './index.css';

// import Bdd from './context'
// import Refffff from './refs'
// import MouseTracker from './render'
// import Api from './reactApi'
// import Example from './Hook'
// import All from './Hook2'
// import Routers from './Routers'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
