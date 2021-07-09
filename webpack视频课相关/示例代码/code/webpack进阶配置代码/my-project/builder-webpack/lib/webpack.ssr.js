const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');// 基础库分离
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

const ssrConfig = {
  mode: 'production',
  module: {
    rules: [
      { // 不解析css
        test: /.(le|c)ss$/,
        use: 'ignore-loader',
      },
    ],
  },
  plugins: [
    // ? 压缩css
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    // ?分离react之类的基础包 的方式之一：
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://unpkg.com/react@17/umd/react.production.min.js', // 可以是本地文件，也可以是cdn
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js', // 可以是本地文件，也可以是cdn
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  // ? 分离页面的公共js文件：
  optimization: {
    splitChunks: {
      minSize: 0, // 引入文件的大小
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all', // 不管同步异步都引入
          minChunks: 2, // 最少引用的次数
        },

      },
    },
  },

};

module.exports = merge(baseConfig, ssrConfig);
