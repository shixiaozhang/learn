const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  plugins: [
    // 热模块更新插件，不会刷新页面；
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};

module.exports = merge(baseConfig, devConfig);
