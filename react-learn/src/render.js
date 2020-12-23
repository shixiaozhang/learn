/*
 * @Author: your name
 * @Date: 2020-12-23 15:05:40
 * @LastEditTime: 2020-12-23 16:24:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\render.js
 */
// render_props 相当于插槽传值
import React from 'react'
class Mouse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mouse: {
                x: 0,
                y: 0
            }
        }
    }
    handleMouuseMove = (e) => {
        console.log(e);
        this.setState({
            mouse: {
                x: e.clientX,
                y: e.clientY
            }
        })
    }

    render() {
        return (
            <div style={{ height: '100vh', width: '50vw' }} onMouseMove={this.handleMouuseMove}>
                {this.props.render(this.state.mouse)}
                {/* {this.props.children(this.state.mouse)} */}
            </div>
        )
    }

}

class Cat extends React.Component {

    render() {
        return (

            <>
                <p>x:{this.props.mouse.x}</p>
                <p>y:{this.props.mouse.y}</p>
            </>
        )
    }
}

class MouseTracker extends React.Component {

    render() {
        return (
            <>
                <h1>移动鼠标</h1>
                {/* 方法1 */}

                <Mouse render={(mouse) =>
                    (<Cat mouse={mouse} />)
                } />

                {/* 方法2 */}

                {/* <Mouse children={mouse => (
                    <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>
                )} /> */}

                {/* 方法3 ：插槽传值*/}
                {/* this.props.children(this.state.mouse) */}
                {/* <Mouse>
                    {mouse => (
                        <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>
                    )}
                </Mouse> */}
            </>
        )
    }
}


export default MouseTracker