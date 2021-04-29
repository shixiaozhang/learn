const next = require('next');
const Koa = require('koa');
const Router = require('koa-router')
// initialize nextjs instance and expose requese handler
const port = 5000
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handler = nextApp.getRequestHandler();

// (async () => {
//   try {
//     await nextApp.prepare();
//     const server = new Koa();
//     const router = new Router()
//     server.use(async (ctx, next) => {
//       await handler(ctx.req, ctx.res);
//       await next();
//     });
//     router.get('/news', async (ctx, next) => {
//       ctx.body = "新闻";
//     });

//     server.use(router.routes());
//     server.listen(port, (_) => console.log(`koa server listening on ${port}`));
//   } catch (e) {
//     console && console.error(e);
//   }
// })();

// 创建一个Koa对象表示web app本身:
// const app = new Koa();
// const router = new Router();


// router.get('/', ctx => {
//   ctx.body = "哈哈哈"
// })
// router.get('/news', ctx => {
//   ctx.body = "newsnewsnewsnews"
// })
// app.use(router.routes());

// app.listen(3000);
nextApp.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(async (ctx, next) => {
    await handler(ctx.req, ctx.res)
    // ctx.respond = false
    await next();
  })

  router.get("/news", async ctx => {
    console.log('aboutabout');
    ctx.body = "哈哈哈"
  });


  // router.get("*", async ctx => {
  //   await handle(ctx.req, ctx.res);
  //   ctx.respond = false;
  // });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });
  server.use(router.routes());
  server.listen(5000, () => {
    console.log('server is running at http://localhost:5000')
  })
})