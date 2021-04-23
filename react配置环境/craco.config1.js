/*
 * @Author: your name
 * @Date: 2021-04-22 22:37:09
 * @LastEditTime: 2021-04-22 22:37:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react配置环境\craco.config.js
 */
const CracoLessPlugin = require('craco-less');
const path = require('path')

const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
	webpack: {
		alias: {
			'@': pathResolve('src'),
			'@assets': pathResolve('src/assets'),
			'@components': pathResolve('src/components'),
		},
	},
	module: {
		rules: []
	},
	plugins: [{
		plugin: CracoLessPlugin,
		options: {
			lessLoaderOptions: {
				lessOptions: {
					modifyVars: {
						'@primary-color': '#3e7fee'
					},
					javascriptEnabled: true,
				},
			},
		},
	}, ],
};