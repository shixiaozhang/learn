import {MgDbM,MySqlDbM} from '../modules/db'


class UserInfo{
    name:string | undefined;
    pass:string  | undefined;
    constructor(params:{
        name:string,
        pass:string
    }){
        this.name=params.name;
        this.pass=params.pass
    }

}

var MgD=new MgDbM<UserInfo>()

export {UserInfo,MgD}