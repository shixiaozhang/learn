const state = {
    menuList: undefined,
}
const mutations = {
    SET_MENU_LIST: (state, result) => {
        state.menuList = result;
    },
}
const actions = {
    setMenuList({ commit, state }, menuSourceList) {
        commit('SET_MENU_LIST', menuSourceList)
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
