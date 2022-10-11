interface ImportMeta {
  readonly hot?: {
    readonly data: any; //缓存的数据
    accept(): void; //接受更新的回调
    accept(cb: (mod: any) => void): void;
    accept(dep: string, cb: (mod: any) => void): void;
    accept(deps: string[], cb: (mods: any[]) => void): void;
    prune(cb: () => void): void; //剔除 3.0 不存在
    dispose(cb: (data: any) => void): void; //一个接收自身的模块或一个期望被其他模块接收的模块可以使用 hot.dispose 来清除任何由其更新副本产生的持久副作用：在模块销毁前，执行
    decline(): void; //调用 decline() 表示此模块 不可 热更新，如果在传播 HMR 更新时遇到此模块，浏览器应该执行 完全 重新加载
    invalidate(): void; //重新加载页面
    on(event: string, cb: (...args: any[]) => void): void;
    send<T extends string>(event: T, data?: any): void;
  };
}
//! import.meta.hot.on('even',cb) 监听自定义 HMR 事件

// 以下 HMR 事件由 Vite 自动触发：
//? 'vite:beforeUpdate' 当更新即将被应用时（例如，一个模块将被替换）
//? 'vite:beforeFullReload' 当完整的重载即将发生时
//? 'vite:beforePrune' 当不再需要的模块即将被剔除时
//? 'vite:error' 当发生错误时（例如，语法错误）

//! hot.send(event, data)
// 发送自定义事件到 Vite 开发服务器。
// 如果在连接前调用，数据会先被缓存、等到连接建立好后再发送。
// // client side
// if (import.meta.hot) {
//   import.meta.hot.send('my:from-client', { msg: 'Hey!' })
// }

// 详情 on/send 使用见 文档 ：客户端与服务端间通信 https://cn.vitejs.dev/guide/api-plugin.html#filtering-include-exclude-pattern

let timer: number | undefined;
if (import.meta.hot) {
  if (!import.meta.hot.data.count) {
    import.meta.hot.data.count = 0;
  }
  import.meta.hot.dispose(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
}
export function initState() {
  const getAndIncCount = () => {
    console.log(import.meta.hot?.data);

    const data = import.meta.hot?.data || {
      count: 0,
    };
    console.log(data);
    data.count = data.count + 1;
    return data.count;
  };
  timer = setInterval(() => {
    let countEle = document.getElementById("count");
    countEle!.innerText = getAndIncCount() + "";
  }, 1000);
}

// export function initState() {
//   let count = 0;
//   setInterval(() => {
//     let countEle = document.getElementById("count");
//     countEle!.innerText = ++count + "";
//   }, 1000);
// }
