<template>
  <div class="about">
    <h1>{{ data.res }}</h1>
    <h1>{{ aa }}</h1>
  </div>
</template>

<script>
import { ref, } from "vue";
import {useGetData} from './GetData'
import {useRoute} from 'vue-router'
import router from '../router';
export default {
  name: "About",
  props: {
    name: String,
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