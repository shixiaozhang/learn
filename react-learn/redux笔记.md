<!--
 * @Author: your name
 * @Date: 2020-12-15 15:39:06
 * @LastEditTime: 2021-01-12 15:57:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\redux笔记.md
-->
# Redux

## 安装

    npm install --save redux

应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。 惟一改变 state 的办法是触发 action，一个描述发生什么的对象。 为了描述 action 如何改变 state 树，你需要编写 reducers。

    import { createStore } from 'redux'


* 这是一个 reducer，形式为 (state, action) => state 的纯函数。
  
* 描述了 action 如何把 state 转变成下一个 state。
 
* state 的形式取决于你，可以是基本类型、数组、对象、
  
* 甚至是 Immutable.js 生成的数据结构。惟一的要点是
  
* 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 
* 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
  
* 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。

##

    function counter(state = 0, action) {
        switch (action.type) {
            case 'INCREMENT':
            return state + 1
            case 'DECREMENT':
            return state - 1
            default:
            return state
        }
    }
    
    // 创建 Redux store 来存放应用的状态。
    // API 是 { subscribe, dispatch, getState }。
    let store = createStore(counter)

    // 可以手动订阅更新，也可以事件绑定到视图层。
    store.subscribe(() => console.log(store.getState()))

    // 改变内部 state 惟一方法是 dispatch 一个 action。
    // action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
    store.dispatch({ type: 'INCREMENT' })
    // 1
    store.dispatch({ type: 'INCREMENT' })
    // 2
    store.dispatch({ type: 'DECREMENT' })
    // 1

使用纯函数来执行修改
为了描述 action 如何改变 state tree ，你需要编写 reducers。

Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。刚开始你可以只有一个 reducer，随着应用变大，你可以把它拆成多个小的 reducers，分别独立地操作 state tree 的不同部分，因为 reducer 只是函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器。



        function visibilityFilter(state = 'SHOW_ALL', action) {
            switch (action.type) {
                case 'SET_VISIBILITY_FILTER':
                return action.filter
                default:
                return state
            }
        }

        function todos(state = [], action) {
            switch (action.type) {
                case 'ADD_TODO':
                return [
                    ...state,
                    {
                    text: action.text,
                    completed: false
                    }
                ]
                case 'COMPLETE_TODO':
                return state.map((todo, index) => {
                    if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: true
                    })
                    }
                    return todo
                })
                default:
                return state
            }
        }

        import { combineReducers, createStore } from 'redux'
        
        let reducer = combineReducers({ visibilityFilter, todos })
        let store = createStore(reducer)

# 文章：



在本文开始之前，唠叨几句话吧，那就是本文有点长，且有部分源码等；前几天有幸和寒雁老哥聊了一小会，他说我现在已经懂怎么写文章阶段，建议下一个阶段能稳下来，然后去写一些有深度的东西，而不是浮在表面上；上周六也有去听了同公司已出书的挖坑的张师傅的技术写作分享。



于是我沉默了一下，听了一些前辈的建议，我决定，奥力给，做一个技术深度专区的文章～，尽量每月一更，不过每更一次，篇幅都会较长，尽可能的分享一个较为完整的主题。所以打个预防针吧，希望各位小伙伴，能静下心来看，大家一同进步～



🔥 为什么这个专栏叫【KT】，我这人比较 low，专栏中文叫: 阿宽技术深文，K 取自阿宽中的宽，T，Technology，技术，有逼格。可以，感觉自己吹牛逼的技术又进了一步。


本文流水线


图片



由于时间关系，并且在组里引出了 react 中状态管理的论战，围绕着 hox、mobx、redux 进行一波交流，所以第四步的动手实践，我会晚点再更，接下来这段时间打算研究一下 hox、mobx 的一个内部实现原理，然后动手实践写下 demo，在组里评审一波，取其精华去其糟粕，说不定又是一个新的产物？想想就很激动有意思呢～





博主在 18 年底面试的时候，面试官看我简历，问: “我看你简历，vue 和 react 都用过，你能说一下Vue 和 React 的区别嘛？”，当时逼逼赖赖说了一下，也不知道说的对不对，然后在说到 vuex 和 redux 的时候，血案发生了，面试官问了一句，为什么 Redux 总是要返回一个新的 state ？返回旧的 state 为什么不行 ？面试结果不用说，毕竟当时我也不是这么了解嘛～



