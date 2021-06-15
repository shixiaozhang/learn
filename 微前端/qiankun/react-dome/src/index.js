import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import { selectToken } from './store/actions'
import Routers from './App'
import './index.css';

if (window.__POWERED_BY_QIANKUN__) {
  window.__webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

function render(props) {
  const { container, onGlobalStateChange } = props;
  console.log("子应用render的参数", props);

  onGlobalStateChange && onGlobalStateChange((state, prevState) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log("通信状态发生改变：", state, prevState);
    store.dispatch(selectToken('123456'))
  }, true)

  ReactDOM.render(
    <Provider store={store}>
      <Routers />
    </Provider>,
    container ? container.querySelector('#root') : document.querySelector('#root'));
}
// ReactDOM.render(
// <Provider store={store}>
//   <Routers />
// </Provider>,
//   document.getElementById('root')
// );
export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  console.log("[react16] props from main unmount");
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}