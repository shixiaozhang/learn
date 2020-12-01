import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Allcompent from '@/components/Allcompent.vue'

const app=createApp(App)
// 注册全局组件
app.component('my-component-name', Allcompent)
// 全局混入 mixin

// app.mixin({
//   custom: '我是全局混入!',
//   created() {
//     console.log(this.$options.custom) // => "hello!"
//   }
// })
  app.use(router).use(store).mount('#app')
