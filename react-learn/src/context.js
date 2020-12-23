
/**
 * Context:
 * 
 * 在一个典型的 React 应用中，
 * 数据是通过 props 属性自上而下（由父及子）进行传递的，
 * 但这种做法对于某些类型的属性而言是极其繁琐的
 * （例如：地区偏好，UI 主题），
 * 这些属性是应用程序中许多组件都需要的。
 * Context 提供了一种在组件之间共享此类值的方式，
 * 而不必显式地通过组件树的逐层传递 props
 * 
 * API
 *   React.createContext
 *   Context.Provider
 *   Class.contextType
 *   Context.Consumer
 *   Context.displayName
 */



import React, { Component, createContext } from 'react'

// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContent = createContext('light');

const UserContext = React.createContext({
    name: 'Guest',

});


class Bdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: 'dark',
            user: {
                name: 'Guest'
            }
        }
    }

    render() {
        // @ Provider
        // 使用一个 Provider 来当theme 传递给一下组件树。
        // 无论多深多能传递下去。
        return (

            <ThemeContent.Provider value={this.state.theme}>
                <UserContext.Provider value={this.state.user}>
                    <Toolbar></Toolbar>
                    <Layout></Layout>
                    00000
                </UserContext.Provider>
            </ThemeContent.Provider>

        )
    }
}

// 中间件

function Toolbar(props,aa,cc,v,bb,dd) {
    return (
        <div>
            <ThemeButton></ThemeButton>
        </div>
    )
}



class test{
    constructor(name){

    }
}

// 中间件2

function Layout() {
    return (
        <div>
            {/* <Sidebar /> */}
            <Content />
        </div>
    )
}

// 一个组件可能会消费多个 context
function Content() {
    return (
        <ThemeContent.Consumer>
            {theme => (
               
                    <UserContext.Consumer>

                        {user => 
                           
                            (<ProfilePage user={user} theme={theme} >
                                <p>11111</p>
                            </ProfilePage>)

                        }
                    </UserContext.Consumer>
                )
            }

        </ThemeContent.Consumer>

    )
}

class ThemeButton extends Component {

    // 指定 contextType 读取当前的 theme context。
    // React 会往上找到最近的 theme Provider，然后使用它的值。
    // 在这个例子中，当前的 theme 值为 “dark”。
    static contextType = ThemeContent;
    render() {
        return (
            <button theme={this.context}>{this.context}</button>
        )
    }
}

function ProfilePage(props) {
    console.log(props);
    return (
        <div>
            <h1>user:{props.user.name}</h1>
            <h1>theme:{props.theme}</h1>
            {props.children}
        </div>
    )
}


export default Bdd