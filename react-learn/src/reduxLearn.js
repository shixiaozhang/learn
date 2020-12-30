/*
 * @Author: your name
 * @Date: 2020-12-29 11:25:44
 * @LastEditTime: 2020-12-30 17:24:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\reduxLearn.js
 */
import { createStore } from 'redux'

/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case "DECREMENT":
            return state - 1;

        default:
            return state;
    }
}
let store = createStore(counter)

/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * 其它的常量
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action 创建函数
 */

export function addTodo(text) {
    return { type: ADD_TODO, text }
}

export function toggleTodo(index) {
    return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}



// ----------------------------------------------------


const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};


function todoApp(state = initialState, action) {
    // 这里暂不处理任何 action，
    // 仅返回传入的 state。
    switch (action.type) {
        case SET_VISIBILITY_FILTER:

            return { ...state, visibilityFilter: action.filter };

        case ADD_TODO:
            return {
                ...state
                , todos: [
                    ...state.todos,
                    {
                        text: action.text,
                        completed: false
                    }
                ]
            }

        case TOGGLE_TODO:
            return {
                ...state
                , todos: state.todos.map((todo, index) => {
                    if (index === action.index) {
                        return { ...todo, completed: !todo.completed }
                    }
                    return todo
                })
            }
        default:
            return state;
    }

}



function todoApp1(state = initialState, action) {
    //?提出todos的
    switch (action.type) {
        case SET_VISIBILITY_FILTER:

            return { ...state, visibilityFilter: action.filter };

        case ADD_TODO:
            return {
                ...state,
                todos: todos(state.todos, action)
            }

        case TOGGLE_TODO:
            return {
                ...state,
                todos: todos(state.todos, action)
            }
        default:
            return state;
    }

}


function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:

            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];

        case TOGGLE_TODO:
            return state.todos.map((todo, index) => {
                if (index === action.index) {
                    return { ...todo, completed: !todo.completed }
                }
                return todo
            })

        default:
            return state
    }

}

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:

            return action.filter

        default:
            return state
    }
}

// ?终极版
function todoApp2(state = {}, action) {//提出todos和visibilityFilter的

    return {
        todos: todos(state.todos, action),
        visibilityFilter: visibilityFilter(state.visibilityFilter, action)
    }

}
// 

// ?Redux 提供了 combineReducers() 工具类来做上面 todoApp 做的事情，
// ?这样就能消灭一些样板代码了。有了它，可以这样重构 todoApp
import { combineReducers } from 'redux'
// ? 框架版
const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp


// const reducer = combineReducers({
//     a: doSomethingWithA,
//     b: processB,
//     c: c
// })
/**
 * ? 两个reducer等价
 */
// function reducer(state = {}, action) {
//     return {
//         a: doSomethingWithA(state.a, action),
//         b: processB(state.b, action),
//         c: c(state.c, action)
//     }
// }


/**
* ? Store 就是把它们联系到一起的对象。Store 有以下职责：
* ?     维持应用的 state；
* ?     提供 getState() 方法获取 state；
* ?     提供 dispatch(action) 方法更新 state；
* ?     通过 subscribe(listener) 注册监听器;
* ?     通过 subscribe(listener) 返回的函数注销监听器
* ? Redux 应用只有一个单一的 store
*/

//?创建 store 
let store = createStore(todoApp)

//? 打印初始状态
console.log(store.getState())

// ?每次 state 更新时，打印日志
// ?注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() =>
    console.log(store.getState())
)

// ?发起一系列 action
store.dispatch(addTodo('Learn about actions'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))
// ?停止监听 state 更新
unsubscribe();

//?搭配react：
// ? Redux 和 React 之间没有关系。
// ? Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。

/**
 * ? 容器组件（Smart/Container Components）和展示组件（Dumb/Presentational Components）
 * 
 */



