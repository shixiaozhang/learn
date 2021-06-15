import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import start from '@/micros'
createApp(App).use(store).use(router).mount('#app')
start()