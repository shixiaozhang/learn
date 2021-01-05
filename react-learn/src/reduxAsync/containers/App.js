/*
 * @Author: your name
 * @Date: 2021-01-04 17:25:48
 * @LastEditTime: 2021-01-05 17:32:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\reduxAsync\containers\App.js
 */
import { Component } from 'react'
import Student from '../components/student'
import Teacher from '../components/teacher'

class App extends Component {
    
    change=()=>{

    }

    render() {
        return (
            <div>
                <h1 onClick={this.change}>切换</h1>
                {
                    this.props.show === 'A' ? <Student></Student> : <Teacher></Teacher>
                }

            </div>

        )
    }
}


