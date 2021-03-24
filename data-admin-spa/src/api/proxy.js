import request from '@/utils/request'

export default {
  saveProxyPool: config => {
    return request({
      url: '/api/proxy/save',
      method: 'post',
      data: config,
      headers: {'Content-Type': 'application/json'}
    })
  },
  searchProxyPool: query => {
    return request({
      url: '/api/proxy/pageList',
      method: 'post',
      params: query
    })
  },
  deleteProxyPool: id => {
    return request({
      url: '/api/proxy/delete',
      method: 'post',
      dataType: 'text',
      data: {id: id}
    })
  }
}
