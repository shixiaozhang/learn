import bunyan from "bunyan";
import Koa from "koa";
import koaBunyanLogger from "koa-bunyan-logger";
import Router from "koa-router";
import next from "next";

const port = parseInt((process as any).env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  const server = new Koa()
  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
 
  server.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
  })
})