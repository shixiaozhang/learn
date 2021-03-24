import request from '@/utils/request'

export default {
  saveServiceConfig: config => {
    return request({
      url: '/api/config/serviceConfig/save',
      method: 'post',
      data: config,
      headers: { 'Content-Type': 'application/json' }
    })
  },

  getEMRServiceList: params => {
    return request({
      url: '/api/config/emrServiceConfig/list',
      method: 'post',
      params: params
    })
  },

  addEMRService: (params) => {
    return request({
      url: '/api/config/emrServiceConfig/start',
      method: 'post',
      data: params
    })
  },

  stopEMRService:(params)=>{
    return request({
      url: '/api/config/emrServiceConfig/stop',
      method: 'post',
      params: params
    })
  },

  //service config

  getECSTypeList() {
    return request({
      url: '/api/common/serivceType/list',
      method: 'get',
    })
  },

  checkServiceIsLast(model){
    return request({
      url:'/api/process/config/image/checklast',
      method:'get',
      params:model
    })
  },

  checkServiceIsChanged(model){
     return request({
       url:'/api/process/config/image/checkchanged',
       method:'get',
       params:model
     })
  },

  getServiceK8sNameItem(model){
    return request({
      url:'/api/process/config/image/querycurrentimage',
      method:'get',
      params:model
    })
  },
   
  getTaskProfileList: (launchType) => {
    return request({
      url: '/api/config/service/profile/list',
      method: 'post',
      params: {
        launch_type: launchType
      }
    })
  },
  saveAutoScalingConfig: config => {
    return request({
      url: '/api/config/autoScalingConfig/save',
      method: 'post',
      data: config,
      headers: { 'Content-Type': 'application/json' }
    })
  },

  searchServiceConfig: query => {
    return request({
      url: '/api/config/serviceConfig/list',
      method: 'post',
      data: {
        query:query
      }
    })
  },
  searchServiceCluster: (launchType) => {
    return request({
      url: '/api/config/service/cluster/list',
      method: 'post',
      params: {
        launch_type: launchType
      }
    })
  },
  searchTaskDefine: (launchType) => {
    return request({
      url: '/api/config/service/taskDefine/list',
      method: 'post',
      params: {
        launch_type: launchType
      }
    })
  },
  searchTaskDefineInfo: query => {
    return request({
      url: '/api/config/service/taskDefine/info',
      method: 'post',
      params: query
    })
  },
  describeSubnet: query => {
    return request({
      url: '/api/config/service/subnet/description',
      method: 'post',
      params: query
    })
  },
  listAwsAutoScaling: (query) => {
    return request({
      url: '/api/config/service/awsautoScaling/list',
      method: 'post',
      params:query
    })
  },
  stopServiceConfig: id => {
    return request({
      url: '/api/config/serviceConfig/stopTask',
      method: 'post',
      data: id,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  searchAutoScalingConfig: query => {
    return request({
      url: '/api/config/autoScalingConfig/list',
      method: 'post',
      params: query
    })
  },
  getServiceNames: query => {
    return request({
      url: '/api/config/autoScalingConfig/getServiceNames',
      method: 'post',
      params: query
    })
  },
  listAllAutoScalingConfig: query => {
    return request({
      url: '/api/config/autoScalingConfig/listAll',
      method: 'post',
      params: query
    })
  },
  searchHandlerConfig: query => {
    return request({
      url: '/api/handler/pageList',
      method: 'post',
      params: query
    })
  },
  saveHandlerConfig: config => {
    return request({
      url: '/api/handler/save',
      method: 'post',
      data: config,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  listAllHandlerType: query => {
    return request({
      url: '/api/config/handlerConfigType/listAll',
      method: 'post',
      params: query
    })
  },
  saveDetectConfig: config => {
    return request({
      url: '/api/quartz/savedetectconfig',
      method: 'post',
      data: config,
    })
  },
  searchDetectConfig: data => {
    return request({
      url: '/api/quartz/pagelist',
      method: 'post',
      data: data
    })
  },
  getDetectTimeFotmat:data=>{
    return request({
      url: '/api/quartz/getAboutRunDetail',
      method: 'get',
      params: data
    })
  },
  pauseJob: (data) => {
    return request({
      url: '/api/quartz/pausejob',
      method: 'post',
      data: data
    })
  },
  resumeJob: (data) => {
    return request({
      url: '/api/quartz/resumejob',
      method: 'post',
      data: data
    })
  },

  saveContextKeys: contextKeys => {
    return request({
      url: '/api/contextKeys/save',
      method: 'post',
      data: contextKeys,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  searchContextKeys: query => {
    return request({
      url: '/api/contextKeys/pageList',
      method: 'post',
      params: query
    })
  },
  listAllContextKeys: query => {
    return request({
      url: '/api/contextKeys/listAll',
      method: 'post',
      params: query
    })
  },
  listServiceConfigByType: type => {
    return request({
      url: '/api/config/serviceConfig/listByType',
      method: 'post',
      params: type
    })
  },
  getAllServiceConfig: () => {
    return request({
      url: '/api/config/serviceConfig/listAll',
      method: 'post',
    })
  },
  getEcsRunningTasks: query => {
    return request({
      url: '/api/config/getEcsRunningTask/list',
      method: 'post',
      params: query
    })
  },
  getEcsStoppedTask: query => {
    return request({
      url: '/api/config/getEcsStoppedTask/list',
      method: 'post',
      params: query
    })
  },
  getConfigServices: query => {
    return request({
      url: '/api/config/getServiceConfig/listByScalingId',
      method: 'post',
      params: query
    })
  },
  stopServiceConfigByTaskId: id => {
    return request({
      url: '/api/config/serviceConfig/stopTaskByTaskId',
      method: 'post',
      data: id,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  deleteHandler: query => {
    return request({
      url: '/api/handler/delete',
      method: 'post',
      params: query
    })
  },
  deleteDetectConfig: query => {
    return request({
      url: '/api/config/detectConfig/delete',
      method: 'post',
      params: query
    })
  },
  deleteContextKeys: query => {
    return request({
      url: '/api/contextKeys/delete',
      method: 'post',
      params: query
    })
  },
  deleteServiceConfig: query => {
    return request({
      url: '/api/config/serviceConfig/delete',
      method: 'post',
      params: query
    })
  },
  searchVersionControl: query => {
    return request({
      url: '/api/config/versionControl/list',
      method: 'post',
      params: query
    })
  },
  deleteVersionControl: query => {
    return request({
      url: '/api/config/versionControl/delete',
      method: 'post',
      params: query
    })
  },
  saveVersionControl: versionControl => {
    return request({
      url: '/api/config/versionControl/save',
      method: 'post',
      data: versionControl,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  getLastVersionControl: () => {
    return request({
      url: '/api/config/versionControl/lastOne',
      method: 'post'
    })
  },
  getHomeIframeLinks:()=>{
   return request({
     url:'api/common/dashboard/list',
     method:'get'
   })
  },
  getApproximateCount: (params) => {
    return request({
      url: `/api/config/service/cluster/approximateCount`,
      method: 'get',
      params: params
    })
  }
}
