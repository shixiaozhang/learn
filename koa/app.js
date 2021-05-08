const Koa=require('koa')
const app=new Koa();
app.proxy=true
app.use(ctx=>{
    ctx.body='hello'
})
app.listen(3000,() => {
    console.log('server is running at http://localhost:3000')
  })