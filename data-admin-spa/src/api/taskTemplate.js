import request from '@/utils/request'

export default {
  saveTemplate: form => {
    return request({
      url: '/api/taskTemplate/save',
      method: 'post',
      data: form,
      headers: {'Content-Type': 'application/json'}
    })
  },
  searchTemplatePage: query => {
    return request({
      url: '/api/taskTemplate/listPage',
      method: 'post',
      params: query
    })
  },
  listAllTemplates: query => {
    return request({
      url: '/api/taskTemplate/listAll',
      method: 'post',
      params: query
    })
  },
  getTemplateDetailById: id => {
    return request({
      url: '/api/taskTemplate/detail',
      method: 'get',
      params: id
    })
  },
  deleteTemplate: query => {
    return request({
      url: '/api/taskTemplate/delete',
      method: 'post',
      params: query
    })
  }
}