当时面试完了之后，抽空把 redux 的源码看了一遍，ojbk，确实看的比较晕，记得当时看的时候，redux 还没引入 TS，前段时间，想深入去了解一下 redux，谁知，一发不可所说，鬼知道我在看的过程说了多少句 WC，牛逼...



虽然这篇文章，是针对 redux 入门选手写的，但由于我这该死的仪式感，说个东西之前，还是得简单介绍一下～



redux 是啥？
Redux 是 JavaScript 状态容器，提供可预测化的状态管理方案, 官网里是这么介绍的 :

✋ Redux is a predictable state container for JavaScript apps.

咩呀？听不懂啊？稍等稍等，在做解释之前，请允许我问你个问题，react 是单向数据流还是双向数据流？，如果你回答的是双向数据流，ok，拜拜 👋，出门左转，如果你回答的是单向数据流，嗯，我们还是好兄弟～



要理解 redux 是啥子，先看我画的一个图 👇



我们知道哈，react 中，有 props 和 state，当我们想从父组件给子组件传递数据的时候，可通过 props 进行数据传递，如果我们想在组件内部自行管理状态，那可以选择使用 state。但是呢，我们忽略了 react 的自身感受～



react 它是单向数据流的形式，它不存在数据向上回溯的技能，你要么就是向下分发，要么就是自己内部管理。（咋地，挑战权威呢？你以为可以以下犯上吗？）



小彭一听，“ 哎不对啊，不是可以通过回调进行修改父组件的 state 吗？” 是的，确实可以。先说说我们为啥使用 redux，一般来讲，我们在项目中能用到 redux 的，几乎都算一个完整的应用吧。这时候呢，如果你想两个兄弟组件之间进行交流，互相八卦，交换数据，你咋整？



我们模拟一个场景，Peng 组件和 Kuan 组件想共享互相交换一些数据，按照 react 单向数据流的方式，该怎么解决？



这个图应该都看得懂哈，也就是说，我们兄弟组件想互相交流，交互对方的数据，那么唯一的解决方案就是：提升 state，将原本 Peng、Kuan 组件的 state 提升到共有的父组件中管理，然后由父组件向下传递数据。子组件进行处理，然后回调函数回传修改 state，这样的 state 一定程度上是响应式的。







这会存在什么问题？你会发现如果你想共享数据，你得把所有需要共享的 state 集中放到所有组件顶层，然后分发给所有组件。



为此，需要一个库，来作为更加牛逼、专业的顶层 state 发给各组件，于是，我们引入了 redux，这就是 redux 的简单理解。



三大原则


阿宽这里就默认大家都会使用 redux 了，不会使用的你就去啃啃文档，写个 demo 你就会了嘛，不过呢，还是要说一说 redux 的三大原则的～



单一数据源 : 整个应用的 state 都存储在一颗 state tree 中，并且只存在于唯一一个 store 中

state 是只读的 : 唯一改变 state 的方法只能通过触发 action，然后通过 action 的 type 进而分发 dispatch 。不能直接改变应用的状态

状态修改均由纯函数完成 : 为了描述 action 如何改变 state tree，需要编写 reducers


基础知识储备

Store
store 是由 Redux 提供的 createStore(reducers, preloadedState, enhancer) 方法生成。从函数签名看出，要想生成 store，必须要传入 reducers，同时也可以传入第二个可选参数初始化状态(preloadedState)



第三个参数一般为中间件 applyMiddleware(thunkMiddleware)，看看代码，比较直观～👇



import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk' // 这里用到了redux-thunk

const store = createStore(
  reducerList,
  initialState = {},
  applyMiddleware(thunkMiddleware)
)


redux 中最核心的 API 就是: createStore， 通过 createStore 方法创建的 store 是一个对象，它本身包含 4 个方法 :

getState() : 获取 store 中当前的状态。

subscribe(listener) : 注册一个监听者，它在 store 发生变化时被调用。

dispatch(action) : 分发一个 action，并返回这个 action，这是唯一能改变 store 中数据的方式。

replaceReducer(nextReducer) : 更新当前 store 里的 reducer，一般只会在开发模式中调用该方法。


Aciton
Action 是把数据从应用传到 store 的有效载荷。它是 store 数据的唯一来源。简单来说，Action 就是一种消息类型，他告诉 Redux 是时候该做什么了，并带着相应的数据传到 Redux 内部。

Action 就是一个简单的对象，其中必须要有一个 type 属性，用来标志动作类型（reducer 以此判断要执行的逻辑），其他属性用户可以自定义。如：



