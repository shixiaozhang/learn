import express, { RequestHandler, Express } from 'express'
import path from 'path'
import { ViteDevServer } from 'vite'
const isProd = process.env.NODE_ENV === 'production'
const cwd = process.cwd()

// 加载服务端入口模块
async function loadSsrEntryModule(vite: ViteDevServer | null) {
  // 生产模式下直接require 打包后的产物
  if (isProd) {
    const entryPath = path.join(cwd, 'dist/server/entry-server.js')
    return require(entryPath)
  } else {
    // 开发环境下通过 no-bundle 方式加载
    const entryPath = path.join(cwd, 'src/entry-server.tsx')
    return vite!.ssrLoadModule(entryPath)
  }
}

// 创建ssr中间件
async function createSsrMiddleware(app: Express): Promise<RequestHandler> {
  let vite: ViteDevServer | null = null
  if (isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root: process.cwd(),
      server: {
        middlewareMode: 'ssr',
      },
    })
    // 注册 vite middlewares
    // 主要用来处理客户端资源
    app.use(vite.middlewares)
  }
  return async (req, res, next) => {
    // SSR 的逻辑
    // 1. 加载服务端入口模块
    // 2.数据预取
    // 3. 「核心」渲染组件
    // 4.拼接HTMl 返回响应
  }
}

async function createServeer() {
  const app = express()
  // 加入 Vite SSR 中间件
  app.use(await createSsrMiddleware(app))
  app.listen(3000, () => {
    console.log('Node 服务器已启动～')
    console.log('http://localhost:3000')
  })
}
createServeer()
