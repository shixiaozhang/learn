import request from '@/utils/request'

export default {
  pageListRole: query => {
    return request({
      url: '/api/role/pageList',
      method: 'post',
      params: query
    })
  },
  saveRole: role => {
    return request({
      url: '/api/role/save',
      method: 'post',
      data: role,
    })
  },
  deleteRole: id => {
    return request({
      url: `/api/role/delete/${id}`,
      method: 'delete',
    })
  }
}
