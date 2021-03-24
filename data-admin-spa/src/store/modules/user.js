import { loginByUsername, getUserMenu,getUserRole } from '@/api/login'
import {
  getToken, setToken, removeToken,
  getRefreshToken, setRefreshToken, removeRefreshToken,
  getUsername, setUsername, removeUsername,
  getRole,setRole,removeRole
} from '@/utils/auth'
const user = {
  state: {
    token: getToken(),
    name: getUsername(),
    refreshToken: getRefreshToken(),
    role:getRole()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      state.refreshToken = refreshToken
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
  },

  actions: {
    // 登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          commit('SET_TOKEN', response.token);
          commit('SET_NAME', username);
          setUsername(username);
          setToken(response.token);
          setRefreshToken(response.refreshToken);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    //获取用户角色
    GetUserRole({commit}){
      return new Promise((resolve, reject) => {
        getUserRole().then(response => {
            commit('SET_ROLE', response);
            setRole(response);
            resolve()
          }
        ).catch(error => {
          reject(error)
        })
      })
    },

    //获取用户菜单
    GetUserMenuList({ commit }) {
      return new Promise((resolve, reject) => {
        getUserMenu().then(
          response => {
            resolve(response)
          }
        ).catch(error => {
          reject(error)
        })
      })
    },

    //后端登出
    SignOut() {

    },

    // 前端登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '');
        commit('SET_REFRESH_TOKEN', '')

        removeToken();
        removeUsername();
        removeRefreshToken();
        removeRole();

        sessionStorage.removeItem('searchContent');
        resolve()
      })
    }
  }
}

export default user
