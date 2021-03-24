import request from '@/utils/request'

export default {
  checkFix: jsonobj => {
    return request({
      url: '/api/fix/check',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: jsonobj
    })
  },
  loadFixData: query => {
    return request({
      url: '/api/fix/data/load',
      method: 'get',
      params: query
    })
  },
  resetFixData: query => {
    return request({
      url: '/api/fix/data/reset',
      method: 'get',
      params: query
    })
  },
  saveFixData: jsonobj => {
    return request({
      url: '/api/fix/data/save',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: jsonobj
    })
  },
  loadSource: query => {
    return request({
      url: '/api/fix/source',
      method: 'get',
      params: query
    })
  },
  saveFix: jsonobj => {
    return request({
      url: '/api/fix/save',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: jsonobj
    })
  },
  logList:(query)=>{
    return request({
      url: '/api/fix/record',
      method: 'get',
      params:query
    })
  }
}
