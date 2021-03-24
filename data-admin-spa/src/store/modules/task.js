const state = {
    triggerTaskList: [],
}
const mutations = {
    SET_TRIGGER_TASK_LIST: (state, result) => {
        state.triggerTaskList = result;
    },
}
const actions = {
    setTriggerTaskList({ commit, state }, triggerTaskList) {
        commit('SET_TRIGGER_TASK_LIST', triggerTaskList)
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
