<!--
 * @Author: your name
 * @Date: 2020-12-23 16:42:38
 * @LastEditTime: 2020-12-24 16:51:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\reactApi.md
-->

# 组件


## React.Component:

        class Greeting extends React.Component {
            render() {
                return <h1>Hello, {this.props.name}</h1>;
            }
        }
### 生命周期：

#### 挂载：

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

* constructor()
* static getDerivedStateFromProps()
* render()
* componentDidMount()
#### 更新：

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

* static getDerivedStateFromProps()
* shouldComponentUpdate()
* render()
* getSnapshotBeforeUpdate()
* componentDidUpdate()
    
#### 卸载

当组件从 DOM 中移除时会调用如下方法：

* componentWillUnmount()

#### 错误处理
当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

* static getDerivedStateFromError()
* componentDidCatch()
### 其他 APIs

#### 组件还提供了一些额外的 API：

* setState()
* forceUpdate()

### class 属性

* defaultProps
* displayName

### 实例属性

* props
* state


### render()

当 render 被调用时，它会检查 this.props 和 this.state 的变化并返回以下类型之一：

* React 元素。通常通过 JSX 创建。例如，<div /> 会被 React 渲染为 DOM 节点，<MyComponent /> 会被 React 渲染为自定义组件，无论是 <div /> 还是 <MyComponent /> 均为 React 元素。
  
* 数组或 fragments。 使得 render 方法可以返回多个元素
  
* Portals。可以渲染子节点到不同的 DOM 子树中
  
* 字符串或数值类型。它们在 DOM 中会被渲染为文本节点
  
* 布尔类型或 null。什么都不渲染。（主要用于支持返回 test && <Child /> 的模式，其中 test 为布尔类型。)


### constructor(props) 如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。

在 React 组件挂载之前，会调用它的构造函数。在为 React.Component 子类实现构造函数时，应在其他语句之前前调用 super(props)。否则，this.props 在构造函数中可能会出现未定义的 bug

* 通过给 this.state 赋值对象来初始化内部 state。
  
* 为事件处理函数绑定实例

#### 避免将 props 的值复制给 state！这是一个常见的错误


### componentDidMount()

 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方

 这个方法是比较适合添加订阅的地方。如果添加了订阅，请不要忘记在 componentWillUnmount() 里取消订阅

 你可以在 componentDidMount() 里直接调用 setState()。它将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前。如此保证了即使在 render() 两次调用的情况下，用户也不会看到中间状态.请谨慎使用该模式，因为它会导致性能问题。

 ### componentDidUpdate(prevProps, prevState, snapshot)

 componentDidUpdate() 会在更新后会被立即调用。首次渲染不会执行此方法。

 你也可以在 componentDidUpdate() 中直接调用 setState()，但请注意它必须被包裹在一个条件语句里，正如上述的例子那样进行处理，否则会导致死循环。它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。不要将 props “镜像”给 state，请考虑直接使用 props
 
 如果 shouldComponentUpdate() 返回值为 false，则不会调用 componentDidUpdate()

 ### componentWillUnmount()

 componentWillUnmount() 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作

## React.PureComponent

    React.PureComponent 与 React.Component 很相似。两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。

    如果赋予 React 组件相同的 props 和 state，render() 函数会渲染相同的内容，那么在某些情况下使用 React.PureComponent 可提高性能

    React.PureComponent 中的 shouldComponentUpdate() 仅作对象的浅层比较。如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果。仅在你的 props 和 state 较为简单时，才使用 React.PureComponent，或者在深层数据结构发生变化时调用 forceUpdate() 来确保组件被正确地更新。你也可以考虑使用 immutable 对象加速嵌套数据的比较。

    此外，React.PureComponent 中的 shouldComponentUpdate() 将跳过所有子组件树的 prop 更新。因此，请确保所有子组件也都是“纯”的组件。

 ## 不常用的生命周期方法

 ### shouldComponentUpdate(nextProps, nextState)

 根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响

 此方法仅作为性能优化的方式而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。你应该考虑使用内置的 PureComponent 组件，而不是手动编写 shouldComponentUpdate()。PureComponent 会对 props 和 state 进行浅层比较，并减少了跳过必要更新的可能性

### static getDerivedStateFromProps(props, state)

getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。

* 如果你需要执行副作用（例如，数据提取或动画）以响应 props 中的更改，请改用 componentDidUpdate。
  
* 如果只想在 prop 更改时重新计算某些数据，请使用 memoization helper 代替。
  
* 如果你想在 prop 更改时“重置”某些 state，请考虑使组件完全受控或使用 key 使组件完全不受控 代替。

