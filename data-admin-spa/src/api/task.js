import request from '@/utils/request'

export default {
  searchTaskByFilters: query => {
    return request({
      url: '/api/task/list',
      method: 'post',
      data: { query: query }
    })
  },
  searchItem: query => {
    return request({
      url: '/api/task/item/list2',
      method: 'get',
      params: query
    })
  },
  getTaskStatusList: () => {
    return request({
      url: 'api/common/taskStatus/list',
      method: 'get'
    })
  },
  getItemsDetail: (query) => {
    return request({
      url: '/api/task/item/detail',
      method: 'get',
      params: query
    })
  },
  searchRecord: query => {
    return request({
      url: '/api/task/item/record',
      method: 'post',
      params: query
    })
  },
  queryTaskDetail: query => {
    return request({
      url: '/api/task/detail',
      method: 'get',
      params: query
    })
  },
  getRemoteOptions: query => {
    return request({
      url: '/api/common/dict/' + query.type
    })
  },
  getHandlers: type => {
    return request({
      url: '/api/handler/listAll',
      method: 'post',
      params: type,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  getHandlerTemplates: query => {
    return request({
      url: '/api/task/handler/template'
    })
  },
  saveTask: form => {
    return request({
      url: '/api/task/save',
      method: 'post',
      data: form,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  saveTaskNew: form => {
    return request({
      url: '/api/task/v2/save',
      method: 'post',
      data: form,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  saveTriggerTasks: (taskList) => {
    return request({
      url: '/api/task/v2/savetriggertasks',
      method: 'post',
      data: taskList,
    })
  },
  getFileListByDirectory: directory => {
    return request({
      url: '/api/task/getFileListByDirectory',
      method: 'post',
      data: directory,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  getContextKeys: options => {
    return request({
      url: '/api/contextKeys/listAll',
      method: 'post'
    })
  },
  deleteTask: taskIds => {
    return request({
      url: '/api/task/delete',
      method: 'post',
      dataType: 'text',
      data: { taskIds: taskIds }
    })
  },
  analysisTask: taskIds => {
    return request({
      url: '/api/task/statisic',
      method: 'post',
      dataType: 'text',
      data: { taskIds: taskIds }
    })
  },
  resendTask: task => {
    return request({
      url: '/api/task/item/resend',
      method: 'post',
      params: task
    })
  },
  resendTasks: taskIds => {
    return request({
      url: '/api/task/resend',
      method: 'post',
      dataType: 'text',
      data: { taskIds: taskIds }
    })
  },
  resendItems: (model) => {
    return request({
      url: '/api/task/item/batchresend',
      method: 'post',
      data: model
    })
  },
  getTaskTypes: query => {
    return request({
      url: '/api/taskType/listAll',
      method: 'post',
      params: query
    })
  },
  getTotalStep: query => {
    return request({
      url: '/api/task/step/list',
      method: 'get',
      params: query
    })
  },
  updateItemStatus: param => {
    return request({
      url: '/api/task/item/update',
      method: 'post',
      data: { param: param }
    })
  },
  getStepInfos: taskID => {
    return request({
      url: `/api/task/stepInfo/list/${taskID}`,
      method: 'get',
    })
  },
  deleteMessages: query => {
    return request({
      url: '/api/task/deleteMessages',
      method: 'post',
      params: query
    })
  },
  submitExport: (query, checkedOptions) => {
    return request({
      url: '/api/task/submitExport',
      method: 'post',
      params: query,
      dataType: 'text',
      data: { checkedOptions: checkedOptions }
    })
  },

  getItemSteps(taskId, itemId) {
    return request({
      url: `/api/common/trace/log?item_id=${taskId}_${itemId}`,
      method: 'get',
    })
  },

  getLifeCycle(value) {
    return request({
      url: `/api/common/trace/patent?pn=${value}`,
      method: 'get',
    })
  },

  prepareTask: (taskId) => {
    return request({
      url: `/api/task/v2/preparetask/${taskId}  `,
      method: 'post',
    })
  },
  reprepareTask: (taskId) => {
    return request({
      url: `/api/task/v2/repreparetask/${taskId}  `,
      method: 'post',
    })
  },
  startTask: (taskId) => {
    return request({
      url: `/api/task/v2/starttask/${taskId}  `,
      method: 'post',
    })
  },
  keepStartTask: (taskId) => {
    return request({
      url: `/api/task/v2/keepstarttask/${taskId}`,
      method: 'post',
    })
  },

  recoveryTask:(taskId)=>{
    return request({
      url: `api/taskbak/recoveryTask/${taskId}`,
      method: 'get',
    })
  },

  backupTask:(taskId)=>{
    return request({
      url: `api/taskbak/backupTask/${taskId}`,
      method: 'get',
    })
  }


}
