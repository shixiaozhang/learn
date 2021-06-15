const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    webpack: (config) => {
        config.output.library = `react_micro_app`;
        config.output.libraryTarget = 'umd';
        config.output.jsonpFunction = `webpackJsonp_react_micro_app`;
        config.output.globalObject = 'window';

        return config;
    },

    devServer: (_) => {
        const config = _;

        config.headers = {
          'Access-Control-Allow-Origin': '*',
        };
        config.historyApiFallback = true;
        config.hot = false;
        config.watchContentBase = false;
        config.liveReload = false;
    
        return config;
    },
};