/*
 * @Author: your name
 * @Date: 2021-01-04 17:25:48
 * @LastEditTime: 2021-01-05 21:33:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\reduxAsync\containers\App.js
 */
import { Component } from 'react'
import { connect } from 'react-redux'
import Student from '../components/student'
import Teacher from '../components/teacher'
import {show,fetchPosts} from '../action/index'
class App extends Component {

    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props
        console.log(this.props, 11);
        dispatch(fetchPosts())

    }
    change = () => {
        this.props.dispatch(show('B'))
    }

    render() {
        return (
            <div>
                <h1 onClick={this.change}>切换</h1>
                {
                    this.props.show === 'A' ? <Student info={this.props.info}></Student> : <Teacher info={this.props.info}></Teacher>
                }

            </div>

        )
    }
}

const mapStateToProps = state => {

    const { show, teacher, student } = state;

    if (show === 'A') {
        return { show, info: student }
    }

    return { show, info: teacher }
}

export default connect(mapStateToProps)(App)