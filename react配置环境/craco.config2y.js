/*
 * @Author: your name
 * @Date: 2021-04-22 22:37:09
 * @LastEditTime: 2021-04-22 22:37:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react配置环境\craco.config.js
 */

module.exports = {
	babel: {
	  presets: [
		[
		  '@babel/preset-env',
		  {
			modules: false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
			useBuiltIns: 'entry', // browserslist环境不支持的所有垫片都导入
			// https://babeljs.io/docs/en/babel-preset-env#usebuiltins
			// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md
			corejs: {
			  version: 3, // 使用core-js@3
			  proposals: true,
			},
		  },
		],
	  ],
	  plugins: [
		  // 配置 babel-plugin-import
		  ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
		// 配置解析器
		 ["@babel/plugin-proposal-decorators", { "legacy": true }],
		   ["@babel/plugin-proposal-class-properties", { "loose": true }],
		 ["babel-plugin-styled-components", { "displayName": true }]
	  ],
		 loaderOptions: {},
		 loaderOptions: (babelLoaderOptions, { env, paths }) => { return babelLoaderOptions; }
  
	},
  }
  
//   作者：Run丘比特
//   链接：https://juejin.cn/post/6896304919851368461
//   来源：掘金
//   著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。