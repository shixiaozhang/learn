import path from "path";
import { ViteDevServer } from "vite";

export const isProd = process.env.NODE_ENV === "production";

export const cwd = process.cwd();

// 加载服务端入口模块
export async function loadSsrEntryModule(vite: ViteDevServer | null) {
  if (isProd) {
    // 生产环境下 通过直接引入 dist目录下的server 入口文件
    const entryPath = path.join(cwd, "dist/server/entry-server.js");
    return import(entryPath);
  } else {
    // 开发环境下通过 no-bundle 加载
    const entryPath = path.join(cwd, "src/entry-server.tsx");
    return vite!.ssrLoadModule(entryPath);
  }
}

//数据预取

export async function fetchData() {
  return { user: "xxx" };
}
// HTML 拼接的逻辑
export function resolveTemplatePath() {
  return isProd
    ? path.join(cwd, "dist/client/index.html")
    : path.join(cwd, "index.html");
}

// 过滤出页面请求
export function matchPageUrl(url: string) {
  if (url === "/") {
    return true;
  }
  return false;
}
