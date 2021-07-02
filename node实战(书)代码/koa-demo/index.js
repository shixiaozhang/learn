const Koa = require('koa')
const userAgent = require("koa-useragent").userAgent
const Log = require("./log")
const app = new Koa()

const config={format:(text)=>{
    console.log(text);
    return `====${ text}=====`
}}
console.log(userAgent);
app.use(userAgent)
app.use(Log(config))
app.use(async (ctx, next) => {
    console.log(require("util").inspect(ctx.userAgent));
})

app.listen(3000)
