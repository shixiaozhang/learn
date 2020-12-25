<!--
 * @Author: your name
 * @Date: 2020-12-24 17:14:31
 * @LastEditTime: 2020-12-25 16:54:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\Hook笔记.md
-->


# Hook 

## 可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性
## Hook 使你在非 class 的情况下可以使用更多的 React 特性。



## Hook 使用规则

只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）

## useState

### 使用：const [count, setCount] = useState(0);
        import React, { useState, useEffect } from 'react';

        function Example() {
        // 声明一个新的叫做 “count” 的 state 变量
        const [count, setCount] = useState(0);
        const [todos, setTodos] = useState([{ text: '学习 Hook' }]);
        return (
            <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            </div>
        );
        }

## useEffect

你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
但是 React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect；并且每次渲染都会调用所有的effect；

###  使用：


### 无需清清除的Effect 

        useEffect(() => {xxx});

### 需要清除的Effect
如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它

        useEffect(() => {
            return  function(){}
        });

### 针对固定值得Effect 

        useEffect(() => {
        document.title = `You clicked ${count} times`;
        }, [count]); // 仅在 count 更改时更新

如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数

        useEffect(() => {
        document.title = `You clicked ${count} times`;
        }, []); // 仅在 count 更改时更新



### useEffect 会在每次渲染后都执行吗？
 
是的，默认情况下，它在第一次渲染之后和每次更新之后都会执行。

### React 何时清除 effect？

React 会在组件卸载的时候执行清除操作。正如之前学到的，effect 在每次渲染的时候都会执行。这就是为什么 React 会在执行当前 effect 之前对上一个 effect 进行清除


### 为什么每次更新的时候都要运行 Effect？
在 class 中prop的值发生改变，但是我们是在componentDidMount读取的prop无法，再运行componentDidMount更新；在class里面通过componentDidUpdate 解决，所以在effect中，effect需要每次更新都会运行；









你可能认为需要单独的 effect 来执行清除操作。但由于添加和删除订阅的代码的紧密性，所以 useEffect 的设计是在同一个地方执行。如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它
### 例子：

1、订阅一个东西，每次只能订阅一个：

        // Mount with { friend: { id: 100 } } props
        ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // 运行第一个 effect

        // Update with { friend: { id: 200 } } props
        ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // 清除上一个 effect
        ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // 运行下一个 effect

        // Update with { friend: { id: 300 } } props
        ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // 清除上一个 effect
        ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // 运行下一个 effect

        // Unmount
        ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // 清除最后一个 effect
        
在每次传入不同的id时；因为effect定义了清除函数；所以会在调用第二次effect前；调用effect清除函数，清除上一个id的订阅；



        import React, { useState, useEffect } from 'react';

        function Example(props) {
            const [count, setCount] = useState(0);

            //类似于 componentDidMount 和 componentDidUpdate:
            useEffect(() => {
                // Update the document title using the browser API
                document.title = `You clicked ${count} times`;
            });
            //订阅例子：
            useEffect(() => {
                // ...
                ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

                return () => {
                    
                ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
                };
                
            });
            return (
                <div>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>
                    Click me
                </button>
                </div>
            );
        }


## Hook 规则

### 只在最顶层使用 Hook

#### 不要在循环，条件或嵌套函数中调用 Hook

 确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确
如果我们想要有条件地执行一个 effect，可以将判断放到 Hook 的内部：

     useEffect(function persistForm() {
     // 👍 将条件判断放置在 effect 中
            if (name !== '') {
            localStorage.setItem('formData', name);
            }
        });
### 只在 React 函数中调用 Hook

不要在普通的 JavaScript 函数中调用 Hook。你可以：

* ✅ 在 React 的函数组件中调用 Hook
* ✅ 在自定义 Hook 中调用其他 Hook 

## 自定义 Hook

自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook.自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性

        import { useState, useEffect } from 'react';

        function useFriendStatus(friendID) {
        const [isOnline, setIsOnline] = useState(null);

        useEffect(() => {
            function handleStatusChange(status) {
            setIsOnline(status.isOnline);
            }

            ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
            return () => {
            ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
            };
        });

        return isOnline;
        }

### 自定义 Hook 必须以 “use” 开头吗？
必须如此。这个约定非常重要。不遵循的话，由于无法判断某个函数是否包含对其内部 Hook 的调用，React 将无法自动检查你的 Hook 是否违反了 Hook 的规则。

### 在两个组件中使用相同的 Hook 会共享 state 吗？
不会。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。

### 自定义 Hook 如何获取独立的 state？
每次调用 Hook，它都会获取独立的 state。由于我们直接调用了 useFriendStatus，从 React 的角度来看，我们的组件只是调用了 useState 和 useEffect。 正如我们在之前章节中了解到的一样，我们可以在一个组件中多次调用 useState 和 useEffect，它们是完全独立的。

## Hook API 索引

### 基础 Hook

* useState
  
* useEffect
  
* useContext

### 额外的 Hook

* useReducer
  
* useCallback
  
* useMemo
  
* useRef
  
* useImperativeHandle
  
* useLayoutEffect
  
* useDebugValue

## 基础 Hook


### useState


    const [state, setState] = useState(initialState);
    
返回一个 state，以及更新 state 的函数。

在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同。

setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。

    setState(newState);
    或
     <button onClick={() => setCount(newState)}>Reset</button>
     或
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+1</button>

在后续的重新渲染中，useState 返回的第一个值将始终是更新后最新的 state。

#### 注意

与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。

    setState(prevState => {
    // 也可以使用 Object.assign
    return {...prevState, ...updatedValues};
    });
    
useReducer 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。


#### 惰性初始 state

initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：

    const [state, setState] = useState(() => {
    const initialState = someExpensiveComputation(props);
    return initialState;
    });

#### 跳过 state 更新

调用 State Hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。（React 使用 Object.is 比较算法 来比较 state。）

需要注意的是，React 可能仍需要在跳过渲染前渲染该组件。不过由于 React 不会对组件树的“深层”节点进行不必要的渲染，所以大可不必担心。如果你在渲染期间执行了高开销的计算，则可以使用 useMemo 来进行优化


### useEffect

    useEffect(()=>{   xxxx  或 return xxx});

在函数组件主体内（这里指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性。

使用 useEffect 完成副作用操作。赋值给 useEffect 的函数会在组件渲染到屏幕之后执行。你可以把 effect 看作从 React 的纯函数式世界通往命令式世界的逃生通道。

#### 清除 effect

组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源

    useEffect(() => {
    const subscription = props.source.subscribe();
    return () => {
        // 清除订阅
        subscription.unsubscribe();
    };
    });

为防止内存泄漏，清除函数会在组件卸载前执行。另外，如果组件多次渲染（通常如此），则在执行下一个 effect 之前，上一个 effect 就已被清除。

#### effect 的执行时机

与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。

然而，并非所有 effect 都可以被延迟执行。例如，在浏览器执行下一次绘制前，用户可见的 DOM 变更就必须同步执行，这样用户才不会感觉到视觉上的不一致。（概念上类似于被动监听事件和主动监听事件的区别。）React 为此提供了一个额外的 useLayoutEffect Hook 来处理这类 effect。它和 useEffect 的结构相同，区别只是调用时机不同。

虽然 useEffect 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行。React 将在组件更新前刷新上一轮渲染的 effect。