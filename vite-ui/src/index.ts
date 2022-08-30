const str: string = 'hello vite'
console.log(str)
import { createApp } from 'vue'

import VButton from './button'
import SFCButton from './SFCButton.vue'
createApp(SFCButton).mount('#root')
