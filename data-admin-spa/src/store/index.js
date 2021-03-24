import user from './modules/user'
import getters from './getters'
import menu from './modules/menu'
import app from './modules/app'
import task from './modules/task';
import athena from './modules/athena';
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    menu,
    app,
    task,
    athena
  },
  getters
})

export default store
