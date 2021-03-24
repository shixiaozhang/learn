const CompressionWebpackPlugin = require('compression-webpack-plugin')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入

module.exports = {
    publicPath: './',
    productionSourceMap: !IS_PROD,
    devServer: {
        overlay: { // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true
        },
        // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    },
    chainWebpack: config => {
        config.optimization.minimize(true);
        config.optimization.splitChunks({
            chunks: 'all'
        });
        const cdn = {
            css: [
                // element-ui css
                'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css'
            ],
            js: [
                // vue must at first!
                'https://cdn.bootcss.com/vue/2.6.10/vue.runtime.min.js',
                'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
                'https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
                'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
                'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js',
                'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/locale/en.min.js',
                'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/locale/zh-CN.min.js',
                'https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.4.10/dist/g6.min.js',
                'https://cdn.bootcdn.net/ajax/libs/g2plot/1.0.4/g2plot.js'
            ]
        }
        config.plugin('html')
            .tap(args => {
                args[0].cdn = cdn
                return args
            });
        config.externals({
            'vue': 'Vue',
            'vuex': 'Vuex',
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT',
            'axios': 'axios',
            'g6': 'G6',
            'g2plot':'G2Plot'
        });
    },
    configureWebpack: config => {
        // 开启 gzip 压缩
        // 需要 npm i -D compression-webpack-plugin
        if (IS_PROD) {
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
        }
    },
    css: {
        extract: IS_PROD
    },

}