import { MgD, UserInfo } from './model/user'
import {Article,Mys} from './model/article'
var u =new UserInfo({
    name: '123',
    pass: '123'
})

var addInfo=MgD.add(u)

var AA=Mys.get(1)