const KUAN_NEED_GRID_FRIEND = 'KUAN_NEED_GRID_FRIEND'

// 一个action对象

// 比如此action是告诉redux，阿宽想要一个女朋友

{

  type: KUAN_NEED_GRID_FRIEND,

  params: {

    job: '程序员',

    username: '阿宽'

  }

}



我们来了解一个知识点: Action Creator，看看官网中的介绍 : Redux 中的 Action Creator 只是简单的返回一个 Action，我们一般都会这么写～👇



function fetchWishGridFriend(params, callback) {
  return {
    type: KUAN_NEED_GRID_FRIEND,
    params,
    callback,
  }
}


我们知道哈，Redux 由 Flux 演变而来，在传统的 Flux 中, Action Creators 被调用之后经常会触发一个 dispatch。比如是这样的 👇



// 传统 Flux
function fetchFluxAction(params, callback) {
  const action = {
    type: KUAN_NEED_GRID_FRIEND,
    params,
    callback,
  }
  dispatch(action)
}


但是在 redux 中，因为 store（上边说过了）中存在 dispatch 方法的，所以我们只需要将 Action Creators 返回的结果传给 dispatch() ，就完成了发起一个 dispatch 的过程，甚至于创建一个被绑定的 Action Creators 来自动 dispatch ~👇



// 普通dispatch
store.dispatch(fetchWishGridFriend(params, () => {}))

// 绑定dispatch
const bindActionCreatorsDemo = (params, callback) => (store.dispatch) =>
  store.dispatch(fetchWishGridFriend(params, callback))
bindActionCreatorsDemo() // 就能实现一个dispatch action

👉 在你的代码中，一定可以找得到bindActionCreators() 这玩意，因为一般情况下，我们都会使用 react-redux 提供的 connect() 帮助器，bindActionCreators() 可以自动把多个 action 创建函数绑定到 dispatch() 方法上。

Reducers
Reducers 必须是一个纯函数，它根据 action 处理 state 的更新，如果没有更新或遇到未知 action，则返回旧 state；否则返回一个新 state 对象。注意：不能修改旧 state，必须先拷贝一份 state，再进行修改，也可以使用 Object.assign 函数生成新的 state，具体为什么，我们读源码的时候就知道啦～举个例子 🌰



// 用户reducer
const initialUserState = {
    userId: undefined
}

function userReducer = (state = initialUserState, action) {
  switch(action.type) {
    case KUAN_NEED_GRID_FRIEND:
      return Object.assign({}, state, {
        userId: action.payload.data
      })
    default:
      return state;
  }
}



看源码之前，我举个形象生动的 🌰 ，帮助大家理解理解。



小彭想请个假去旅游，按照原流程，必须得由从 小彭申请请假 -> 部门经理通过 -> 技术总监通过 -> HR 通过（单向流程），小彭的假条不能直接到 HR 那边。看下图 👇



阿宽看到小彭请假旅游，也想请一波，于是想 copy 一份小彭的请假事由（兄弟组件进行数据共享）那咋办，他不能直接从小彭那拿数据，所以他只能傻乎乎的通过部门经理、技术总监，一路“闯关”到 HR 那，指着 HR 说，你把小彭的请假表给我复印一份，我也要请假。



小彭和阿宽想进行数据之间共享，只能通过共有的 boss（HR）



当我们用了 redux 之后呢，就变成这屌样了 👇 看懂扣 1，看不懂扣眼珠子





入手源码


淦!!! 又到了我最讨厌的源码解读了，因为讲源码太难了，不是源码难，而是怎么去讲比较难，毕竟我本身理解的和认识的 redux，不一定是正确的，同时我也不想直接贴一大堆代码上去，你不就是不想看源码才看的这篇文章吗～







不过没办法，理解万岁。幸好 redux 的源码文件相对较少，大家一起奥力给！



🎉 直接看源码，我们可以看到这样的文件架构 👇 



├── utils
│   ├── actionTypes
│   ├── isPlainObject
│   ├── warning
│   └─
│
├── applyMiddleware
├── bindActionCreatorts
├── combineReducers
├── compose
├── createStore
├── index.js
│
└─



不多吧？说多的出门左转不送。看源码要从 index.js 开始入手，跟着镜头，我们去看看这个文件有啥玩意。其实没啥重要玩意, 就是把文件引入然后 export



// index.js
import createStore from './createStore'
import combineReducers from './combineReducers'
import bindActionCreators from './bindActionCreators'
import applyMiddleware from './applyMiddleware'
import compose from './compose'
...

