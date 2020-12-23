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

####  2.1. componentWillReceiveProps (nextProps)被static getDerivedStateFromProps(nextProps, prevState)替代

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

#### fallback 属性接受任何在组件加载过程中你想展示的 React 元素


## react ----slot插槽

### 写法：

#### 1、把插槽 传如子组件属性 使用  props.属性名 接收

      function SplitPane(props) {
        return (
          <div className="SplitPane">
            <div className="SplitPane-left">
              {props.left}
            </div>
            <div className="SplitPane-right">
              {props.right}
            </div>
          </div>
        );
      }

      function App() {
        return (
          <SplitPane
            left={
              <Contacts />
            }
            right={
              <Chat />
            } />
        );
      }


#### 2、传统插槽 props.children

        *props 里面会有一个props参数 
        *包含一个children 参数 ，该参数是[] 具有，子组件默认插槽的所有dom节点信息；


        function SplitPane(props) {
            return (
              <div className="SplitPane">
                <div className="SplitPane-left">

                  {props.children}

                </div>
              </div>
            );
          }

          function App() {
            return (
              <SplitPane>

                 <h1>xxxxxxx</h1>

              </SplitPane>
            );
          }

 ## * Context: 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法

      * 在一个典型的 React 应用中，
      * 数据是通过 props 属性自上而下（由父及子）进行传递的，
      * 但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），
      * 这些属性是应用程序中许多组件都需要的。
      * Context 提供了一种在组件之间共享此类值的方式，
      * 而不必显式地通过组件树的逐层传递 props


###   何时使用 Context

      import React, { Component, createContext } from 'react'

      // Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
      // 为当前的 theme 创建一个 context（“light”为默认值）
      
      const ThemeContent = createContext('light');

      class Bdd extends Component {
          render() {
              // @ Provider
              // 使用一个 Provider 来当theme 传递给一下组件树。
              // 无论多深多能传递下去。
              return (
                  <ThemeContent.Provider value='dark'>
                      <Toolbar></Toolbar>
                  </ThemeContent.Provider>
              )
          }
      }

      // 中间件
      function Toolbar() {
          return (
              <div>
                  <ThemeButton></ThemeButton>
              </div>
          )
      }

      class ThemeButton extends Component {

          // 指定 contextType 读取当前的 theme context。
        // React 会往上找到最近的 theme Provider，然后使用它的值。
        // 在这个例子中，当前的 theme 值为 “dark”。
          static contextType = ThenmeContext;
          render() {
              return (
                  <Button theme={this.context}></Button>
              )
          }
      }



###  API

      React.createContext  创建一个 Context 对象
      Context.Provider     Provider 接收一个 value 属性，传递给消费组件
      Class.contextType    在组件内使用context的前置
      Context.Consumer     消费组件订阅值  {value => /* 基于 context 值进行渲染*/}
      Context.displayName   


####  React.createContext：
 

      const MyContext=React.createContext(defaultValue);
      // defaultValue ：默认值-当组件没Provider值时；

      创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，
      这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值
      只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
      这有助于在不使用 Provider 包装组件的情况下对组件进行测试。


###  Context.Provider：


    <!-- 为MyContext设定需要传递的值 -->
   // 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化

    <MyContext.Provider value={/* 某个值 */}>


    Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。
    多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据;

    当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。
    Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新



### Class.contextType 获取值得方式

      class MyClass extends React.Component {
        componentDidMount() {
          let value = this.context;
          /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
        }
        componentDidUpdate() {
          let value = this.context;
          /* ... */
        }
        componentWillUnmount() {
          let value = this.context;
          /* ... */
        }
        render() {
          let value = this.context;
          /* 基于 MyContext 组件的值进行渲染 */
        }
      }
      //在组件内使用context的前置：

      MyClass.contextType = MyContext;//获取MyContext

      //也可使用静态属性获取

        class MyClass extends React.Component {
          static contextType = MyContext;
          render() {
            let value = this.context;
            /* 基于这个值进行渲染工作 */
          }
        }


      挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。
      这能让你使用 this.context 来消费最近 Context 上的那个值。
      你可以在任何生命周期中访问到它，包括 render 函数中

### Context.Consumer 获取值的方式与Provider搭配使用

    <MyContext.Consumer>
      {value => /* 基于 context 值进行渲染*/}
    </MyContext.Consumer>

    React 组件也可以订阅到 context 变更。这能让你在函数式组件中完成订阅 context


