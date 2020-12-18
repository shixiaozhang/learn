##  setState()

###  state(状态) 更新可能是异步的
        React 为了优化性能，有可能会将多个 setState() 调用合并为一次更新。
        因为this.props和this.state 可能是异步更新的，你不能依赖他们的值计算下一个state(状态)。
        以下面的代码为例:

        this.setState({
             counter: this.state.counter + this.props.increment,
        });
        我们并不能通过上述代码得到想要的值，为了弥补这个问题，
        使用另一种 setState() 的形式，接受一个函数。这个函数将接收前一个状态作为第一个参数，
        应用更新时的 props 作为第二个参数，
        代码如下：

        this.setState((prevState, props) => ({
             counter: prevState.counter + props.increment
        }));    


###  state(状态)更新会被合并

        当你调用 setState()， React 将合并你提供的对象到当前的状态中。
        所以当State是一个多键值的结构时，可以单独更新其中的一个，此时会进行“差分”更新，不会影响其他的属性值。

  ####  1.执行setState()之后干了什么？      

  setState()方法通过一个队列机制实现state更新，当执行setState()的时候，
  会将需要更新的state合并之后放入状态队列，而不会立即更新this.state(可以和浏览器的事件队列类比)。
  如果我们不使用setState而是使用this.state.key来修改，将不会触发组件的re-render。如果将this.state赋值给一个新的对象引用，
  那么其他不在对象上的state将不会被放入状态队列中，当下次调用setState()并对状态队列进行合并时，直接造成了state丢失。

####  2.setState()可以接受一个函数作为参数？
        setState() 不仅能够接受一个对象作为参数，还能够接受一个函数作为参数。
        函数的参数即为 state 的前一个状态以及 props。.

        void setState (
                function|object nextState,
                [function callback]
            )

        上述代码的第二个参数是一个回调函数，在setState() 的异步操作结束并且组件已经重新渲染的时候执行。
        换句话说，我们可以通过这个回调来拿到更新的state的值。
     
#### 3.执行setState()后能拿到最新的state值吗？

        以前在写代码时候，总是遇到明明执行过setState()，
        但是state的值却不是最新的，那么如何解决这个问题呢？

        因为setState()函数接受两个参数，一个是一个对象，就是设置的状态，还有一个是一个回调函数，
        是在设置状态成功之后执行的，所以我们可以通过回掉拿到最新的state值。
        代码如下：
        updateData = (newData) => {
            this.setState(
                { data: newData },
                () => {
                    //这里打印的是最新的state值
                    console.log(this.state.data);
                }
            );
        }

#### 4.setState()一定是异步更新吗？ 

        function incrementMultiple() {
            this.setState({count: this.state.count + 1});
            this.setState({count: this.state.count + 1});
            this.setState({count: this.state.count + 1});
        }

        直观上来看，当上面的 incrementMultiple 函数被调用时，组件状态的 count 值被增加了3次，
        每次增加1，那最后 count 被增加了3。但是，实际上的结果只给 state 增加了1。

        事实上，setState 方法与包含在其中的执行是一个很复杂的过程，从 React 最初的版本到现在，
        也有无数次的修改。它的工作除了要更动 this.state 之外，还要负责触发重新渲染，
        这里面要经过 React 核心 diff 算法，最终才能决定是否要进行重渲染，以及如何渲染。
        而且为了批次与效能的理由，多个 setState 呼叫有可能在执行过程中还需要被合并，
        所以它被设计以延时的来进行执行是相当合理的。

        在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，
        而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，
        但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，
        而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果，
        就是由 React 控制的事件处理过程 setState 不会同步更新 this.state。


## 总结： setState() 在react 控制下是异步，多个set会取最后一个实现；像在setTimeout 中set 就是同步的；想在set之后直接获取 state 最新值可在set 第二个参数回调函数中调用；

## 第一个参数可以写为函数 ，传入两个参 一个是state 之前的值 ， 第二个自定义 ；可以传入props 之类的值；




##  生命周期


### 1. 挂载卸载过程

#### 1.1.constructor()

constructor()中完成了React数据的初始化，它接受两个参数：props和context，当想在函数内部使用这两个参数时，需使用super()传入这两个参数。
注意：只要使用了constructor()就必须写super(),否则会导致this指向错误。

#### 1.2.componentWillMount()

componentWillMount()一般用的比较少，它更多的是在服务端渲染时使用。它代表的过程是组件已经经历了constructor()初始化数据后，但是还未渲染DOM时。

#### 1.3.componentDidMount()

组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求，返回数据setState后组件会重新渲染

#### 1.4.componentWillUnmount ()

在此处完成组件的卸载和数据的销毁。

clear你在组建中所有的setTimeout,setInterval
移除所有组建中的监听 removeEventListener
有时候我们会碰到这个warning:

Can only update a mounted or mounting component. This usually      means you called setState() on an unmounted component. This is a   no-op. Please check the code for the undefined component.

原因：因为你在组件中的ajax请求返回setState,而你组件销毁的时候，请求还未完成，因此会报warning

解决方法：

componentDidMount() {
    this.isMount === true
    axios.post().then((res) => {
    this.isMount && this.setState({   // 增加条件ismount为true时
      aaa:res
    })
})
}
componentWillUnmount() {
    this.isMount === false
}
### 2. 更新过程

