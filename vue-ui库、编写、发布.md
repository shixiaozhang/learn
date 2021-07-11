步骤
我们来理一下整个步骤：

创建项目
调整项目结构
编写组件
使用vue-cli-service库模式打包编译
发布到npm

# 创建目录
mkdir frog-ui
# 切换目录
cd frog-ui
# 初始化项目
vue create .

|-- examples  // 为原来的src目录改名而来，用于测试编写的组件
|-- packages  // 用于组织我们的组件库

目录调整以后，我们需要修改相应的webpack配置，使原来的src目录指向修改后的examples目录，修改vue.config.js文件：

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    // 将entry指向examples
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    // 为packages目录添加babel-loader处理
    chainWebpack: config => {
        config.module
        .rule('js')
        .include
            .add(resolve('packages'))
            .end()
        .use('babel')
            .loader('babel-loader')
            .tap(options => {
                return options
            })
    }
}

packages 目录下面的文件组织:

|-- datePicker      // 新编写的组件，以datepicker为例
|-- theme-default   // 主题文件


datePicker.vue:
<template>
  <div>这是一个datePicker组件</div>
</template>

<script>
export default {
  name: 'datePicker'
}
</script>


datePicker/src/index.js
// 导入组件，组件必须声明 name
import datePicker from './src/datePicker.vue'

// 为组件提供 install 安装方法，供按需引入
datePicker.install = function (Vue) {
  Vue.component(datePicker.name, datePicker)
}

// 默认导出组件
export default datePicker

批量注册组件:
packages/index.js

// 导入日期选择器组件
import datePicker from './datePicker'

// 存储组件列表
const components = [
  datePicker
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  ...components
}

本地测试组件

我们的组件以及编写完成，第一步先在本地进行测试：
examples/main.js

import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入组件库
import datePicker from './../packages/index'
import './../packages/theme-default/src/test.scss'

// 注册组件库
Vue.use(datePicker)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

examples/app.vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <datePicker></datePicker>
  </div>
</template>

<script>
import datePicker from "../packages/datePicker/src/datePicker.vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    datePicker,
  },
};
</script>


库模式打包

库模式的介绍：点击这里https://links.jianshu.com/go?to=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fguide%2Fbuild-targets.html%23%25E5%25BA%2594%25E7%2594%25A8

# package.json
"script": {
    "build-lib": "vue-cli-service build --target lib --name frog-ui --dest lib packages/index.js  && npm run build-theme",
}

执行：

npm run build-lib

项目的根目录新增了lib文件夹，内容如下

其中：

lib/frog-ui.common.js：一个给打包器用的 CommonJS 包
lib/frog-ui.umd.js：一个直接给浏览器或 AMD loader 使用的 UMD 包
lib/frog-ui.umd.min.js：压缩后的 UMD 构建版本

修改package.json

{
  "name": "frog-ui",
  "version": "0.1.0",
  "private": false,  // 是否私有，必须指定为false才能发布到npm
  "lisence": "MIT",
  "main": "lib/z-ui.umd.min.js", // 编译后包的入口文件
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "build-lib": "vue-cli-service build --target lib --name frog-ui --dest lib packages/index.js  && npm run build-theme",
    "build-theme": "gulp build --gulpfile packages/theme-default/gulpfile.js && cp-cli packages/theme-default/lib lib/theme-default",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "core-js": "^2.6.5",
    "vue": "^2.6.10",
    "vue-router": "^3.0.3"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.7.0",
    "@vue/cli-plugin-eslint": "^3.7.0",
    "@vue/cli-service": "^3.7.0",
    "@vue/eslint-config-standard": "^4.0.0",
    "babel-eslint": "^10.0.1",
    "cp-cli": "^2.0.0",
    "eslint": "^5.16.0",
    "eslint-plugin-vue": "^5.0.0",
    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^6.1.0",
    "gulp-cssmin": "^0.2.0",
    "gulp-sass": "^4.0.2",
    "markdown-it-anchor": "^5.0.2",
    "markdown-it-container": "^2.0.0",
    "markdown-it-decorate": "^1.2.2",
    "markdown-it-task-checkbox": "^1.0.6",
    "node-sass": "^4.12.0",
    "sass-loader": "^7.1.0",
    "vue-markdown-loader": "^2.4.1",
    "vue-template-compiler": "^2.5.21"
  }
}

根目录添加.npmignore文件

发布到npm下，只需要lib目录、package.json 和readme.md文件,所以需要忽略掉其他的目录
.npmignore

examples/
packages/
public/
vue.config.js
postcss.config.js
babel.config.js
*.map

发布npm
# 设置要发布的源---可以省略

npm config set registry http://registry.npmjs.org
# 登录
npm login
# 发布
npm publish

