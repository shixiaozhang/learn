import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Allcompent from '@/components/Allcompent.vue'

const app=createApp(App)

app.component('my-component-name', Allcompent)
  app.use(router).use(store).mount('#app')
