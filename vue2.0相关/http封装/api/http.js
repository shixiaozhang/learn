/** axios封装
  * 请求拦截、相应拦截、错误统一处理
  */
import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../router'
import { Message, Loading } from 'element-ui'

// 环境的切换
// if (process.env.NODE_ENV == 'development') {
//   axios.defaults.baseURL = '/api'
// } else if (process.env.NODE_ENV == 'debug') {
//   axios.defaults.baseURL = ''
// } else if (process.env.NODE_ENV == 'production') {
//   axios.defaults.baseURL = 'http://192.168.3.169:8000/'
// }

// // const Host = `${window.location.protocol}//api.wanrongjishu.com`
// const Host = 'http://192.168.3.169:8000/'
// // axios.defaults.baseURL = Host
// Vue.prototype.baseURL = Host
// // 请求超时时间
axios.defaults.timeout = 10000

// post请求头
let header = { headers: { 'Content-Type': 'application/json', 'auth-token': window.localStorage.getItem('token') ? `Pcany ${window.localStorage.getItem('token')}` : '' } }
// let header = {headers: {'Content-Type': 'application/json'}}
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['token'] = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : ''
axios.interceptors.request.use(
  config => {

    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = window.localStorage.getItem('token')

    let urlList = config.url.split('/')
    if (urlList[1] == 'api') {
      token && (config.headers['auth-token'] = `Pcany ${token}`)
    } else {
      token && (config.headers['auth-token'] = ``)
    }

    return config
  },
  error => {
    return Promise.error(error)
  })

// 添加一个响应拦截器
axios.interceptors.response.use(response => {
  // 处理响应数据
  console.log(response, 11111111)
  let { code, msg } = response.data
  if (code == 200) {
    if(msg!='添加浏览记录成功'){
      Message({
        message: msg,
        duration: 1000,
        type: 'success'
      })
    }
    
  }
  return Promise.resolve(response);
},
  error => {
    console.log(error)
    if (error.response.status) {
      switch (error.response.status) {
        case 401://token过期
          Message({
            duration: 0,
            // message: error.response.data.msg,
            message: 'token过期',
            type: 'warning',
            showClose: true
          })
          Loading.service({ fullscreen: true }).close()
          window.localStorage.clear()
         store.commit("changeLoginState", false);
          router.replace({
            name: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break


      }
    }
    // 处理响应错误
    return Promise.reject(error);
  });

// 响应拦截器
// axios.interceptors.response.use(
//   response => {
//     // console.log(response.getResponseHeader('System-Active-Profile'))
//     // console.log(response.headers.get('System-Active-Profile'), 'response')
//     if (response.status === 200) {
//       let { code, msg } = response.data
//       if (code === 500) {
//         Message({
//           message: msg,
//           duration: 1000,
//           type: 'warning'
//         })
//       }
//       return Promise.resolve(response)
//     } else {
//       return Promise.reject(response)
//     }
//   },
//   // 服务器状态码不是200的情况
//   error => {
//     if (error.response.status) {
//       switch (error.response.status) {
//         // 401: 未登录 token过期
//         // 未登录则跳转登录页面，并携带当前页面的路径
//         // 在登录成功后返回当前页面，这一步需要在登录页操作。
//         case 302:
//           break
//         case 401:
//           Message({
//             duration: 0,
//             message: error.response.data.msg,
//             type: 'warning',
//             showClose: true
//           })
//           Loading.service({ fullscreen: true }).close()
//           window.localStorage.removeItem('token')
//           router.replace({
//             name: 'login',
//             query: {
//               redirect: router.currentRoute.fullPath
//             }
//           })
//           break
//         // 403 token过期
//         // 登录过期对用户进行提示
//         // 清除本地token和清空vuex中token对象
//         // 跳转登录页面
//         // case 403:
//         //   // Message({
//         //   //   message: '此账号没有此权限',
//         //   //   type: 'warning'
//         //   // })
//         //   // Toast({
//         //   //   message: '登录过期，请重新登录',
//         //   //   duration: 1000,
//         //   //   forbidClick: true
//         //   // })
//         //   // 清除token
//         //   window.localStorage.removeItem('token')
//         //   // store.commit('loginSuccess', null)
//         //   // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
//         //   setTimeout(() => {
//         //     router.replace({
//         //       name: 'login',
//         //       query: {
//         //         redirect: router.currentRoute.fullPath
//         //       }
//         //     })
//         //   }, 1000)
//         //   break
//         // 404请求不存在
//         case 404:
//           Message({
//             message: '网络请求不存在',
//             type: 'warning'
//           })
//           // Toast({
//           //   message: '网络请求不存在',
//           //   duration: 1500,
//           //   forbidClick: true
//           // })
//           break
//         // 其他错误，直接抛出错误提示
//         default:
//           Message({
//             message: 'error.response.data.message',
//             type: 'warning'
//           })
//         // Toast({
//         //   message: error.response.data.message,
//         //   duration: 1500,
//         //   forbidClick: true
//         // })
//       }
//       return Promise.reject(error.response)
//     }
//   }
// )



/**
    * get方法，对应get请求
    * @param {String} url [请求的url地址]
    * @param {Object} params [请求时携带的参数]
    */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
/**
    * post方法，对应post请求
    * @param {String} url [请求的url地址]
    * @param {Object} params [请求时携带的参数]
    */
export function post(url, params, config) {

  return new Promise((resolve, reject) => {
    console.log(config)
    axios.post(url, params, config || header)
      .then(res => {
        // Vue.prototype.$store.setHeaders(res.headers['system-active-profile'])
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
export function put(url, params, config) {
  return new Promise((resolve, reject) => {
    axios.put(url, params, config || header)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function postWithHead(url, params, config) {
  return new Promise((resolve, reject) => {
    axios.post(url)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
