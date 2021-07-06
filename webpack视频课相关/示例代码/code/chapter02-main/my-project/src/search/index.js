'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import '../../common';
import { a } from './tree-shaking'
import logo from './images/logo.png';
import './search.less';

class Search extends React.Component {
    
    render() {
        const funA=a()
        return <div className="search-text">
          {funA}  搜索文字的内容<img src={logo} />
        </div>;
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
);