### Context.displayName

context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。

      const MyContext = React.createContext(/* some value */);
      MyContext.displayName = 'MyDisplayName';

      <MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
      <MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中




##  错误边界

部分 UI 的 JavaScript 错误不应该导致整个应用崩溃，为了解决这个问题，React 16 引入了一个新的概念 —— 错误边界。

错误边界是一种 React 组件，这种组件可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI，而不是渲染那些崩溃了的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

###  使用：

如果一个 class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。当抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息。

        class ErrorBoundary extends React.Component {
          constructor(props) {
            super(props);
            this.state = { hasError: false };
          }

          static getDerivedStateFromError(error) {
            // 更新 state 使下一次渲染能够显示降级后的 UI
            return { hasError: true };
          }
          
          componentDidCatch(error, errorInfo) {
            // 你同样可以将错误日志上报给服务器
            logErrorToMyService(error, errorInfo);
          }

          render() {
            if (this.state.hasError) {
              // 你可以自定义降级后的 UI 并渲染
              return <h1>Something went wrong.</h1>;
            }

            return this.props.children; 
          }
        }

        <ErrorBoundary>
          <MyWidget />
        </ErrorBoundary>



错误边界的工作方式类似于 JavaScript 的 catch {}，不同的地方在于错误边界只针对 React 组件。只有 class 组件才可以成为错误边界组件。
大多数情况下, 你只需要声明一次错误边界组件, 并在整个应用中使用它。

注意错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误。
如果一个错误边界无法渲染错误信息，则错误会冒泡至最近的上层错误边界，
这也类似于 JavaScript 中 catch {} 的工作机制



## Refs 转发:Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧,可以用于强行修改DOM元素

      //废弃的方式
      <input type="text" ref="textInput" />
      // 然后在组件中可以通过 this.refs.textInput.value 获取到该DOM节点的值
###  使用：

#### 1、回调引用：给DOM元素添加ref属性

      ref={ele => this.eleInput = ele }

      在项目中常用的方式是refs回调。即为ref属性设置回调函数，当设置ref时，React会调用这个函数，并将element作为第一个参数传递给该函数。
      

      class CustomTextInput extends React.Component {
            constructor(props) {
              super(props);
              this.textInput = null;

              this.setTextInputRef = element => {
                this.textInput = element; // 将element赋值给 this.textInput
              };
            }

            handleSubmit = e => {
              e.preventDefault();
              console.log(this.textInput.value);
            };

            render() {
              return (
                <div>
                  <input type="text" ref={this.setTextInputRef} />
                  // 或者写成
                  <input type="text" ref={ele => this.eleInput = ele}> // ele 即指向当前input元素
                  <button onClick={e => this.handleSubmit(e)}>提交</button>
                </div>
              );
            }
          }
          //当组件被挂载时React会将这个DOM元素传递给 ref 的回调函数，element作为DOM元素的实例被赋值给 this.textInput

####  2、给类组件添加ref属性

      如果给 class 声明的组件添加 ref 属性，则 ref 回调的参数将指向已经加载的该组件的实例。这种方式区别于下面将要讲到的函数式组件。

      class Foo extends React.Component {
        render() {
          return <input type="text" />;
        }
      }
      class Fn extentds React.Comonent {
         constructor(props) {
            super(props)
              this.componentEle = null;
             
          }
        render() {
          return <Foo ref={ele => { this.componentEle = ele; console.log(ele) }} />;   // ele指向当前组件的实例
        }
      }
### refs与函数式组件:
ref属性不能用在函数式声明的组件上，因为函数式组件不能被实例化。如以下ref赋值方式无效并且会报错：


        function InputText() {
          return (
            <div>
              <input type="text"/>
            </div>
          );
        }
        class MyComponent extends React.Component {
          render() {
            // ref 无效且报错
            return <InputText ref = {el => {this.componEle = el}}/>
          }
        }
#### 函数式组件使用ref

        function CustomTextInput(props) {
          // 这里必须声明 textInput，这样 ref 才可以引用它
          const textInput = useRef(null);

          function handleClick() {
            textInput.current.focus();
          }

          return (
            <div>
              <input
                type="text"
                ref={textInput} />
              <input
                type="button"
                value="Focus the text input"
                onClick={handleClick}
              />
            </div>
          );
        }
