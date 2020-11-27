
// const bb="213123"
// const cc="213123"
// const dd="213123"

// export const aa="123123";

// export {bb,cc}
// // export暴露方式
// // export 引入 import {xxx} from '文件’

// export default  dd

// // export default暴露方式;一个文件只能用一次
// // export default 引入： import xxx from '文件’
// //  import aa as bb from '文件’ 把 aa 重命名为 bb





interface DBI<T>{
    add(info:T):boolean;
    update(info:T):boolean;
    delate(id:number):boolean;
    get(id:number):any[];
    
}

export class MySqlDbM<T> implements DBI<T>{
    add(info: T): boolean {
        console.log(info)
        return true
    }
    update(info: T): boolean {
        console.log(info)
        return true
    }
    delate(id: number): boolean {
        console.log(id)
        return true
        
    }
    get(id:number): any[] {
        console.log(id)
        let list=[{
            id:1,
            name:'q23qweq'
        }]
        return list
    }

}

export class MgDbM<T> implements DBI<T>{
    add(info: T): boolean {
        console.log(info)
        return true
    }
    update(info: T): boolean {
        console.log(info)
        return true
    }
    delate(id: number): boolean {
        console.log(id)
        return true
        
    }
    get(id: number): any[] {
        console.log(id)
        let list=[{
            id:1,
            name:'q23qweq'
        }]
        return list
    }

}