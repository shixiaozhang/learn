<template>
  <div class="about" >
    <h1>{{ data.res }}</h1>
    <h1>{{ aa }}</h1>
    <component-a></component-a>
  </div>
</template>

<script>
import { ref } from "vue";
import {useRoute} from 'vue-router'
import {useGetData} from './GetData'
// import {component} from "./component"

const componenta = {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
}




export default {
  name: "About",
  props: {
    name: String,
  },
 components:{
   "component-a":componenta
 },
  setup(props, context) {
    const aa=ref('1111111111')
    console.log(props, context);
    const data = useGetData();
    const route=useRoute()
    console.log(route.query)


    return {data,aa};
  },
};

</script>

<style>
</style>