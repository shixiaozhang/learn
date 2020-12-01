<template>
    <div>
        <h1>我是全局组件</h1>
    </div>
</template>
<script>
import {inject} from 'vue'
export default {
    steup(){
        //  获取provide定义的值
console.log( inject("msg"),'获取provide定义的值');
    }
}
</script>