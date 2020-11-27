<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App">
      <h1 class="red">slot测试</h1>
      <template #slot2="slotprops">
        <h1 class="red">slot2测试 {{ slotprops }}</h1>
      </template>
    </HelloWorld>

    <h1>{{ store.state.userName }}</h1>
  </div>
</template>
  <!--<script lang='ts'>  -->
<script >
import { ref, reactive, onMounted, computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter, useLink, useRoute } from "vue-router";
// import { Options, Vue } from "vue-class-component";
import { useGetData } from "./GetData";
import { Logins } from "../plugins/api";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

// @Options({
//   components: {
//     HelloWorld,
//   },

// })
// export default class Home extends Vue {
//    setup() {
//     const data = useGetData();
//     console.log(Logins.login({ user: "name" }));
//     console.log(data);
//     return { data };
//   }
// }
export default {
  name: "Home",
  props: {},
  components: {
    HelloWorld,
  },
  setup(props, context) {
    console.log(props, context);

    const data = useGetData();
    // -----------
    // getCurrentInstance 方法获取当前组件的实例，然后通过 ctx 属性获得当前上下文，
    // 这样我们就能在setup中使用router和vuex了
    const { ctx } = getCurrentInstance();
    console.log(ctx);
    //这样
    /*
    ctx.$router.push({
    path: '/about'
  })
    */
    //  vue3中router调用新方式
    /**
     * router 为VueRouter的实例，相当于一个全局的路由器对象，里面含有很多属性和子对象
     * route  相当于当前正在跳转的路由对象;
     */
    const router = useRouter();
    setTimeout(() => {
      router.push({ path: "/about", query: { user: "小张在跳转" } });
    }, 5000);
    //  vue3中store调用新方式
    const store = useStore();

    store.commit("edit", "jack");
    store.dispatch("aEdit", "jack2");

    console.log(Logins.login({ user: "name" }));

    console.log(data);

    return { data, store };
  },
};
</script>
<style lang="less" scoped>
.red {
  background: red;
  color: #fff;
}
</style>