export { createStore, combineReducers, bindActionCreators, applyMiddleware, compose }



我们先来看第一行代码，import createStore from './createStore'，😯，这个我知道，这不就是 redux 中最核心的 API 之一吗？让我们去揭开它的面纱～


createStore 至上
// API
const store = createStore(reducers, preloadedState, enhance)



初次看，不知道这三个参数啥意思？不慌，先抽根烟，打开百度翻译，你就知道了。（因为源码中有对这三个参数给出解释）





/**
 * 创建一个包含状态树的Redux存储
 * 更改store中数据的唯一方法是在其上调用 `dispatch()`
 *
 * 你的app中应该只有一个store，指定状态树的不同部分如何响应操作
 * 你可以使用 `combineReducers` 将几个reducer组合成一个reducer函数
 *
 * @param {Function} reducer 给定当前状态树和要处理的操作的函数，返回下一个状态树
 *
 * @param {any} [preloadedState] 初始状态. 你可以选择将其指定为中的universal apps服务器状态，或者还原以前序列化的用户会话。
 * 如果你使用 `combineReducers` 来产生 root reducer 函数，那么它必须是一个与 `combineReducers` 键形状相同的对象
 *
 * @param {Function} [enhancer] store enhancer. 你可以选择指定它来增强store的第三方功能
 * 比如 middleware、time travel、persistence, Redux附带的唯一商店增强器是 `applyMiddleware()`
 *
 * @returns {Store} Redux Store，允许您读取状态，调度操作和订阅更改。
 */



了解这三个参数的意思之后呢，我们再看看它的返回值，中间做了啥先不用管。上边有说过，调用 createStore 方法创建的 store 是一个对象，它包含 4 个方法，所以代码肯定是这样的，不是我剁 diao ！



// createStore.js
export default function createStore(reducer, preloadedState, enhancer) {
  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false // 是否正在分发事件

  function getState() {
    // ...
    return currentState
  }

  function subscribe(listener) {
    // ...
  }

  function dispatch(action) {
    // ...
    return action
  }

  function replaceReducer(nextReducer) {
    // ...
  }

  function observable() {
    // ...
  }

  dispatch({ type: ActionTypes.INIT })

  // ...
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable,
  }
}


沙箱设计


就这些代码，想必都看得懂，但是不得不佩服写这段代码的人啊！！首先通过闭包进行了内部变量私有化，外部是无法访问闭包内的变量。其次呢通过对外暴露了接口，以达到外部对内部属性的访问。



这不就是沙箱吗？沙箱，就是让你的程序跑在一个隔离的环境下，不对外界的其他程序造成影响。我们的 createStore 对内保护内部数据的安全性，对外通过开发的接口，进行访问和操作。🐂 🍺 ~



subscribe/dispatch


💥 建议直接去看源码文件，因为里边对于每一个接口的注释很详细～



不难看到，上边通过 subscribe进行接口注册订阅函数，我们可以细看这个函数做了什么事情～



function subscribe(listener) {
  // ...

  let isSubscribed = true

  ensureCanMutateNextListeners();
  nextListeners.push(listener)

  return function unsubscribe() {
    if(!isSubscribed) {
      return
    }

    // reducer执行中，你可能无法取消store侦听器
    if (isDispatching) {}

    isSubscribed = false

    // 从 nextListeners 中去除掉当前 listener
    ensureCanMutateNextListeners()
    const index = nextListeners.indexOf(listener)
    nextListeners.splice(index, 1)
}


其实这个方法主要做的事情就是 : 注册 listener，同时返回一个取消事件注册的方法。当调用 store.dispatch 的时候调用 listener ～



思路真的是很严谨了，定义了 isSubscribed、isDispatching来避免意外的发生，同时还对传入对 lister 进行类型判断。考虑到有些人会取消订阅，所以还提供了一个取消订阅的unsubscribe。



紧接着我们再来看看 dispatch，主要是用与发布一个 action 对象，前边有说到了，你想要修改 store 中的数据，唯一方式就是通过 dispatch action，我们来看看它做了什么事情～



function dispatch(action) {
  if (!isPlainObject(action)) {
  }

  if (typeof action.type === 'undefined') {
  }

  // 调用dispatch的时候只能一个个调用，通过dispatch判断调用的状态
  if (isDispatching) {
  }

  try {
    isDispatching = true
    currentState = currentReducer(currentState, action)
  } finally {
    isDispatching = false
  }

  // 遍历调用各个listener
  const listeners = (currentListeners = nextListeners)
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i]
    listener()
  }
  return action
}



