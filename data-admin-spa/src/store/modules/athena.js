const state = {
    metadata: undefined || localStorage.getItem('athenaMetadata'),
}
const mutations = {
    SET_METADATA: (state, result) => {
        state.metadata = result;
    },
}
const actions = {
    setAthenaMetadata({ commit, state }, result) {
        if (!result) { localStorage.removeItem('athenaMetadata') };
        localStorage.setItem('athenaMetadata', JSON.stringify(result));
        commit('SET_METADATA', JSON.stringify(result));
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
