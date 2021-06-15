## registerMicroApps(apps, lifeCycles?)
    apps - Array<RegistrableApp> - 必选，微应用的一些注册信息
    lifeCycles - LifeCycles - 可选，全局的微应用生命周期钩子


### RegistrableApp
    RegistrableApp:{
        * name: 微应用名称 - 具有唯一性
        * entry: 微应用入口 - 通过该地址加载微应用
        * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
        * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
    }
### LifeCycles

type Lifecycle = (app: RegistrableApp) => Promise<any>;

    * beforeLoad - Lifecycle | Array<Lifecycle> - 可选
    * beforeMount - Lifecycle | Array<Lifecycle> - 可选
    * afterMount - Lifecycle | Array<Lifecycle> - 可选
    * beforeUnmount - Lifecycle | Array<Lifecycle> - 可选
    * afterUnmount - Lifecycle | Array<Lifecycle> - 可选

## start(opts?)

Options:{
    prefetch :boolean | 'all' | string[] | (( apps: RegistrableApp[] ) => { criticalAppNames: string[]; minorAppsName: string[] })
     可选，是否开启预加载,默认为 true。
    sandbox :boolean | { strictStyleIsolation?: boolean, experimentalStyleIsolation?: boolean }可选，是否开启沙箱，默认为 true
    singular : boolean | ((app: RegistrableApp<any>) => Promise<boolean>); - 可选，是否为单实例场景，单实例指的是同一时间只会渲染一个微应用。默认为 true。
    fetch - Function - 可选，自定义的 fetch 方法。

    getPublicPath - (entry: Entry) => string - 可选，参数是微应用的 entry 值。

    getTemplate - (tpl: string) => string - 可选。

    excludeAssetFilter - (assetUrl: string) => boolean - 可选，指定部分特殊的动态加载的微应用资源（css/js) 不被 qiankun 劫持处理。

}

## setDefaultMountApp(appLink)--设置主应用启动后默认进入的微应用。
    setDefaultMountApp('/homeApp');
    appLink - string - 必选

## runAfterFirstMounted(effect)
第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本。

effect - () => void - 必选

runAfterFirstMounted(() => startMonitor());

##  loadMicroApp(app, configuration?) 手动加载一个微应用
用法

手动加载一个微应用。

如果需要能支持主应用手动 update 微应用，需要微应用 entry 再多导出一个 update 钩子：

    export async function mount(props) {
    renderApp(props);
    }

    // 增加 update 钩子以便主应用手动更新微应用
    export async function update(props) {
    renderPatch(props);
    }
示例


    import { loadMicroApp } from 'qiankun';
    import React from 'react';

    class App extends React.Component {
    containerRef = React.createRef();
    microApp = null;

    componentDidMount() {
        this.microApp = loadMicroApp({
        name: 'app1',
        entry: '//localhost:1234',
        container: this.containerRef.current,
        props: { brand: 'qiankun' },
        });
    }

    componentWillUnmount() {
        this.microApp.unmount();
    }

    componentDidUpdate() {
        this.microApp.update({ name: 'kuitos' });
    }

    render() {
        return <div ref={this.containerRef}></div>;
    }
    }

## prefetchApps(apps, importEntryOpts?)手动预加载指定的微应用静态资源。仅手动加载微应用场景需要，基于路由自动激活场景直接配置 prefetch 属性即可。

apps - AppMetadata[] - 必选 - 预加载的应用列表
importEntryOpts - 可选 - 加载配置

AppMetadata
    name - string - 必选 - 应用名
    entry - string | { scripts?: string[]; styles?: string[]; html?: string } - 必选，微应用的 entry 地址

import { prefetchApps } from 'qiankun';

prefetchApps([
  { name: 'app1', entry: '//locahost:7001' },
  { name: 'app2', entry: '//locahost:7002' },
]);



## 错误捕捉


## addGlobalUncaughtErrorHandler(handler) 添加全局的未捕获异常处理器。
addGlobalUncaughtErrorHandler((event) => console.log(event));

## removeGlobalUncaughtErrorHandler(handler) 移除全局的未捕获异常处理器。

removeGlobalUncaughtErrorHandler(handler);

## 全局通讯

## initGlobalState(state)

定义全局状态，并返回通信方法，建议在主应用使用，微应用通过 props 获取通信方法。

### initGlobalState(state)返回值MicroAppStateActions类型

MicroAppStateActions

    onGlobalStateChange: (callback: OnGlobalStateChangeCallback, fireImmediately?: boolean) => void， 在当前应用监听全局状态，有变更触发 callback，fireImmediately = true 立即触发 callback

    setGlobalState: (state: Record<string, any>) => boolean， 按一级属性设置全局状态，微应用中只能修改已存在的一级属性

    offGlobalStateChange: () => boolean，移除当前应用的状态监听，微应用 umount 时会默认调用

主应用：


    import { initGlobalState, MicroAppStateActions } from 'qiankun';

    // 初始化 state
    const actions: MicroAppStateActions = initGlobalState(state);

    actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
    });
    actions.setGlobalState(state);
    actions.offGlobalStateChange();

微应用：

    // 从生命周期 mount 中获取通信方法，使用方式和 master 一致
    export function mount(props) {
    props.onGlobalStateChange((state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        console.log(state, prev);
    });

    props.setGlobalState(state);
    }