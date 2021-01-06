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
    <my-component-name></my-component-name>
    <ChildComp :name="nameChild" @change-name="changeName" />
  </div>
</template>
  <!--<script lang='ts'>  -->
<script >
import {
  ref,
  toRef,
  toRefs,
  reactive,
  onMounted,
  computed,
  getCurrentInstance,
} from "vue";
import { provide } from "vue"; //provide和inject 在子孙组件中传值
import { useStore } from "vuex";
import { useRouter, useLink, useRoute } from "vue-router";
import { useGetData } from "./GetData";
import { Logins } from "../plugins/api";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import ChildComp from "@/components/childComp.vue"; // @ is an alias to /src
import axios from "axios";
/**
 * ref 主要把基本类型数据改为动态；一般用在简单的值一层；
 * 
 * reactive 主要是引用数据类型改为动态；一般用在复杂的值多层嵌套；
 * toRef 将某一个值转为 ref类型的值
 * 用法
 * 
 *  let obj = { name: "syl" };    //stateToref===obj.name
    let stateToref = toRef(obj, "name");
    let obj = reactive({ name: "syl", age: "123" });
    let stateToref = toRef(obj, "name"); // 将name拿出来

  //修改stateToref.value 或 obj.name;都可以修改name的值，但是页面不更新stateToref 
  // `toRef` 是对原数据的一个引用，会影响到原始值。
  // 其中，如果你使用toref，但是视图并不会发生改变
   // ref相对于用起来方便

  // ---------------
  // toRefs用法：可以把一个对象之类的值，解构并且保持他的响应性
  function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })
  // 返回时转换为ref
  return toRefs(state)
  }
export default {
  setup() {
    // 可以在不失去响应性的情况下破坏结构
    const { foo, bar } = useFeatureX()

    return {
      foo,
      bar
    }
  }
}
 */
// import { Options, Vue } from "vue-class-component";

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
    ChildComp,
  },
  setup(props, context) {
    console.log(props, context);
    const nameChild = ref("我是要传给子组件的数据");
    const data = useGetData();
    // -----------
    // getCurrentInstance 方法获取当前组件的实例，然后通过 ctx 属性获得当前上下文，
    // 这样我们就能在setup中使用ctx.$router和ctx.$store
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
    }, 15000);
    
    //  vue3中store调用新方式
    const store = useStore();
    store.commit("edit", "jack");
    store.dispatch("aEdit", "jack2");
    // 测试封装的接口
    Logins.login({ name: 11 })
      .then((res) => {
        console.log("-------1---------");
        console.log(res);
      })
      .catch((err) => {
        console.log("-------2---------");
        console.log(err);
      });
    console.log(data);

    // 封装的接口的返回值
    const post = (api, params) => {
      // return 才能接then和catch
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: api,
          data: params,
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    post("login", { name: "小张" }).catch((err) => {
      console.log(err);
    });
    // 子孙组件传值

    const msg = ref("子孙组件的传值");
    const state = reactive({
      testMsg: "测试往下透传一个数据",
      testMsg2: "透传一个静态",
    });

    const changeTest = () => {
      state.testMsg = "修改了数据";
      msg.value++;
    };

    provide("testMsg", toRef(state, "testMsg"));
    provide("testMsg2", state.testMsg2);
    provide("msg", msg);
    // 子组件触发父组件事件
    const changeName = () => {
      nameChild.value = "我是修改过的父组件的传参";
    };
    return {
      nameChild,
      data,
      store,
      ...toRefs(state),
      changeTest,
      msg,
      changeName,
    };
  },
};
</script>
<style lang="less" scoped>
.red {
  background: red;
  color: #fff;
}
</style>