/*
 * @Author: your name
 * @Date: 2021-01-08 15:35:11
 * @LastEditTime: 2021-01-08 21:04:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpack-react\src\pages\app.js
 */
import React,{Component} from 'react';
import About from './components/about'
import bg from '../static/img/616945.png'
class App extends React.Component{
    render(){
        return <div className='tit'>
            我是react 示例；
            <About/>
            <img src={bg} alt=""/>
            
        </div>
    }
}
export default App