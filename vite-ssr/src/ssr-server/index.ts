// 后端服务
import fs from "fs";
import path from "path";
import React from "react";
import serveStatic from "serve-static";
import { ViteDevServer } from "vite";
import { renderToString } from "react-dom/server";
import express, { RequestHandler, Express } from "express";
import {
  cwd,
  fetchData,
  isProd,
  loadSsrEntryModule,
  matchPageUrl,
  resolveTemplatePath,
} from "./util";

//? 创建 ssr中间件

async function createSsrMiddleware(app: Express): Promise<RequestHandler> {
  let vite: ViteDevServer | null = null;
  //   开发环境
  if (!isProd) {
    vite = await (
      await import("vite")
    ).createServer({
      root: process.cwd(),
      server: {
        middlewareMode: "ssr",
      },
    });
    console.log("vite:ViteDevServer", vite.middlewares);
    /**
    * middlewares: Connect.Server;
    * 
    * 一个 connect 应用实例
    * - 可以用于将自定义中间件附加到开发服务器。
    * - 还可以用作自定义http服务器的处理函数。
      或作为中间件用于任何 connect 风格的 Node.js 框架。
    *
    * https://github.com/senchalabs/connect#use-middleware
   */
    // 注册 Vite Middlewares
    // 主要用来处理客户端资源
    app.use(vite.middlewares);
  }
  return async (req, res, next) => {
    try {
      const url = req.originalUrl;

      if (!matchPageUrl(url)) {
        // 走静态资源的处理
        return await next();
      }
      // SSR 的逻辑
      // 1. 加载服务端入口模块
      const { ServerEntry } = await loadSsrEntryModule(vite!);
      console.log("result", ServerEntry);

      // 2. 数据预取
      const data = await fetchData();

      // 3. 「核心」渲染组件
      // 组件渲染 -- 》 转成字符串
      const appHtml = renderToString(
        React.createElement(ServerEntry, { data })
      );
      // 4. 拼接 HTML，返回响应
      const templatePath = resolveTemplatePath();
      let template = await fs.readFileSync(templatePath, "utf-8");
      // 开发环境下需要注入 HMR 、环境变量相关代码， 因此需要调用 vite.transformIndexHtml
      if (!isProd && vite) {
        // 应用 Vite 内建 HTML 转换和任意插件 HTML 转换
        template = await vite.transformIndexHtml(url, template);
      }
      const html = template
        .replace("<!-- SSR_APP -->", appHtml)
        .replace(
          "<!-- SSR_DATA -->",
          `<script>window.__SSR_DATA__=${JSON.stringify(data)}</script>`
        );
      res.status(200).setHeader("Content-Type", "text/html").end(html);
    } catch (error: any) {
      vite?.ssrFixStacktrace(error);
      console.error(error);
      res.status(500).end(error.message);
    }
  };
}

async function createServer() {
  const app = express();

  // 加入 Vite SSR 中间件
  app.use(await createSsrMiddleware(app));

  // 注册中间件，生产环境端处理客户端资源
  if (isProd) {
    app.use(serveStatic(path.join(cwd, "dist/client")));
  }
  app.listen(3000, () => {
    console.log("Node 服务器已启动～");
    console.log("http://localhost:3000");
  });
}
createServer();
