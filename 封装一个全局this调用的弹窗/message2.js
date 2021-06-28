
import Vue from 'vue'
import component from 'component'

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
// ? 调用

this.$openDialog({
    component:Message,
    params:{
        messageData:'12312',
        userId:'21',
        title:'1212',
        forwardMessageId:'12313'
    }
})