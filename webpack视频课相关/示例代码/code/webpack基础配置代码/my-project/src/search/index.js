'use strict';
// import 'babel-polyfill'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../common';
import { a } from './tree-shaking'
import logo from './images/logo.png';
import bg from './images/bg.jpg';
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
        const { Text } = this.state
        return <div className="search-text">
            <img src={bg} alt="" />
            {funA}  搜索文字的内容<img src={logo} onClick={this.loadComponent.bind(this)} />
            {Text ? <Text ></Text> : ''}
        </div>;
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
);