const {
    SyncHook
}=require('tapable')

// 初始化 同步hook
const hook=new SyncHook(['arg1','arg2','arg3'])
//绑定hook 事件
hook.tap('hook',(arg1,arg2,arg3)=>{
    console.log(arg1,arg2,arg3);
})
//同步出发 hook事件
hook.call(1,2,3);