### getSnapshotBeforeUpdate(prevProps, prevState) 应返回 snapshot 的值（或 null）

 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。


 ## Error boundaries

 Error boundaries是 React 组件，它会在其子组件树中的任何位置捕获 JavaScript 错误，并记录这些错误，展示降级 UI 而不是崩溃的组件树。Error boundaries 组件会捕获在渲染期间，在生命周期方法以及其整个树的构造函数中发生的错误。

 仅使用 Error boundaries 组件来从意外异常中恢复的情况；不要将它们用于流程控制

 ### static getDerivedStateFromError(error)

 此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state

getDerivedStateFromError() 会在渲染阶段调用，因此不允许出现副作用。 如遇此类情况，请改用 componentDidCatch()

        class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false };
        }

        static getDerivedStateFromError(error) {
            // 更新 state 使下一次渲染可以显降级 UI
            return { hasError: true };
        }

        render() {
            if (this.state.hasError) {
            // 你可以渲染任何自定义的降级  UI
            return <h1>Something went wrong.</h1>;
            }

            return this.props.children; 
        }
        }

### componentDidCatch(error, info)

* error —— 抛出的错误。
* info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。
  
如果发生错误，你可以通过调用 setState 使用 componentDidCatch() 渲染降级 UI，但在未来的版本中将不推荐这样做。 可以使用静态 getDerivedStateFromError() 来处理降级渲染。

### forceUpdate()

* component.forceUpdate(callback)
  
调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。如果标记发生变化，React 仍将只更新 DOM。


## Class 属性

### defaultProps
defaultProps 可以为 Class 组件添加默认 props。这一般用于 props 未赋值，但又不能为 null 的情况

        class CustomButton extends React.Component {
        // ...
        }

        CustomButton.defaultProps = {
        color: 'blue'
        };

### displayName别名没什么用



## Suspense
Suspense 使得组件可以“等待”某些操作结束后，再进行渲染。目前，Suspense 仅支持的使用场景是：通过 React.lazy 动态加载组件。它将在未来支持其它使用场景，如数据获取等。

* React.lazy
* React.Suspense



## React.memo 记忆组件渲染
React.memo 为高阶组件。它与 React.PureComponent 非常相似，但只适用于函数组件，而不适用 class 组件

        const MyComponent = React.memo(function MyComponent(props) {
        /* 使用 props 渲染 */
        });

默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现

        function MyComponent(props) {
        /* 使用 props 渲染 */
        }
        function areEqual(prevProps, nextProps) {
        /*
        如果把 nextProps 传入 render 方法的返回结果与
        将 prevProps 传入 render 方法的返回结果一致则返回 true，
        否则返回 false
        */
        }
        export default React.memo(MyComponent, areEqual);

        


        
## Dom元素:

### dangerouslySetInnerHTML

dangerouslySetInnerHTML 是 React 为浏览器 DOM 提供 innerHTML 的替换方案。

使用代码直接设置 HTML 存在风险，因为很容易无意中使用户暴露于跨站脚本（XSS）的攻击

可以直接在 React 中设置 HTML，但当你想设置 dangerouslySetInnerHTML 时，需要向其传递包含 key 为 __html 的对象，以此来警示你。例如：

        function createMarkup() {
        return {__html: 'First &middot; Second'};
        }

        function MyComponent() {
        return <div dangerouslySetInnerHTML={createMarkup()} />;
        }

### style:接收一个对象作为参数；

        const divStyle = {
        color: 'blue',
        backgroundImage: 'url(' + imgUrl + ')',
        };

        function HelloWorldComponent() {
        return <div style={divStyle}>Hello World!</div>;
        }
        或
        function HelloWorldComponent() {
        return <div style={{color: 'blue'}}>Hello World!</div>;
        }

### 注意：可以使用自定义属性，但要注意属性名全都为小写。

## 事件：

### 剪贴板事件

事件名：

    onCopy onCut onPaste

### 复合事件

事件名：

   onCompositionEnd onCompositionStart onCompositionUpdate

### 键盘事件

事件名:

    onKeyDown onKeyPress onKeyUp


### 焦点事件

事件名：

    onFocus onBlur


###  表单事件

 事件名：

    onChange onInput onInvalid onReset onSubmit 


###  通用事件

事件名称：

    onError onLoad


 ### 鼠标事件：

    onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
    onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
    onMouseMove onMouseOut onMouseOver onMouseUp

### 触摸事件
事件名：

    onTouchCancel onTouchEnd onTouchMove onTouchStart



### UI 事件
事件名：

    onScroll


### 滚轮事件
事件名：

    onWheel

### 媒体事件
事件名：

    onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
    onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
    onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
    onTimeUpdate onVolumeChange onWaiting


###  图像事件
事件名：

    onLoad onError

### 动画事件
事件名：

    onAnimationStart onAnimationEnd onAnimationIteration


### 过渡事件
事件名：

    onTransitionEnd


### 其他事件
事件名：

    onToggle