###  React.createRef()

React提供了creatRef()函数来创建Refs，并通过该方法将ref属性附加到React组件的DOM元素上。



#### ref 的值根据节点的类型而有所不同：

      当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
      当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
      你不能在函数组件上使用 ref 属性，因为他们没有实例。


      React 会在组件挂载时给 current 属性传入 DOM 元素，并在组件卸载时传入 null 值。ref 会在 componentDidMount 或 componentDidUpdate 生命周期钩子触发前更新




比如，我们在组件的构造函数中创建一个ref实例，使其在整个组件内可用，并将其赋值给 this.firstRef，然后在render()方法内部，将创建的ref示例传递给HTML元素。

      class MyComponent extends React.Component {
        constructor(props) {
          super(props);
          this.firstRef = React.createRef();
        }
        // ...
        render() {
          return <div ref={this.firstRef} />;
        }
      }

通过这种方式创建ref，我们可以重构一些现有的业务场景。 来看一个例子：

        class CustomTextInput extends React.Component {
          constructor(props) {
            super(props);
            // 创建一个ref实例
            this.textInput = React.createRef();
          }

          focusTextInput() {
            // 当 ref 属性被render()方法中的HTML元素使用时，上述创建的ref实例会接收来自底层DOM元素的 current 值
            //这里有一个 current 属性，它就是input DOM 元素对象本身
            console.log(this.textInput.current.value);
            this.textInput.current.focus();
          }

          render() {
            // 将在构造函数中创建的ref示例传递到 input 组件的 ref 属性上
            return (
              <div>
                <input type="text" ref={this.textInput} />

                <input
                  type="button"
                  value="Focus the text input"
                  onClick={this.focusTextInput}
                />
              </div>
            );
          }
        }

### 转发refs（Forwarding refs）

React提供的 Ref forwarding 方案用来将 ref 通过组件传递给其子节点。这种场景对于可复用组件库和高阶组件很有用。

也就是说，可以使用 React.forwardRef 函数将 ref 转发到组件中，Ref forwarding 允许组件接收一个 ref，并将它向下传递 / 转发（用来点题）给子组件。
    
        const TextInput = React.forwardRef((props, ref) => (
          <input type="text" placeholder="请输入表名" ref={ref} />
        ));

        const inputRef = React.createRef();
        class CustomTextInput extends React.Component {
          handleSave = () => {
            console.log(inputRef.current.value);
          };

          render() {
            return (
              <div>
                <TextInput ref={inputRef} />
                <button onClick={this.handleSave}>保存</button>
              </div>
            );
          }
        }

#### 在高阶组件（HOC）中转发Refs

      const Input  = (InputComponent) => {
        const forwardRef = (props, ref) => {
          const onChange = () => console.log(ref.current.value);
          return (
            <InputComponent
              forwardedRef={ref}
              onChange={onChange}
              {...props}
            />
          );
        };
        return React.forwardRef(forwardRef);
      };

      // 待包装子组件 InputCompoment
      // 将 forwardedRef 下发给 ref 属性，在render()方法中，input输入框就会接收到这个 ref
      const TextInput = ({ forwardedRef, children, ...rest }) => (
        <div>
          <input ref={forwardedRef} {...rest} />
          {children}
        </div>
      );
可以这样使用这个高阶组件：

      // 将 TextInput 传入 Input 高阶组件，会返回一个 InputField component
        const InputField = Input(TextInput);
        class CustomTextInput extends React.Component {
          render() {;
            // 依然使用该方法创建一个 ref 实例，并作为参数传递给 InputFIeld 组
            const inputRef = React.createRef();
            return <InputField ref={inputRef} />;
          }
        }


### Fragments:相当于占位符，<></>

      render() {
        return (
          <React.Fragment>
            <ChildA />
            <ChildB />
            <ChildC />
          </React.Fragment>
        );
      }


##  高阶组件 HOC
### 具体而言，高阶组件是参数为组件，返回值为新组件的函数。

      function Hoc(Component,data){

        const ComponentA=()=>{
          return <Component {...data}></Component>
        }

        return  ComponentA

      }



###  Portals: ReactDOM.createPortal(child, container)


#### 第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。第二个参数（container）是一个 DOM 元素


