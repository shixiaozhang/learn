import Vue from 'vue'
import App from './App.vue'
import ZUI from './../packages/index'
Vue.config.productionTip = false

// 注册组件库
Vue.use(ZUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
