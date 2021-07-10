
# 代码分割

## 适⽤用的场景:

  * 抽离相同代码到⼀一个共享块
  * js脚本懒加载，使得初始下载的代码更小

## 懒加载 JS 脚本的⽅方式

* CommonJS:require.ensure
  
* ES6:动态 import(⽬前还没有原生支持，需要 babel 转换)

## 如何使⽤用动态 import?

### 安装 babel 插件

    npm install @babel/plugin-syntax-dynamic-import --save-dev

### ES6:动态 import(⽬前还没有原⽣支持，需要 babel 转换)

    {
        "plugins": ["@babel/plugin-syntax-dynamic-import"],

        ... 
    }

## 实现 js 分包 懒加载：

//text.js

    import React from 'react'

    export default()=><div>动态 import</div>

// index.js

    import React, { Component } from 'react';
    import ReactDOM from 'react-dom';
    import '../../common';
    import { a } from './tree-shaking'
    import logo from './images/logo.png';
    import './search.less';


    class Search extends React.Component {
        constructor() {
            super()
            this.state = {
                Text: null
            }
        }
        loadComponent() {
            //? 通过 @babel/plugin-syntax-dynamic-import 对引入的js进行抽离分包 实现动态引入组件(懒加载)；
            import('./text').then(text => {
                this.setState({
                    Text: text.default
                })
            })
        }
        render() {
            const funA = a()
            const {Text} =this.state
            return <div className="search-text">
                {funA}  搜索文字的内容<img src={logo} onClick={this.loadComponent.bind(this)} />
                {Text ? <Text ></Text>  : ''}
            </div>;
        }
    }

    ReactDOM.render(
        <Search />,
        document.getElementById('root')
    );


//运行打包
yarn build

打包出来的文件：

    Built at: 2021/07/07 下午8:30:36
                Asset       Size  Chunks                         Chunk Names
        2_3f93bac3.js  649 bytes       2  [emitted] [immutable]  
            index.html  412 bytes          [emitted]              
    index_f7168c44.js   4.26 KiB       1  [emitted] [immutable]  index
    logo_bd62f047.png   8.54 KiB          [emitted]              
            search.html   3.45 KiB          [emitted]              
    search_378ff443.css  118 bytes       0  [emitted] [immutable]  search
    search_f68e9c03.js    827 KiB       0  [emitted] [immutable]  search


其中 2_3f93bac3.js 就是分包出来的 text.js


当点击 触发 loadComponent 函数；动态的创建一个script标签引入 这个js文件包；
这时候会通过jsonp请求这个 2_3f93bac3.js；这个js就是我们的text.js 组件；

//2_3f93bac3.js

    (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

        /***/ 14:
        /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

        /* harmony default export */ __webpack_exports__["default"] = (function () {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "\u52A8\u6001 import");
        });

        /***/ })

    }]);