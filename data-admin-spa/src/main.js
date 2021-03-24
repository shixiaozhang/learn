// import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
let _ = require("lodash");
import plugins from './shared/plugins/index';
import { i18n } from './i18n/lang';
// element-ui
import VueClipboard from 'vue-clipboard2';
import AFTableColumn from 'af-table-column'

Vue.use(AFTableColumn)
Vue.use(VueClipboard);
Vue.use(plugins)

// global css
import './assets/scss/index.scss'
import 'vue-cron-generator/src/styles/global.less'

Vue.use(ELEMENT, {
  i18n: (key, value) => i18n.t(key, value)
})

//指令注册
import * as directives from './shared/directives/index';
Object.keys(directives).forEach(k => Vue.directive(k, directives[k]));

import functions from '@/utils/function';
Vue.prototype.common = functions

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
