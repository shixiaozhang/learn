<template>
  <div class="about">
    <h1>{{ data.res }}</h1>
    <h1>{{ aa }}</h1>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import {useGetData} from './GetData'
export default {
  name: "About",
  props: {
    name: String,
  },
  setup(props, context) {
    const aa=ref('1111111111')
    console.log(props, context);
    const data = useGetData();
    return {data,aa};
  },
};

</script>

<style>
</style>