用处：一个 portal 的典型用例是当父组件有 overflow: hidden 或 z-index 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框

        render() {
          // React 并*没有*创建一个新的 div。它只是把子元素渲染到 `domNode` 中。
          // `domNode` 是一个可以在任何位置的有效 DOM 节点。
          return ReactDOM.createPortal(
            this.props.children,
            domNode
          );
        }

### 一个从 portal（一般元素也一样） 内部触发的事件会一直冒泡至包含 React 树的祖先，即便这些元素并不是 DOM 树 中的祖先；


#### Profiler API测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”。 它的目的是识别出应用中渲染较慢的部分，或是可以使用类似 memoization 优化的部分，并从相关优化中获益。

### 关于 key ：推荐使用数据里面的id作为key；

受控组件：<input value={someValue} onChange={handleChange} /> 接受当前的值作为参数
非受控组件： <input type="text" />类似于传统的表单输入

####  用下标作为key会导致问题；

1、当数据发生改变：非受控组件
  a、当数据顺序不变：不存在问题；
  b、当数据顺序变化: 一旦有顺序修改，diff 就会变得慢；例如有input输入框时；数居未变前，input的内容，不管怎么怎么追加元素；它的内容永远绑定在之前的key的下标上；
  [a,b,c]
   a循环的input上输入111；
   给数组追加头追加d [d,a,b,c]；
   111会绑定在d，所循环出的input上；
   也就是永远绑定在下标为0 的dom节点上；

####  用下标作为随机数Math.random() 会导致问题；
  1、会diff对比每次的key都不一样；从而销毁改dom节点；创建新的dom节点；增加负担；




### Render Props 指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

具有 render prop 的组件接受一个函数，该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑

      <DataProvider render={data => (
        <h1>Hello {data.target}</h1>
      )}/>
使用：

    class MouseTracker extends React.Component {
      render() {
        return (
          <div>
            <h1>移动鼠标!</h1>
            <Mouse render={mouse => (
              <Cat mouse={mouse} />
            )}/>
          </div>
        );
      }
    }
    class Mouse extends React.Component {
        render() {
            return (
              <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

                {/*
                  Instead of providing a static representation of what <Mouse> renders,
                  use the `render` prop to dynamically determine what to render.
                */}
                {this.props.render(this.state)}
              </div>
            );
          }

    }
    class Cat extends React.Component {
        render() {
          const mouse = this.props.mouse;
          return (
            <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
          );
        }
      }


重要的是要记住，render prop 是因为模式才被称为 render prop ，你不一定要用名为 render 的 prop 来使用这种模式。事实上， 任何被用于告知组件需要渲染什么内容的函数 prop 在技术上都可以被称为 “render prop”.

这样

    <Mouse children={mouse => (
      <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>
    )}/>

这样

    <Mouse>
      {mouse => (
        <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>
      )}
    </Mouse>


## React.Component 与 React.PureComponent


### 1、 继承PureComponent时，不能再重写shouldComponentUpdate，否则会引发警告

### 2、继承PureComponent时，进行的是浅比较，也就是说，如果是引用类型的数据，只会比较是不是同一个地址，而不会比较具体这个地址存的数据是否完全一致 

### 3. 浅比较会忽略属性或状态突变的情况，其实也就是，数据引用指针没变而数据被改变的时候，也不新渲染组件。但其实很大程度上，我们是希望重新渲染的。所以，这就需要开发者自己保证避免数据突变。

      class ListOfWords extends React.PureComponent {
          render() {
          return
          {this.props.words.join(',')};
          }
      }
      class WordAdder extends React.Component {
            constructor(props) {
              super(props);
                this.state = {
                    words: ['marklar']
                };
                this.handleClick = this.handleClick.bind(this);
            }

            handleClick() {
            const words = this.state.words;

            words.push('marklar');

            this.setState({words: words});

            }

          render() {
                return (

                <button onClick={this.handleClick}>
                click
                </button>
                );
          }
      }


如果想使`2`中的按钮被点击后可以正确渲染*ListOfWords*，也很简单，在*WordAdder*的*handleClick*内部，
将 `const words = this.state.words;` 改为`const words = this.state.words.slice(0);` 
就行啦~（这时的words是在原来state的基础上复制出来一个新数组，所以引用地址当然变啦）

