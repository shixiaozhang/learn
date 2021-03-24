import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserMenu() {
  return request({
    url: '/api/menu/listallbyuser',
    method: 'get'
  })
}

export function  getUserRole () {
  return request({
    url: '/api/user/role',
    method: 'get'
  })
}

export default {
  getAllUserRoles: query => {
    return request({
      url: '/api/user/listAllRole',
      method: 'post',
      params: query
    })
  },
  createUser: user => {
    return request({
      url: '/api/user/createUser',
      method: 'post',
      params: user
    })
  },
  updateUser: user => {
    return request({
      url: '/api/user/updateUser',
      method: 'post',
      params: user
    })
  },
  listUser: name => {
    return request({
      url: '/api/user/listPage',
      method: 'post',
      params: name
    })
  },
  listAllUser: query => {
    return request({
      url: '/api/user/listAll',
      method: 'post',
      params: query
    })
  },
  deleteUser: form => {
    return request({
      url: '/api/user/delete',
      method: 'post',
      params: form
    })
  },
  resetPassword: user => {
    return request({
      url: '/api/user/resetPassword',
      method: 'post',
      params: user
    })
  },
  getUserTaskList: id => {
    return request({
      url: `/api/user/searchusertaskbyuserid/${id}`,
      method: 'get',
    })
  },
  migrateTask: (userId, targetId, taskIds) => {
    console.log({
      userId: userId, toId: targetId, taskIds: taskIds
    })
    return request({
      url: '/api/user/migrateTask ',
      method: 'post',
      data:
        { userId: userId, toId: targetId, taskIds: taskIds }
    })
  },

}
