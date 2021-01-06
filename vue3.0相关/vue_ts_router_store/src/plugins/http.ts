"use strict";

import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 10 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};
const _axios = axios.create(config);


// 请求拦截器 
_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器即异常处理
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
// 封装axios
export default {
    get:(api: string,params: any,header?: {})=>{
    return   new Promise((resolve, reject) => {
            _axios({
                method:'get',
                url:api,
                params:params,
                headers:header
            }).then(res=>{
              resolve(res)
            }).catch(err=>{
              reject(err)
            })
        })
    },
    post:(api: string,params: any, header?: {})=>{
     return   new Promise((resolve, reject) => {
            _axios({
                method:'post',
                url:api,
                data:params,
                headers:header
            }).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }

}


