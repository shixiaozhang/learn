<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="'Welcome to Your Vue.js + TypeScript App'+data.src "/>
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { Options, Vue } from 'vue-class-component';
import { useGetData }  from './GetData'
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
setup(){

const data=useGetData()


  return {data}
}



}
</script>
