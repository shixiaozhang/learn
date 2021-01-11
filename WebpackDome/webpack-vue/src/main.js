/*
 * @Author: your name
 * @Date: 2021-01-11 10:13:59
 * @LastEditTime: 2021-01-11 15:13:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpack-vue\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import './index.less';
console.log(App);
// new Vue({
//     el: "#root",
//     render: h => (App)
// })
const app=new Vue({
    render:h=>h(App)
  }).$mount('#root')