不是吧，阿 sir，这么严格，前边就做了各种限制，下边这段 try {} finally {} 也是神操作啊，为了保证 isDispatch在函数内部状态的一致，在 finally 的时候都会将其改为 false。牛掰～



从源码注释里边，我也看到这么一段话 ～



It will be called any time an action is dispatched, and some part of the state tree may potentially have changed.



You may then call getState() to read the current state tree inside the callback.



意味着，当你执行了之前订阅的函数 listener 之后，你必须，通过 store.getState() 去那最新的数据。因为这个订阅函数 listener 是没有参数的，真的很严格。






bindActionCreators


老舍先生的《四世同堂》十九中有一句化 : “他觉得老大实在有可爱的地方，于是，他决定趁热打铁，把话都说净。”，是的，趁热打铁，既然我们说到了 dispatch(action)， 那我们接着说一说: bindActionCreators～



不知道各位有没有写过这样的代码～



import { bindActionCreators } from 'redux';
import * as pengActions from '@store/actions/peng';
import * as kuanActions from '@store/actions/kuan';
import * as userActions from '@store/actions/user';

const mapDispatchToProps => dispatch => {
  return {
    ...bindActionCreators(pengActions, dispatch);
    ...bindActionCreators(kuanActions, dispatch);
    ...bindActionCreators(userActions, dispatch);
  }
}



我们来说说，这个 bindActionCreators 它到底做了什么事情。首先来看官方源码注释：

将值为 action creators 的对象转换为具有相同键的对象

将每个函数包装为“dispatch”调用，以便可以直接调用它们

当然你也可以调用 store.dispatch(MyActionCreator.doSomething)



function bindActionCreator(actionCreator, dispatch) {
  return function (this, ...args) {
    return dispatch(actionCreator.apply(this, args))
  }
}

