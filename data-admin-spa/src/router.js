import { getToken } from '@/utils/auth'
import store from '@/store'
import constant from "@/shared/config/router-source";

Vue.use(VueRouter)

let routesConfig = constant.ROUTER_SOURCE_CONFIG;
let router = new VueRouter({
  routes: routesConfig
})

const judgeCanActivate = (source, current) => {
  let flatMenuList = [];

  const treeToList = (tree) => {
    var queen = [];
    var out = [];
    queen = queen.concat(tree);
    while (queen.length) {
      var first = queen.shift();
      if (first.children && first.children.length) {
        queen = queen.concat(first.children)
        delete first['children'];
      }
      out.push(first);
    }
    return out;
  }

  flatMenuList = treeToList(_.cloneDeep(source));
  flatMenuList = flatMenuList.filter(data => {
    return data.type === 1 && data.route;
  })
  let currentRoutePath = current.split('/');
  const activeMenu = flatMenuList.find(
    (fm) => {
      return fm.route === currentRoutePath[currentRoutePath.length - 1];
    }
  )
  return activeMenu ? true : false;
};

router.beforeEach((to, from, next) => {
  if (to.path.includes('/auth')) {
    if (getToken()) {
      next('/dashboard')
    } else {
      next()
    }
  } else if (to.path === '/401' || to.path === '/404' || to.path.includes('others')) {
    next()
  } else if (!getToken()) {
    next('/auth')
  } else {
    const handleAuth = (source, current) => {
      if (judgeCanActivate(source, current)) {
        next();
      } else {
        next('/401')
      }
    }

    if (!store.state.user.role) {
      store.dispatch('GetUserRole').then(
        response => {
        }
      )
    }

    if (store.state.menu.menuList) {
      handleAuth(store.state.menu.menuList, to.path);
    } else {
      store.dispatch('GetUserMenuList').then((userMenuSource) => {
        store.dispatch('menu/setMenuList', userMenuSource);//初始化菜单栏
        handleAuth(userMenuSource, to.path);
      })
    }

  }
})
export default router;
