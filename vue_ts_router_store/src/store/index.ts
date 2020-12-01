import { createStore } from 'vuex'

export default createStore({
  // 增删state中的成员
  // Vue.set(state,"age",15)
  // Vue.delete(state,'age')
  state: {
    //存放的键值对就是所要管理的状态
    userName: "小张"
  },
  mutations: {//加工state成员给外界 ,存储修改方法

    edit(state, payload) {
      // 调用 1、  store.commit('edit'，payload) 2、this.$store.commit({type:'edit',payload：{}})
      state.userName = payload
    }

  },
  actions: {//异步操作
    // 调用 store.dispatch('aEdit',{age:15})
    aEdit(context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('edit', payload)
          resolve()
        }, 2000)
      })

    }

  },
  modules: {//模块化状态管理
    // 调用 store.state.a.xxx
    a: {
      state: {},
      getters:{//第三个参数是根节点状态
        getKeyCount(state,getter,rootState){
            return  ""
        }
    },
    }
  }
})
/*
调用周期
component---dispatch---> actions  ----commit ----> mutations--->state





*/