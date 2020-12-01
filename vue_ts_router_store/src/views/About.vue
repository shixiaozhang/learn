<template>
  <div class="about">
    <h1>{{ data.res }}</h1>
    <h1>{{ aa }}</h1>
    <h1 @click="change">add</h1>
    <h1>computed使用:{{ double }}</h1>
    <h1>computed使用:{{ three }}</h1>
    <component-a></component-a>
  </div>
</template>

<script>
import { ref } from "vue";
import { inject } from "vue";
import { computed } from "vue";
import { watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useGetData } from "./GetData";
// import {component} from "./component"

const componenta = {
  data: function () {
    return {
      count: 0,
    };
  },
  template:
    '<button v-on:click="count++">You clicked me {{ count }} times.</button>',
};

export default {
  name: "About",
  props: {
    name: String,
  },
  components: {
    "component-a": componenta,
  },
  setup(props, context) {
    const aa = ref("1111111111");
    console.log(props, context);
    const data = useGetData();
    const route = useRoute();
    console.log(route.query);
    //  获取provide定义的值,无法获取，只能子孙组件获取
    console.log(inject("msg"), "获取provide定义的值");
    const count = ref(0);
    const count2 = ref(10);
    const change = () => {
      count.value++;
      count2.value++;
    };

    // watch属性使用：

    // 单个
    watch(count, (newsVal, oldVal) => {
      console.log(newsVal, "新值");
      console.log(oldVal, "旧值");
    });
    // 多个
    watch([count, count2], ([newsVal, newsVal2], [oldVal, oldVal2]) => {
      console.log(newsVal, "新值");
      console.log(newsVal2, "新值2");

      console.log(oldVal, "旧值");
      console.log(oldVal2, "旧值2");
    });
    // watchEffect使用
    watchEffect(() => {
      console.log(count.value, "直接获取相关值");
    });
    // computed使用

    const double = computed(() => count2.value * 2);
    const three = computed({
      get: () => {
       return  count2.value * 3;
      },
      set: (number) => {
       return  count2.value=100 * number;
      },
    });
        three.value = 5
        console.log(count2.value)
    return { data, aa, count, change, double,three };
  },
};
</script>

<style>
</style>