import {MgDbM,MySqlDbM} from '../modules/db'

class Article{
    id:number
    constructor(id:number){
        this.id=id
    }
}

var Mys=new MySqlDbM<Article>()
export {Article,Mys}