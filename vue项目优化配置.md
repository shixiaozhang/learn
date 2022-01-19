## vue.config.js

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入

const cdn = {
  // 忽略打包的第三方库

  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    axios: 'axios',
  },
  js: [
    // vue must at first!
    'https://cdn.kaoyanvip.cn/vue/2.5.16/vue.min.js',
    'https://cdn.kaoyanvip.cn/vuex/3.0.1/vuex.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
    'https://cdn.kaoyanvip.cn/axios/0.18.0/axios.min.js',
    'https://cdn.kaoyanvip.cn/wexin/open/jweixin-1.4.0.js',
  ],
  css: [
    // element-ui css

  ],
};

const config = {
  publicPath: '/',
  filenameHashing: true,
  productionSourceMap: IS_PROD,//在生产模式不生成SourceMap

  devServer: {
    compress: true,
    proxy: 'http://yt.kaoyan-vip.cn',
    disableHostCheck: true
  },
  lintOnSave: false,

  chainWebpack: config => {
    // 首页不预加载其他页面
    config.plugins.delete("prefetch");
    config.plugins.delete('preload');
    config.externals(cdn.externals); //增加全局变量，方便引用
    config.optimization.minimize(true);// 压缩代码

    config.optimization.splitChunks({ // 分割代码
      chunks: 'all'
    })

    config
      .plugin('html')
      .tap(args => {
        args[0].cdn = cdn
        return args
      })
  },
  configureWebpack: (config) => {

    // 生产环境需要gzip
    if (IS_PROD) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,   // 正在匹配需要压缩的文件后缀
          threshold: 10240, // 大于10kb的会压缩
          minRatio: 0.8
          // deleteOriginalAssets: true // 删除原文件

        })
      )
    }
  },
  css: {
    extract: IS_PROD
  },
}

module.exports = config


## index.html


    <!-- 引入样式 -->
<% for(var css of htmlWebpackPlugin.options.cdn.css) { %>
    <link rel="stylesheet" href="<%=css%>">
<% } %>

    <!-- 引入JS -->
<% for(var js of htmlWebpackPlugin.options.cdn.js) { %>
    <script src="<%=js%>"></script>
<% } %>


## babel.config.js

module.exports = {
  presets: [
    ["@babel/preset-env",{
      "modules": false,//开启tree shaking
      "debug": false,
      "useBuiltIns": "usage"//开启polyfill自动
    }],
  ],
  plugins: [
    ['import', {//开启vant按需加载
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    [       //开启element按需加载
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
  
}