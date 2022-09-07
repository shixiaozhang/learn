import { createApp } from 'vue'
import Vui from './entry'
import VButton from './button'
import SFCButton from './button/SFCButton.vue'
import JSXButton from './button/JSXButton'
import App from './app.vue'
const app = createApp(App)
app.use(Vui).mount('#root')
