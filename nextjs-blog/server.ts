import Koa from "koa";
import next from "next";
import Router from "koa-router";



const port = parseInt((process as any).env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })


  router.get("/about", async ctx => {
    await app.render(ctx.req, ctx.res, "/about", ctx.query);
    ctx.respond = false;
  });

  router.get("/profile", async ctx => {
    await app.render(ctx.req, ctx.res, "/profile", ctx.query);
    ctx.respond = false;
  });

  router.get("*", async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });
  server.use(router.routes());
  server.listen(5000, () => {
    console.log('server is running at http://localhost:5000')
  })
})