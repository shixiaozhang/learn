<template>
    <div>
        inject传值:{{msg}}
    </div>
</template>
<script>
import {inject,ref} from 'vue'
export default {
  setup(){
      
      console.log(inject("msg"))
      const msg=ref(inject("msg"))
      return {
          msg
      }
  }  
}
</script>