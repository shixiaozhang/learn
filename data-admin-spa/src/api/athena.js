import request from '@/utils/request'

export default {
  athenaQuery: query => {
    return request({
      url: '/api/athena/query',
      method: 'post',
      data: query
    })
  },

  athenaQueryNew: query => {
    return request({
      url: '/api/athena/querynew',
      method: 'post',
      data: query
    })
  },


  getResultInterval(logId) {
    return request({
      url: `/api/athena/getresult?logId=${logId}`,
      method: 'get'
    })
  },
  getDatabases: query => {
    return request({
      url: '/api/athena/database/list',
      method: 'get',
      params: query
    })
  },
  getTables: query => {
    return request({
      url: '/api/athena/table/list',
      method: 'get',
      params: query
    })
  },
  createAthenaScheduleSql: scheduleSql => {
    return request({
      url: '/api/athena/createScheduleSql',
      method: 'post',
      data: scheduleSql
    })
  },
  searchScheduleSql: scheduleSqlQuery => {
    return request({
      url: '/api/athena/scheduleSql',
      method: 'post',
      params: scheduleSqlQuery
    })
  },
  deleteScheduleSql: sqlId => {
    return request({
      url: `/api/athena/deleteScheduleSql/${sqlId}`,
      method: 'delete',
    })
  },
  refreshScheduleSql: sqlId => {
    return request({
      url: `/api/athena/refresh`,
      method: 'post',
      params: { id: sqlId }
    })
  },
  searchSqlLog: logQuery => {
    return request({
      url: '/api/athena/history',
      method: 'post',
      params: logQuery
    })
  },
  retryLink: id => {
    return request({
      url: '/api/athena/retrygetdownloadurl',
      method: 'post',
      data: {
        athenaLogId: id
      }
    })
  },

  stopQuery: id => {
    return request({
      url: '/api/athena/stopathenaquery',
      method: 'post',
      data: {
        athenaLogId: id
      }
    })
  },

  getAthenaAnalysisData(query) {
    return request({
      url: '/api/athena/sqlcount',
      method: 'post',
      params: query
    })
  }
}
