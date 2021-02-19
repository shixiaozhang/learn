<!--
 * @Author: your name
 * @Date: 2021-01-11 10:14:14
 * @LastEditTime: 2021-02-19 16:48:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpack-vue\src\App.vue
-->
<template>
  <div >
      <h1 class="example">{{ msg }}</h1>
  <img src="./assets/616945.png" alt="" srcset="">
  </div>
</template>

<script>
export default {
    name: "app",
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style lang='less'>
.example {
  color: red;
}
</style>