/*
 * @Author: your name
 * @Date: 2021-01-23 15:30:53
 * @LastEditTime: 2021-01-23 17:24:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\egg-example\app\service\news.js
 */
const Service=require('egg').Service
class NewService extends Service{
    async list(page=1){
        const {serverUrl,pageSize}=this.config.news;
        const {data:idList}=await this.ctx.curl(`${serverUrl}/topstories.json`,{
            data:{
                orderBy:'"$key"',
                startAt:`"${pageSize*(page -1 )}"`,
                endAt:`${pageSize* page - 1}`

            },
            dataType:'json'
            
        })
        const newsList = await Promise.all(
            Object.keys(idList).map(key=>{
                const url=  `${serverUrl}/item/${idList[key]}.json`;
                return this.ctx.curl(url,{dataType:'json'})
            })
        )
        return newsList.map(res=>res.data)
    }
}

module.exports=NewService;