####  2.1. componentWillReceiveProps (nextProps)被getDerivedStateFromProps(nextProps, prevState)替代

在接受父组件改变后的props需要重新渲染组件时用到的比较多
接受一个参数nextProps
通过对比nextProps和this.props，将nextProps的state为当前组件的state，从而重新渲染组件
  componentWillReceiveProps (nextProps) {
    nextProps.openNotice !== this.props.openNotice&&this.setState({
        openNotice:nextProps.openNotice
    }，() => {
      console.log(this.state.openNotice:nextProps)
      //将state更新为nextProps,在setState的第二个参数（回调）可以打         印出新的state
  })
}
#### 2.2.shouldComponentUpdate(nextProps,nextState)
       
主要用于性能优化(部分更新)
唯一用于控制组件重新渲染的生命周期，由于在react中，setState以后，state发生变化，组件会进入重新渲染的流程，在这里return false可以阻止组件的更新
因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断


#### 2.3.componentWillUpdate (nextProps,nextState)被 getSnapshotBeforeUpdate(prevProps, prevState)替代

shouldComponentUpdate返回true以后，组件进入重新渲染的流程，进入componentWillUpdate,这里同样可以拿到nextProps和nextState。

#### 2.4.componentDidUpdate(prevProps,prevState)

组件更新完毕后，react只会在第一次初始化成功会进入componentDidmount,之后每次重新渲染后都会进入这个生命周期，这里可以拿到prevProps和prevState，即更新前的props和state。

#### 2.5.render()

render函数会插入jsx生成的dom结构，react会生成一份虚拟dom树，在每一次组件更新时，在此react会通过其diff算法比较更新前后的新旧DOM树，比较以后，找到最小的有差异的DOM节点，并重新渲染。

#### 3. React新增的生命周期(个人补充)

### React新增生命周期
#### 3.1. getDerivedStateFromProps(nextProps, prevState)

代替componentWillReceiveProps()。

getDerivedStateFromProps是一个静态函数，也就是这个函数不能通过this访问到class的属性

老版本中的componentWillReceiveProps()方法判断前后两个 props 是否相同，如果不同再将新的 props 更新到相应的 state 上去。这样做一来会破坏 state 数据的单一数据源，导致组件状态变得不可预测，另一方面也会增加组件的重绘次数。
举个例子:

// before
componentWillReceiveProps(nextProps) {
  if (nextProps.isLogin !== this.props.isLogin) {
    this.setState({ 
      isLogin: nextProps.isLogin,   
    });
  }
  if (nextProps.isLogin) {
    this.handleClose();
  }
}

// after
static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.isLogin !== prevState.isLogin) {
    return {
      isLogin: nextProps.isLogin,
    };
  }
  return null;
}

componentDidUpdate(prevProps, prevState) {
  if (!prevState.isLogin && this.props.isLogin) {
    this.handleClose();
  }
}

这两者最大的不同就是:
在 componentWillReceiveProps 中，我们一般会做以下两件事，一是根据 props 来更新 state，二是触发一些回调，如动画或页面跳转等。

在老版本的 React 中，这两件事我们都需要在 componentWillReceiveProps 中去做。
而在新版本中，官方将更新 state 与触发回调重新分配到了 getDerivedStateFromProps 与 componentDidUpdate 中，使得组件整体的更新逻辑更为清晰。而且在 getDerivedStateFromProps 中还禁止了组件去访问 this.props，强制让开发者去比较 nextProps 与 prevState 中的值，以确保当开发者用到 getDerivedStateFromProps 这个生命周期函数时，就是在根据当前的 props 来更新组件的 state，而不是去做其他一些让组件自身状态变得更加不可预测的事情。

#### 3.2. getSnapshotBeforeUpdate(prevProps, prevState)

代替componentWillUpdate。
常见的 componentWillUpdate 的用例是在组件更新前，读取当前某个 DOM 元素的状态，并在 componentDidUpdate 中进行相应的处理。
这两者的区别在于：

在 React 开启异步渲染模式后，在 render 阶段读取到的 DOM 元素状态并不总是和 commit 阶段相同，这就导致在
componentDidUpdate 中使用 componentWillUpdate 中读取到的 DOM 元素状态是不安全的，因为这时的值很有可能已经失效了。
getSnapshotBeforeUpdate 会在最终的 render 之前被调用，也就是说在 getSnapshotBeforeUpdate 中读取到的 DOM 元素状态是可以保证与 componentDidUpdate 中一致的。
此生命周期返回的任何值都将作为参数传递给componentDidUpdate（）。



## 事件：不能通过返回 false 的方式阻止默认行为。你必须显式的使用  e.preventDefault();



## 懒加载 组件

###  React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）

使用之前：

import OtherComponent from './OtherComponent';

使用之后：

const OtherComponent = React.lazy(() => import('./OtherComponent'));
此代码将会在组件首次渲染时，自动导入包含 OtherComponent 组件的包
React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件

import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}

### fallback 属性接受任何在组件加载过程中你想展示的 React 元素






* Context:
 * 
 * 在一个典型的 React 应用中，
 * 数据是通过 props 属性自上而下（由父及子）进行传递的，
 * 但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），
 * 这些属性是应用程序中许多组件都需要的。
 * Context 提供了一种在组件之间共享此类值的方式，
 * 而不必显式地通过组件树的逐层传递 props