import Cookies from 'js-cookie'
const ORIGINAL_THEME = "#409EFF"; // default color

const state = {
    taskSearchName: '',
    dppPrimaryColor:localStorage.getItem('themeColor')||ORIGINAL_THEME,
    versionNotify: Cookies.get('SET_VERSION_NOTIFY') || false, //if user have already read version update
    taskStatus:JSON.parse(localStorage.getItem('taskStatus'))
}
const mutations = {
    SET_TASK_SEARCH_NAME: (state, result) => {
        state.taskSearchName = result;
    },
    SET_DPP_COLOR: (state, result) => {
        state.dppPrimaryColor = result;
    },
    SET_VERSION_NOTIFY: (state, result) => {
        state.versionNotify = result;
    },
    SET_TASK_STATUS:(state, result) => {
        state.taskStatus = result;
    },
}
const actions = {
    //菜单栏全局搜索任务名称
    setTaskSearchName({ commit, state }, taskName) {
        if (sessionStorage.getItem('searchContent')) {
            let cacheSearch = JSON.parse(sessionStorage.getItem('searchContent'));
            cacheSearch.search_tag = taskName;
            sessionStorage.setItem('searchContent', JSON.stringify(cacheSearch));
        }
        commit('SET_TASK_SEARCH_NAME', taskName);
    },
    setPrimaryColor({ commit, state }, color) {
        localStorage.setItem('dppPrimaryColor', color);
        commit('SET_DPP_COLOR', color);
    },
    setVersionNotify({ commit, state }, readed) {
        Cookies.set('SET_VERSION_NOTIFY', readed, { expires: 10 });
        commit('SET_VERSION_NOTIFY', readed);
    },
    setTaskStatus({ commit, state }, statusList) {
        localStorage.setItem('taskStatus',JSON.stringify(statusList));
        commit('SET_TASK_STATUS', statusList);
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
