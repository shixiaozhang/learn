其实Sass/Scss配置自动导入也可以使用上面的方案，但是使用其原生的方案更加便捷，只需在vue.config.js中配置即可：
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/entry.scss";`  // A
      }
    }
  }
}
注意：sass-loader@8.0.0之前，要将上面的prependData替换为data。


## 配置Less和Stylus自动导入有两种方案：
### 1、
使用style-resources-loader
使用vue-cli-plugin-style-resources-loader
这里我们推荐使用第一种，因为第二种方案只是对第一种方案的包装，且暂不支持热更新。

安装style-resources-loader
$ npm i -D style-resources-loader
### 2、
// vue.config.js
const path = require('path')

module.exports = {
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))  // A
  },
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/entry.less'),  // B
      ],
    })
}

如果想要配置多个导入，只需在B行后继续添加即可：

patterns: [
  path.resolve(__dirname, './src/styles/entry1.less'),
  path.resolve(__dirname, './src/styles/entry2.less'),
],



## 其他 /* 注意sass，scss，less的配置 */
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/name.scss";
        `
      },
      scss: {
        prependData: `@import "~@/variables.scss";`
      },
      less:{
        globalVars: {
          primary: '#fff'
        }
      }
    }, 


##  antd 
// webpack.config.js
module.exports = {
  rules: [{
    test: /\.less$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader', // translates CSS into CommonJS
    }, {
      loader: 'less-loader', // compiles Less to CSS
+     options: {
+       lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
+         modifyVars: {
+           'primary-color': '#1DA57A',
+           'link-color': '#1DA57A',
+           'border-radius-base': '2px',
+         },
+         javascriptEnabled: true,
+       },
+     },
    }],
    // ...other rules
  }],
  // ...other config
}


配置 less 变量文件#
另外一种方式是建立一个单独的 less 变量文件，引入这个文件覆盖 antd.less 里的变量。

@import '~antd/lib/style/themes/default.less';
@import '~antd/dist/antd.less'; // 引入官方提供的 less 样式入口文件
@import 'your-theme-file.less'; // 用于覆盖上面定义的变量
注意，这种方式已经载入了所有组件的样式，不需要也无法和按需加载插件 babel-plugin-import 的 style 属性一起使用。