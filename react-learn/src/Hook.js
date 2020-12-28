/*
 * @Author: your name
 * @Date: 2020-12-24 17:17:22
 * @LastEditTime: 2020-12-28 16:10:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\Hook.js
 */
import React, { useState, useEffect, useContext, useReducer } from 'react'

const themes = {
    light: 'light',
    dark: 'dark'
};

const ThemeContext = React.createContext(themes.light)


function Example() {
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState({ a: 12 })//浅比较

    useEffect(() => {
        document.title = `${count}`
        console.log(count2);
    })
    useEffect(() => {
        console.log(count2, 111)
    }, [count2])//也是浅比较
    function add() {
        let a = {
            a: 13
        }

        setCount2(prevCount => {
            let obj = Object.assign(prevCount, { a: 15 })
            return obj//不会更新dom
        })
        //或
        setCount2(a)//会更新dom
        // 浅比较，替换整个{}时才更新；
    }


    return (
        <ThemeContext.Provider value={themes.dark}>
            <p>click{count} times</p>
            <button onClick={() => {
                setCount(count + 1)
            }}>dianwo</button>
            <p>click{count2.a} times</p>
            <button onClick={() => {
                count2.a++
                setCount2(count2)//不更新dom
            }}>dianwo</button>
            <button onClick={add}>add</button>
            {/* <Counter></Counter> */}
            <Counter3></Counter3>
            <Aaa></Aaa>
            <ReducerCom></ReducerCom>
          
        </ThemeContext.Provider>
    )
}

function Counter() {
    const [count, setCount] = useState(0);
    console.log(count);
    setInterval(() => {
        setCount(count + 1);//更新会重复调用Counter构建dom
    }, 1000);
    // 造成的后果就是能一直更新count，
    // 但是每一轮循环都会执行上面这行代码，定时器越来越多，
    // 然后，就卡死啦，而且每个定时器都会执行一遍，
    // 那么屏幕上的数字每秒都会在跳，可以试试看
    return <h1>{count}</h1>;
}

function Counter3() {
    const [count, setCount] = useState(0)
    const theme = useContext(ThemeContext)

    function add() {
        setCount(count + 1)
    }
    function handleClickFn() {

        setCount((prevCount) => {
            return prevCount + 1
        })
    }
    return (
        <>
            <h1> count:{count}</h1>
            <button onClick={add}>++</button>
            <button onClick={handleClickFn}>+</button>
            <ThemeContext.Consumer>
                {
                    value => {
                        return <h1>ThemeContext.Consumer:{value}</h1>
                    }
                }
            </ThemeContext.Consumer>
            <h1>useContext:{theme}</h1>
        </>
    )
}

class Aaa extends React.Component {//不是浅比较
    constructor(props) {
        super(props)
        this.state = {
            names: {
                id: {
                    a: 0
                }
            }
        }

    }
    static contextType = ThemeContext
    changeId = () => {
        let names = this.state.names
        let id = names.id.a + 1//++ 不能用
        names = Object.assign(names, {
            id: {
                a: id
            }
        })
        console.log(names);
        this.setState({
            names: names
        })
        console.log(this.state.names.id);

    }
    upDate = () => {
        this.forceUpdate()
    }
    render() {

        return (
            <>
                <p>{this.state.names.id.a}</p>
                <button onClick={this.changeId}>+1</button><br />
                <button onClick={this.upDate}>强制刷新</button>
                <h1>contextType:{this.context}</h1>
            </>
        )
    }
}
const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error()
    }
}

function ReducerCom() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (

        <>
            count:{state.count}

            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>

        </>
    )


}


// 定义初始化值
const initState = {
    name: '',
    pwd: '',
    isLoading: false,
    error: '',
    isLoggedIn: false,
}
// 定义state[业务]处理逻辑 reducer函数
function loginReducer(state, action) {
    switch(action.type) {
        case 'login':
            return {
                ...state,
                isLoading: true,
                error: '',
            }
        case 'success':
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false,
            }
        case 'error':
            return {
                ...state,
                error: action.payload.error,
                name: '',
                pwd: '',
                isLoading: false,
            }
        default: 
            return state;
    }
}
// 定义 context函数
const LoginContext = React.createContext();
function LoginPage() {
    const [state, dispatch] = useReducer(loginReducer, initState);
    const { name, pwd, isLoading, error, isLoggedIn } = state;
    const login = (event) => {
        event.preventDefault();
        dispatch({ type: 'login' });
        login({ name, pwd })
            .then(() => {
                dispatch({ type: 'success' });
            })
            .catch((error) => {
                dispatch({
                    type: 'error',
                    payload: { error: error.message }
                });
            });
    }
    // 利用 context 共享dispatch
    return ( 
        <LoginContext.Provider value={{dispatch}}>
            <LoginButton />
        </LoginContext.Provider>
    )
}
function LoginButton() {
    // 子组件中直接通过context拿到dispatch，出发reducer操作state
    const dispatch = useContext(LoginContext);
    // const click = () => {
    //     if (error) {
    //         // 子组件可以直接 dispatch action
    //         dispatch({
    //             type: 'error',
    //             payload: { error: error.message }
    //         });
    //     }
    // }
}



// useMemo、useCallback





export default Example