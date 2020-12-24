/*
 *@浅层比较的组件；PureComponent 和 React.memo
 * @Author: 
 * @Date: 2020-12-24 10:33:45
 * @LastEditTime: 2020-12-24 15:25:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\reactApi.js
 */
import React from 'react'

class Api extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            names: {
                id: 0
            }
        }
        this.ref = React.createRef()
    }
    changeId = () => {
        let names = this.state.names
        let id = names.id + 1
        names = Object.assign(names, { id: id })
        console.log(names);
        this.setState({
            names: names
        })
        console.log(this.state.names.id);

    }
    upDate = () => {
        console.log(this.ref);
        // this.ref.forceUpdate((props) => {
        //     console.log(props);

        // })
    }
    render() {

        return (
            <>
                <button onClick={this.changeId}>+1</button><br />
                <button onClick={this.upDate}>强制刷新</button>
                <Apimemo ref={this.ref} name={this.state.names}></Apimemo>
                <ApiPure ></ApiPure>
            </>
        )
    }
}

class ApiPure extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            info: {
                name: 'qqq',
                other: {
                    child: 0
                }
            }
        }
    }
    upDate = () => {
        this.forceUpdate((props) => {
            console.log(props);

        })
    }
    clickBut = () => {
        let info = this.state.info
        let child = info.other.child + 1;
        info = Object.assign(info, { other: { child: child } })
        this.setState({
            info: info
        })
        console.log(this.state.info);
    }
    render() {
        // child在变化但是，因为表层数据没改变，所以dom不刷新
        return (
            <>
                <h1>我是pure组件</h1>
                <h1>info:name:{this.state.info.name}</h1>
                <h1>other:{this.state.info.other.child}</h1>
                <button onClick={this.clickBut}>+1</button>
                <br />
                <button onClick={this.upDate}>强制刷新</button>
            </>
        )
    }
}

function Mymemo(props) {
    console.log(props);
    // id在变化但是，因为表层数据没改变，所以dom不刷新
    // 浅层比较
    return (
        <>
            <h1 ref={props.ref}>我是Apimemo组件</h1>
            <h1>{props.name.id}</h1>

        </>
    )
}
// function areEqual(prevProps, nextProps) {
//     /*
//     如果把 nextProps 传入 render 方法的返回结果与
//     将 prevProps 传入 render 方法的返回结果一致则返回 true，
//     否则返回 false
//     */
// }


const Fors = React.forwardRef((props, ref) => {
    console.log(props);
    return (
        <>
            <h1 ref={ref}>我是Apimemo组件</h1>
            <h1>{props.name.id}</h1>

        </>
    )
})

const Apimemo = React.memo(Fors)

export default Api