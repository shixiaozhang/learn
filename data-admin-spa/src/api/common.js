import request from '@/utils/request'

export default {

  searchTaskType: query => {
    return request({
      url: '/api/taskType/pageList',
      method: 'post',
      params: query
    })
  },
  addCategory: form => {
    return request({
      url: '/api/category/save',
      method: 'post',
      data: form,
      headers: {'Content-Type': 'application/json'}
    })
  },
  addTaskType: form => {
    return request({
      url: '/api/taskType/save',
      method: 'post',
      data: form,
      headers: {'Content-Type': 'application/json'}
    })
  },
  listCategory: query => {
    return request({
      url: '/api/category/pageList',
      method: 'post',
      params: query
    })
  },
  listAllCategory:()=>{
    return request({
      url: '/api/category/listAll',
      method: 'get',
    })
  },
  listServiceType: query => {
    return request({
      url: '/api/common/serivceType/list',
      method: 'get',
      params: query
    })
  },
  deleteTaskType: query => {
    return request({
      url: '/api/taskType/delete',
      method: 'post',
      params: query
    })
  },

  getCronParse:cron=>{
    return request({
      url:'/api/common/cron/parse',
      method:'get',
      params:{
        cron:cron
      }
    })
  }
}
