import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom'
// 懒加载组件
const OtherComponent = React.lazy(() => import('./Login'));
// React.lazy 目前只支持默认导出（export default）



class App extends Component {
  constructor(props) {
    super(props)
    console.log(props);
    this.state = {
      name: 'xiaozhang',
      date: new Date(),
      user: false,
      list: [1, 2, 3]
    }
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  changeName = (e) => {
    console.log(e);
    this.setState({
      name: '小张'
    })
  }
  handleClick = (e) => {
    e.preventDefault();
    console.log('阻止默认事件');
    console.log(e);
  }
  changeUser = () => {
    this.setState({
      user: !this.state.user
    }, () => {
      console.log(this.state.user);
    })
  }
  // 生命周期开始：

  componentDidMount() {
    /**
     * 1：UI渲染完成后调用
     * 2：只执行一次
     * 3：典型场景：获取外部资源
     */

    // dom第一次加载成功
    console.log(arguments, 'componentDidMount');

    this.timerID = setTimeout(
      () => this.tick(),
      1000
    );
  }

  // 组件更新数据或Dom：

  // componentWillReceiveProps(nextProps) {
  //   // 数据更新    与getDerivedStateFromProps只能存在一个
  //   console.log(arguments, 'componentWillReceiveProps');
  // }


  /**
   * 
   * @param {*} nextProps 父组件新传入的 props 
   * @param {*} nextState 组件更新之后的state
   * @param {*} prevState 组件更新之前的state
   * 
   */


  static getDerivedStateFromProps(nextProps, nextState) {
    /**
     * 1：当state需要从props初始化时，使用
     * 2：尽量不使用，维护俩者状态需要消耗额外资源，增加复杂度
     * 3：每次state数据更新后render之前都会调用
     * 4：典型场景表单获取默认值
     * 
     * 5： 与componentWillReceiveProps 只能存在一个
     *  
     */

    // state数据更新后  静态无法访问this
    console.log(arguments, 'getDerivedStateFromProps');
    const { type } = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (type !== nextState.type) {
      return {
        type,
      };
    }
    // 否则，对于state不进行任何操作
    return null;
    // 要有返回值
  }


  shouldComponentUpdate(nextProps, prevtState) {
    /**
     * 1：觉得Vistual Dom是否重绘
     * 2：一般可以由PuerComponent自动实现
     * 3：典型场景：性能优化
     */

    console.log(arguments, 'shouldComponentUpdate');

    // 唯一用于控制组件重新渲染的生命周期，由于在react中，setState以后，state发生变化，

    // 组件会进入重新渲染的流程，在这里return false可以阻止组件的更新
    return true//必须 return 值
  }


  getSnapshotBeforeUpdate(nextProps, prevState) {
    /**
     * 1：在render之后调用，state已更新
     * 2：典型场景：获取render之前的dom状态
     * 3：此生命周期返回的任何值都将作为参数传递给 componentDidUpdate（）
     * 4： 与componentWillUpdate只能存在一个
     */


    console.log(arguments, 'getSnapshotBeforeUpdate');
    return true//必须 return 值

  }
  // componentWillUpdate (nextProps, prevState) {// 与getSnapshotBeforeUpdate只能存在一个

  // }

  /**
   * @param {*} perScrollHeight    getSnapshotBeforeUpdate中的返回值
   */
  componentDidUpdate(nextProps, nextState, perScrollHeight) {
    /**
     * 1：每次UI更新被调用
     * 2：典型场景：页面通过props重新获取数据
     */

    console.log(arguments, 'componentDidUpdate');
    //dom和refs 更新成功
  }
  // 组件更新数据或Dom结束



  componentWillUnmount() {
    /**
     * 1：组件被移除时调用
     * 2：典型场景：资源释放
     */
    // 卸载页面
    console.log(arguments, 'componentWillUnmount');
  }

  // 生命周期结束
  render() {

    return (
      <div>
        <div>{this.state.date.toLocaleTimeString()}</div>
        <a href="/#" onClick={this.handleClick}>阻止默认事件</a>
        {
          this.state.user ?
            <UserOne changeUser={this.changeUser}></UserOne>
            :
            <UserTwo changeUser={this.changeUser}></UserTwo>
        }

        <ul>
          {
            this.state.list.map((item, index) => {
              // 使用数据中的 id 来作为元素的 key
              // 当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key
              return <li key={index}>{item}</li>
            })}
        </ul>

        {/* 懒加载组件：即React.lazy加载的组件只能在<React.Suspense>组件下使用 */}
        {/* fallback 属性接受任何在组件加载过程中你想展示的 React 元素。
          你可以将 Suspense 组件置于懒加载组件之上的任何位置。
          你甚至可以用一个 Suspense 组件包裹多个懒加载组件 */}
       {this.state.user && <React.Suspense fallback={<div>loading...</div>}>
          <OtherComponent />
        </React.Suspense>}


        <NameForm ></NameForm>


        <WelcomeDialog></WelcomeDialog>

        <App1 name={this.state.name} changeName={this.changeName} key='1'>


        </App1>

      

      </div>

    )
  }
}

function App1(props) {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          onClick={($event) => {
            props.changeName($event)
          }}
        >
          Learn React {props.name}
        </p>
      </header>
    </div>
  );
}

function UserOne(props) {
  return (
    <div onClick={props.changeUser}>UserOne</div>
  )
}
function UserTwo(props) {
  return (
    <div onClick={props.changeUser}>UserTwo</div>
  )
}

class NameForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: '',
      textName: ''
    }
  }
  handleChange = (event) => {
    console.log(event);
    const target = event.target;
    const name = target.name;
    const value = target.name === 'name' ? target.value : target.value;



    this.setState({
      // es6语法   [xxx]: 1; ==> xxx的值: 1;   xxx为变量名
      // 等同于 es5
      // var partialState = {};
      // partialState[name] = value;
      // this.setState(partialState);
      [name]: value
    });
  }

  handleSubmit = (event) => {
    console.log(event);
    alert('提交的名字: ' + this.state.textName);
    event.preventDefault();
  }
  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <label htmlFor="name"> 名字：</label>
        {/* value 设置默认值；数据单项绑定 */}
        <input name='textName' type="text" value={this.state.textName} onChange={this.handleChange} />
        <label>
          选择你喜欢的风味:
          {/* 通过value确定选中的值；而不是selected；
            multiple多选
            value对应值为数组['a','c']
          */}
          <select name='selected' value={this.state.selected} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>



        <input type="submit" value="提交" />



      </form>


    )
  }
}



function FancyBorder(props) {
  console.log(props);
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
function FancyBorder2(props) {
  console.log(props);
  return (
    <>
      {/* <> </> 占位符 */}
      <div className={'FancyBorder FancyBorder-' + props.color}>
        <h1>left{props.left}</h1>
        <h1>right{props.right}</h1>
      </div>
      <p></p>
    </>
  );
}
//插槽
function WelcomeDialog() {
  return (
    <div>
      <FancyBorder color="blue">
        <h1 className="Dialog-title">
          Welcome
            </h1>
        <p className="Dialog-message">
          Thank you for visiting our spacecraft!
            </p>
      </FancyBorder>
      <FancyBorder2 left={<UserOne />} right={<UserTwo />} ></FancyBorder2>
    </div>
  );
}




export default App;
