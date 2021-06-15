import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {
    registerMicroApps,
    addGlobalUncaughtErrorHandler,
    start,
    initGlobalState
} from 'qiankun'

/**
     * registerMicroApps: 注册微应用的基础配置信息
     * addGlobalUncaughtErrorHandler: 微应用入口 - 通过该地址加载微应用
     * start: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
     * initGlobalState: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
     */

// 微应用注册信息
import apps from "./app";
const state = {}
const actions = initGlobalState(state)
actions.setGlobalState({
    globalToken: ""
})
registerMicroApps(apps, {
    beforeLoad: (app) => {
        // 加载微应用前，加载进度条
        console.log("before load", app.name);
        return Promise.resolve();

    },
    afterMount: (app) => {
        // 加载微应用前，进度条加载完成
        NProgress.done();
        console.log("after mount", app.name);
        return Promise.resolve();
    }
})

addGlobalUncaughtErrorHandler((event) => {
    console.log(event);
    const { message: msg } = event
    console.log(msg);
    if (msg && msg.includes("died in status LOADING_SOURCE_CODE")) {
        console.log("微应用加载失败，请检查应用是否可运行");
        console.log(msg);
    }
})

export default start
export {
    actions
}