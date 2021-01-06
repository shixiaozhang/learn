/*
 * @Author: your name
 * @Date: 2020-11-25 15:04:40
 * @LastEditTime: 2021-01-06 10:41:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\vue_ts_router_store\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Allcompent from '@/components/Allcompent.vue'

const app=createApp(App)
// 注册全局组件
app.component('my-component-name', Allcompent)
// 全局混入 mixin vue3抛弃mixin使用compentApi

// app.mixin({
//   custom: '我是全局混入!',
//   created() {
//     console.log(this.$options.custom) // => "hello!"
//   }
// })
  app.use(router).use(store).mount('#app')
