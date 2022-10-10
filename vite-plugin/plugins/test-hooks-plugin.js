// 注: 请求响应阶段的钩子
// 如 resolveId, load, transform, transformIndexHtml在下文介绍
// 以下为服务启动和关闭的钩子
export default function testHookPlugin() {
  return {
    name: "test-hooks-plugin",
    // vite 独有钩子
    config(config, env) {
      // async, sequential
      // Vite 在读取完配置文件（即vite.config.ts）之后，会拿到用户导出的配置对象，
      // 然后执行 config 钩子。在这个钩子里面，你可以对配置文件导出的对象进行自定义的操作
      // env: { mode: string, command: string }
      console.log(`config: ${config}`);
      // 返回部分修改或新增的配置（推荐）或者 直接改变配置（如果默认的合并不能达到预期的结果）
      if (env.command === "buzhixing") {
        config.root = "foo";
      }
      return {
        alias: {
          vue: require.resolve("vue"), //例子（会报错）
        },
      };
    },
    // vite 独有钩子
    configResolved(resolveConfig) {
      // async, parallel
      // 获取到最终的配置对象
      console.log(`resolveConfig: ${resolveConfig}`);
    },
    // 通用钩子
    options(opts) {
      // async, sequential;
      console.log(`options : ${opts}`);
      return opts;
    },
    // vite 独有钩子
    configureServer(server) {
      // async, sequential
      // 入参是 server 对象 是用于配置开发服务器的钩子
      console.log(`configureServer : ${server}`);
      // 在 Vite 内置中间件之前执行
      server.middlewares.use((req, res, next) => {
        console.log("前置server中间件！");
        // 自定义请求处理...
      });
      setTimeout(() => {
        // 手动退出进程
        process.kill(process.pid, "SIGTERM");
      }, 3000);
      // 返回一个在内部中间件安装后
      // 被调用的后置钩子
      return () => {
        server.middlewares.use((req, res, next) => {
          console.log("后置server中间件！");
          // 自定义请求处理...
        });
      };
    },
    transformIndexHtml(html) {
      // async, sequential
      // 转换 index.html 的专用钩子。钩子接收当前的 HTML 字符串和转换上下文。上下文在开发期间暴露ViteDevServer实例，在构建期间暴露 Rollup 输出的包
      //? 可以返回的类型
      // 1、经过转换的 HTML 字符串
      // 2、注入到现有 HTML 中的标签描述符对象数组（{ tag, attrs, children }）。每个标签也可以指定它应该被注入到哪里（默认是在 <head> 之前）
      // 3、一个包含 { html, tags } 的对象
      return html.replace(
        /<title>(.*?)<\/title>/,
        `<title>Title replaced!</title>`
      );
      return {
        html,
        // 注入标签
        tags: [
          {
            // 放到 body 末尾，可取值还有`head`|`head-prepend`|`body-prepend`，顾名思义
            injectTo: "body",
            // 标签属性定义
            attrs: { type: "module", src: "./index.ts" },
            // 标签名
            tag: "script",
          },
        ],
      };
    },
    async handleHotUpdate(ctx) {
      // 需要热更的文件
      console.log(ctx.file);
      // 需要热更的模块，如一个 Vue 单文件会涉及多个模块
      console.log(ctx.modules);
      // 时间戳
      console.log(ctx.timestamp);
      // Vite Dev Server 实例
      console.log(ctx.server);
      // 读取最新的文件内容
      console.log(await ctx.read());
      // 自行处理 HMR 事件
      // 执行自定义 HMR 更新处理
      ctx.server.ws.send({
        type: "custom",
        event: "special-update",
        data: {},
      });
      // 配合使用：客户端代码
      // if (import.meta.hot) {
      //   import.meta.hot.on("special-update", (data) => {
      //     // 执行自定义更新
      //   });
      // }
      return [];
    },
    // 通用钩子
    buildStart() {
      console.log(`buildStart`);
    },
    // 通用钩子
    buildEnd() {
      console.log("buildEnd");
    },
    // 通用钩子
    closeBundle() {
      console.log("closeBundle");
    },
  };
}
