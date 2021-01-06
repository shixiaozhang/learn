<template>
    <div>
        inject传值:{{msg}}
        <h1>父组件传值：{{name}}</h1>
        <h1 @click="changeParent">触发父组件的自定义事件</h1>
    </div>
</template>
<script>
import {inject,ref} from 'vue'
export default {
    props:{
        name:{
            type:String,
            default:function(){
                return "我是默认值"
            },
            // validator:function(value){
            //     console.log(typeof value);
            //         return String==(typeof value)
            // }
        }
    },
    emits:["change-name"],
  setup(props,context){
      console.log( context.emit,11111111111111);
      console.log(inject("msg"))
      const msg=ref(inject("msg"))
    
      const changeParent=()=>{
            context.emit('change-name')
      }
      return {
          msg,
          changeParent
      }
  }  
}
</script>