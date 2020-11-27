import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app=createApp(App)
app.component('my-component-name', {
   template:`<h1>我是全局组件</h1>`
  })
  app.use(router).use(store).mount('#app')
