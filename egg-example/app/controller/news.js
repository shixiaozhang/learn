/*
 * @Author: your name
 * @Date: 2021-01-23 15:15:38
 * @LastEditTime: 2021-01-23 17:25:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\egg-example\app\controller\news.js
 */
const Controller = require('egg').Controller;

class NewsController extends Controller {
    async list() {
        const ctx = this.ctx;
        const page = ctx.query.page || 1;
        const newsList = await ctx.service.news.list(page);
        await ctx.render('news/list.tpl', { list: newsList });
    }
}


module.exports = NewsController
