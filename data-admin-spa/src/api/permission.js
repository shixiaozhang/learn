import request from '@/utils/request'

export default {
  /* menu */
  getMenuList(query){
    return request({
      url: '/api/menu/pagelist',
      method: 'post',
      params: query
    })
  },

  saveMenuConfig(data){
    return request({
      url: '/api/menu/save',
      method: 'post',
      data: data
    })
  },

  getMenuTreeSelect(){
    return request({
      url: '/api/menu/listall',
      method: 'get',
    })
  },

  deleteMenu(id){
    return request({
      url: `/api/menu/delete/${id}`,
      method: 'delete',
    })
  }
}
