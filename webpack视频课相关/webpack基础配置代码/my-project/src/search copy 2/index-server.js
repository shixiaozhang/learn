'use strict';

// import React, { Component } from 'react';
// import '../../common';
// import { a } from './tree-shaking'
// import logo from './images/logo.png';
// import './search.less';
const React = require('react')
const logo = require('./images/logo.png')
const { a } = require('./tree-shaking')
require('./search.less')

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
        const { Text } = this.state
        return <div className="search-text">
            {funA}  搜索文字的内容<img src={logo} onClick={this.loadComponent.bind(this)} />
            {Text ? <Text ></Text> : ''}
        </div>; 
    }
}

module.exports = <Search></Search>