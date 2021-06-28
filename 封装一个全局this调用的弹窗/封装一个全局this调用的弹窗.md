import Vue from 'vue'
import component from 'component'
## Vue.extend ：使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')

## install
Vue.use( plugin )
参数：

{Object | Function} plugin
用法：

安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

该方法需要在调用 new Vue() 之前被调用。

当 install 方法被同一个插件多次调用，插件将只会被安装一次。



## 实现1

const openDialog = ({ component, params }) => {
    return new Promise(resolve => {
        const Profile = Vue.extend({
            ...component
        })
        const instance = new Profile({ propsData: params }).$mount();
        (params.parentNode || document.body).appendChild(instance.$el);
        instance.$on("close", value => {
            instance.$el.remove();
            instance.$destroy(); 
            resolve(value);
        });
    })
};
export default {
    install(vue) {
        vue.prototype.$openDialog = openDialog;
    }
}

## 实现2

const openDialog = ({ component, params }) => {
    return new Promise(resolve => {
        const Profile = Vue.extend({
            store,
            render:h=>h(component,{
                props:params,
                on:{
                    "close":(value)=>{
                        instance.$el.remove();
                        instance.$destroy();
                        resolve(value)
                    }
                }
            })
        })
        const instance = new Profile({ propsData: params }).$mount();
        (params.parentNode || document.body).appendChild(instance.$el);
    })
};
export default {
    install(vue) {
        vue.prototype.$openDialog = openDialog;
    }
}