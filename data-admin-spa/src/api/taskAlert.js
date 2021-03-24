import request from '@/utils/request'

export default {
  searchTaskAlertPage: query => {
    return request({
      url: '/api/task/alert/listPage',
      method: 'post',
      params: query
    })
  },
  closeTaskAlert: param => {
    return request({
      url: '/api/task/alert/closeAlert',
      method: 'post',
      data: param
    })
  }
}
