import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
/**
 * hash模式
 * 
   import { createRouter, createWebHashHistory } from 'vue-router';
    const router = createRouter({
      history: createWebHashHistory(),
      routes
    });


  * history模式

  import { createRouter, createWebHistory} from 'vue-router';
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  });



 * 
 */
/**
 * 
 * 路由跳转
 * 方式1
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    function goto(){
      router.push("/about");
    }
    return{
       goto  //一定要要放在return里才能在模板上面使用
    }
  }
}

方式2
import router from "../../router/index.js";
router.push("/");
 * 
 * 
 * 
 * 
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
/**
 * hash模式：不刷新页面 带 #
 * history 模式： 不带#
 * 
 * 
 */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
