<!--
 * @Author: your name
 * @Date: 2021-01-11 14:22:45
 * @LastEditTime: 2021-01-11 15:28:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\vue2.0相关\vue2.x笔记.md
-->
# vue 实例化vue的方式和区别：

Vue 的$mount()为手动挂载，在项目中可用于延时挂载（例如在挂载之前要进行一些其他操作、判断等），之后要手动挂载上。new Vue时，el和$mount并没有本质上的不同。

## 1.el：

        new Vue({
            el: '#app',
            data: obj
        })
        //或
        new Vue({
            el: '#app',
            store,
            router,
            template: '<App/>',
            components: { App }
        })
         //或                                       
        new Vue({
            el: '#app',
            store,
            router,
            render: h => h(App),
        });


## 2.$mount   :

    如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
    如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
    这个方法返回实例自身，因而可以链式调用其它实例方法

        const app = new Vue({
            router,
            i18n,
            ...App
        }).$mount('#app')
        //或 
        const app=new Vue({
                    router,
                    i18n,
                    render:h=>h(App)
                }).$mount('#app')



    // 创建并挂载到 #app (会替换 #app)
    new MyComponent().$mount('#app')

    // 同上
    new MyComponent({ el: '#app' })

    // 或者，在文档之外渲染并且随后挂载
    var component = new MyComponent().$mount()
    document.getElementById('app').appendChild(component.$el)


# vue3 挂载：

        import { createApp } from 'vue'
        import App from './App.vue'
        import router from './router'
        import store from './store'


        const app=createApp(App)

        app.use(router).use(store).mount('#app')


        Vue 3 的 Template 支持多个根标签，Vue 2 不支持
        
        Vue 3 有 createApp()，而 Vue 2 的是 new Vue()
        
        createApp(组件)，new Vue({template, render})
