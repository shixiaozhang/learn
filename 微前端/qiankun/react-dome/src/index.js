import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import Routers from './routers'
import './index.css';



ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>,
  document.getElementById('root')
);