// bindActionCreators 期望得到的是一个 Object 作为 actionCreators 传进来
export default function bindActionCreators(actionCreators, dispatch) {
  // 如果只是传入一个action，则通过bindActionCreator返回被绑定到dispatch的函数
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
  }

  const boundActionCreators = {} // 最终导出的就是这个对象
  for (const key in actionCreator) {
    const actionCreator = actionCreator[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}



对了，这里大家一定要记住，Action 的取名尽量不要重复，举个 🌰



小彭和阿宽都有一个需求，那就是发起一个修改年龄的 action，本来两不相干，井水不犯河水，于是他两洋洋洒洒的在代码中写下了这段代码 ～ 👇 



// pengAction.js
export function changeAge(params, callback) {
  return {
    type: 'CHANGE_AGE',
    params,
    callback,
  }
}

// kuanAction.js
export function changeAge(params, callback) {
  return {
    type: 'CHANGE_AGE',
    params,
    callback,
  }
}



你说巧不巧，产品让阿华去做一个需求，需要点击按钮的时候，把小彭和阿宽的年龄都改了。阿华想用 bindActionCreators 装 B，于是写下了这段代码



const mapDispatchToProps => dispatch => {
  return {
    ...bindActionCreators(pengActions, dispatch);
    ...bindActionCreators(kuanActions, dispatch);
  }
}


按照我们对 bindActionCreators 的源码理解，它应该是这样的 😯



pengActions = {
  changeAge: action,
}

export default function bindActionCreators(pengActions, dispatch) {
  // ...
  const boundActionCreators = {}

  for (const key in pengActions) {
    // key就是changeAge
    const actionCreator = pengActions[changeAge]
    // ...
    boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
  }
  return boundActionCreators
}



所以最终，这段代码结果是这样的



const mapDispatchToProps => dispatch => {
  return {
    changeAge, // ...bindActionCreators(pengActions, dispatch);
    changeAge // ...bindActionCreators(kuanActions, dispatch);
  }
}



问题知道在哪了吧，所以如何解决呢，我个人看法， 你要么就 actionName 不要一样，可以叫 changePengAge、changeKuanAge，要么就是多包一个对象。



const mapDispatchToProps => dispatch => {
  return {
    peng: {
      ...bindActionCreators(pengActions, dispatch);
    },
    kuan: {
      ...bindActionCreators(kuanActions, dispatch);
    }
  }
}

combineReducers


既然前边都说了，整个应用的 state 都存储在一颗 state tree 中，并且只存在于唯一一个 store 中, 那么我们来看看这究竟是何方神圣～



小彭项目初次搭建的时候，要求小，状态管理比较方便，所以呢，都放在了一个 reducer 中，后边随着不断迭代，于是不断的往这个 reducer 中塞数据。



典型的“屁股决定脑袋”，于是有一天，可能某个天使，给 redux 的开发团队提了一个 `issue， “哎呀，你能不能提供一个 API，把我的所有 reducer 都整合在一块啊，我想分模块化的管理状态”



比如用户模块，就叫 userReducer，商品模块，我们叫 userReducer，订单模块，我们称之为 orderReducer。既然那么多个 reducer，该如何合并成一个呢 ？



于是 redux 提供了 combineReducers 这个 API，看来 redux 的时间管理学学的很好，你看，这么多个 reducer ，都能整合在一起，相比花了很大的功夫～





那我们看看 combineReducers 做了什么事情吧 ～ 在此之前，我们看看我们都怎么用这玩意的～ 👇 



// 两个reducer
const pengReducer = (state = initPengState, action) => {}
const kuanReducer = (state = initKuanState, action) => {}

const appReducer = combineReducers({
  pengReducer,
  kuanReducer,
})
export default function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers) // 得到所有的reducer名

  // 1. 过滤reducers中不是function的键值对，过滤后符合的reducer放在finalReducers中
  const finalReducers = {}
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  const finalReducerKeys = Object.keys(finalReducers)

  // 2. 再一次过滤，判断reducer中传入的值是否合法
  let shapeAssertionError: Error
  try {
    // assertReducerShape 函数用于遍历finalReducers中的reducer，检查传入reducer的state是否合法
    assertReducerShape(finalReducers)
  } catch (e) {
    shapeAssertionError = e
  }

  // 3. 返回一个函数
  return function combination(state, action) {
    // 严格redux又上线了，各种严格的检查
    // ...

    let hasChanged = false // 就是这逼，用来标志这个state是否有更新
    const nextState = {}

    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]
      // 这也就是为什么说combineReducers黑魔法--要求传入的Object参数中，reducer function的名称和要和state同名的原因
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]

      // 将reducer返回的值，存入nextState
      const nextStateForKey = reducer(previousStateForKey, action)
      nextState[key] = nextStateForKey

      // 如果任一state有更新则hasChanged为true
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    hasChanged =
      hasChanged || finalReducerKeys.length !== Object.keys(state).length
    return hasChanged ? nextState : state
  }
}


这个源码其实不多也不难，跟着阿宽这样看下来，也不是很吃力吧？那这里就延伸了一个问题，为什么 redux 必须返回一个新的 state ? 返回旧的不行吗 ?



返回一个新的 state


伊索寓言有句话我特喜欢 : 逃出陷阱比掉入陷阱难之又难，是的，reducer 也有陷阱～ 众所周知啊，reducer 必须是个纯函数，这里有小伙伴懵逼了，这 TM 怎么又多出了一个知识点，不用管，我也不打算多讲。自行百度～







我们来看看，一般情况下我们都怎么写 reducer 的 👇 



function pengReducer(state = initialState, action) {
  switch (action.type) {
    // 这种方式
    case 'CHANGE_AGE':
      return {
        ...state,
        age: action.data.age,
      }
    // 或者这种方式都行
    case 'ADD_AGE':
      return Object.assign({}, state, {
        age: action.data.age,
      })
  }
}


假设，我们不是这么写的，我们直接修改 state，而不是返回一个新的 state，会是怎样的结果～ 👇 



function pengReducer(state = initialState, action) {
  switch (action.type) {
    // 或者这种方式都行
    case 'CHANGE_AGE':
      state.age = action.data.age
      return state
  }
}


当我们触发 action 之后，你会发出 : 卧槽，页面为什么没变化 ... 回到我们的源码，我们可以来看～



const nextStateForKey = reducer(previousStateForKey, action)


这里主要就是，得到通过 reducer 执行之后的 state，它不是一个 key，它是一个 state，然后呢，往下继续执行了这行代码～



hasChanged = hasChanged || nextStateForKey !== previousStateForKey


比较新旧两个对象是否一致，进行的是浅比较法，所以，当我们 reducer 直接返回旧的 state 对象时，Redux 认为没有任何改变，从而导致页面没有更新。



这就是为什么！返回旧的 state 不行，需要返回一个新的 state 原因。我们都知道啊，在 JS 中，比较两个对象是否完全一样，那只能深比较，然而，深比较在真实的应用中代码是非常大的，非常耗性能的，并且如果你的对象嵌套足够神，那么需要比较的次数特别多～



所以 redux 就采取了一个较为“委婉”的解决方案：当无论发生任何变化时，都要返回一个新的对象，没有变化时，返回旧的对象～


applyMiddleware


跪了，感觉 redux 源码中，最难的莫过于中间件了，在说这玩意之前，我们先来聊聊，一些有趣的东西～



一提到 react，不知道大家第一印象是什么，但是有一个词，我觉得绝大部分对人都应该听过，那就是 : 💗 函数式编程 ～



函数式编程
函数是第一等公民

怎么理解，在 JS 中，函数可以当作是变量传入，也可以赋值给一个变量，甚至于，函数执行的返回结果也可以是函数。



const func = function () {}

// 1. 当作参数
function demo1(func) {}

// 2. 赋值给另一个变量
const copy_func = func

// 3. 函数执行的返回结果是函数
function demo2() {
  return func
}


数据是不可变的(Immutable)

在函数式编程语言中，数据是不可变的，所有的数据一旦产生，就不能改变其中的值，如果要改变，那就只能生成一个新的数据。



可能有些小伙伴会有过这个库 : seamless-immutable ，在 redux 中，强调了，不能直接修改 state 的值（上边有说了，不听课的，出去吃屁），只能返回一个新的 state ～



函数只接受一个参数

怎么理解，大伙估计都写了很久的多参数，看到这个懵了啊，我也懵了，但是这就是规矩，无规矩，不成方圆 ～



所以当你看中间件的代码时，你就不会奇怪了，比如这行代码 ～



const middleware = (store) => (next) => (action) => {}


换成我们能够理解的形式，那就是 :



const middleware = (store) => {
  return (next) => {
    return (action) => {}
  }
}


这里有人就疑问了，尼玛，这不就是依赖了三个参数吗，那能不能这样写啊？



const middleware = (store, next, action) => {}


 just you happy ! 你高兴就好，但是函数式编程就是要求，只能有一个参数，这是规矩，懂 ? 在我地盘，你就只能给我装怂 !


组合 compose


组合 compose，这个是个啥玩意，我们来看一段代码 : 👇 



const compose = (f, g) => {
  return (x) => {
    return f(g(x))
  }
}

const add = function (x) {
  return x + 2
}

const del = function (x) {
  return x - 1
}

// 使用组合函数，🧬 基因突变，强强联合
const composeFunction = compose(add, del)(100)


猜一下，执行 composeFunction 打印什么？答对的，给自己鼓个掌 👏



好了，我已经把最为强大的忍术: 函数式编程术语之 compose 组合函数，教给你了～


洋葱模型




这里又有小伙伴懵圈了，怎么又来了一个知识点？不慌，容阿宽给你简单介绍一下 ? 我们上边说了 compose 函数，那么组合函数和洋葱模型有什么关系呢 ？



洋葱模型是本质上是一层层的处理逻辑，而在函数式编程世界里，意味着用函数来做处理单元。先不说其他，我们先上一个 🌰，帮助大家理解～ 👇 



let middleware = []
middleware.push((next) => {
  console.log('A')
  next()
  console.log('A1')
})
middleware.push((next) => {
  console.log('B')
  next()
  console.log('B1')
})
middleware.push((next) => {
  console.log('C')
})

let func = compose(middleware)
func()


猜猜打印顺序是个啥 ？没错，打印结果为 : A -> B -> C -> B1 -> A1



哎哟，不错哦，好像有点感觉了。当程序运行到 next() 的时候会暂停当前程序，进入下一个中间件，处理完之后才会仔回过头来继续处理。







这两张图应该是老图了，而且是唠嗑到洋葱模式必贴的图，就跟你喝酒一样，一定要配花生米（别问为什么，问就是规矩）



我们看这张图，很有意思哈，会有两次进入同一个中间件的行为，而且是在所有第一次的中间件执行之后，才依次返回上一个中间件。你品，你细品～






源码解读


好了，不逼逼了，由于我的查克拉不足，关于其他的函数式编程的忍术要求，就不一一讲了，ok，这里打了个预防针，我们再来看看 applyMiddleware 到底做了什么 丧心病狂 的事情吧～ 👇 



export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, ...args) => {
    const store = createStore(reducer, ...args)
    let dispatch: Dispatch = () => {}

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    }
    const chain = middlewares.map((middleware) => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch,
    }
  }
}


代码极其简短，让我们看一下，干了啥事～ 首先呢返回一个以 createStore 为参数的匿名函数，然后呢，这个函数返回另一个以 reducer, ...args (实际就是 initState, enhancer) 为参数的匿名函数， 接着定义了一个链 chain，这个就很有意思了。



const chain = middlewares.map((middleware) => middleware(middlewareAPI))


我们先是把传入的 middlewares 进行剥皮，并给中间件 middleware 都以我们定义的 middlewareAPI 作为参数注入，所以我们每一个中间件的上下文是 dispatch 和 getState，为什么？为什么要注入这两个玩意？

getState：这样每一层洋葱都可以获取到当前的状态。

dispatch：为了可以将操作传递给下一个洋葱





ok，这样执行完了之后，chain 其实是一个 (next) => (action) => { ... } 函数的数组，也就是中间件剥开后返回的函数组成的数组。之后我们以 store.dispatch 作为参数进行注入～ 通过 compose 对中间件数组内剥出来的高阶函数进行组合形成一个调用链。调用一次，中间件内的所有函数都将被执行。



// 或许换成这种形式，你更加能明白～
function compose(...chain) {
  return store.dispatch => {
    // ...
  }
}

redux 中的 compose


上边说到，这逼就是将我们传入的 chain 形成一个调用链，那我们 see see，它是怎么做到的～ 👇 



export default function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}


还记得上边教你们的组合 compose 吗，我们试着还原一下常人能看得懂的样子 ～



(a, b) => (...args) => a(b(...args))

// 常人能看得懂的
(a, b) => {
  return (...args) {
    return a(b(...args))
  }
}


两个字，牛皮 🐂🍺 不得不感慨，果然是大佬。那么下边，我们来一步步捋一捋这到底是个啥东西。

抛出第一个问题？快速抢答，dispatch 是用来干嘛的？


 🙋 我会我会，dispatch 是用来分发 action 的，good，那么，我们可以得到第一个函数
(store.dispatch) => (action) => {}


问题又来了，我们的 compose 经过一顿骚操作后得到的一组结构相同的函数，最终合并成一个函数。



这里抛出第二个问题，既要传递 dispatch，又要传递 action，那么我们怎么搞？高阶函数用起来





middleware = (store.dispatch, store.getState) => (next) => (action) => {}


ok，那有人就好奇了，这个 next 是个啥玩意啊？其实传入中间件的 next 实际上就是 store.dispatch，奇奇怪怪的问题又出现了



抛出问题三，我们怎样让每一个中间件持有最终的 dispatch



redux 开发者利用了闭包的特性，将内部的 dispatch 与外部进行强绑定，MD，🐂🍺



// 实例demo
let dispatch = () => {}

middlewares.map((middleware) =>
  middleware({
    getState,
    dispatch() {
      return dispatch
    },
  })
)


所以你应该能够明白源码中这段代码的真谛了吧？



//真实源码
let middlewareAPI = {
  getState: store.getState,
  dispatch: (action, ...args) => dispatch(action, ...args),
}

// 其实你把 middlewareAPI 写到 middleware 里边，就等价于上边那玩意了
const chain = middlewares.map((middleware) => middleware(middlewareAPI))


然后接下来我们需要做些什么？重要的话说三遍，上边说了两边，这边再说一边，compose 处理后得到的是一个函数，那么这个函数到底该怎样调用呢。传入 store.dispatch 就好了呀～



// 真实源码
dispatch = compose(...chain)(store.dispatch)


这段代码实际上就等价于:



dispatch = chain1(chain2(chain3(store.dispatch)))


chain1、chain2、chain3 就是 chain 中的元素，进行了一次柯里化，稳。dispatch 在这里边扮演了什么角色？

绑定了各个中间件的 next，说了 next 实际上就是 store.dispatch

暴露一个接口用来接受 action



你可以这么理解，中间件其实就是我们自定义了一个 dispatch，然后这个 dispatch 会按照洋葱模型进行 pipe



what the fuck ! 🐂 🍺 爆粗口就对了。不过这里我还是有一个疑惑，希望看到这的大哥们，能解疑一下 ～



留给我的疑惑: 为什么在 middlewareAPI 中，dispatch 不是直接写成 store.dispatch, 而是用的匿名函数的闭包引用？



// 为什么不这么写....
let middlewareAPI = {
  getState: store.getState,
  dispatch: (action) => store.dispatch(action),
}