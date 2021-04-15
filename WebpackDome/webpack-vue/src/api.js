/*
 * @Author: your name
 * @Date: 2021-04-12 13:54:13
 * @LastEditTime: 2021-04-12 13:55:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpack-vue\src\api.js
 */
import axios from 'axios'

// 创建axios实例
const service = axios.create({
  headers: {
    'AUTH-SYS': 'admin'
  },
  timeout: 5000 // 请求超时时间
})

// 环境的切换
if (process.env.NODE_ENV == 'development') {
  service.defaults.baseURL = 'http://marketing2.kaoyan-vip.cn/'
} else if (process.env.NODE_ENV == 'debug') {
  service.defaults.baseURL = ''
} else if (process.env.NODE_ENV == 'production') {
  service.defaults.baseURL = 'http://192.168.3.169:8000/'
}

export default service