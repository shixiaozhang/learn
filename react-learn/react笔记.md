## 创建

####  npx create-react-app  my-project



###  react-router-dom  依赖于 react-router 

#### react-router-dom 

###    使用：

###  组件化使用：  

####    引入： import { Switch, Route, BrowserRouter, HashRouter,Router} from 'react-router-dom'

###        1、 两种路由模式：
####                    BrowserRouter：不带#； 需后台配合
                                                nginx  添加：try_files $uri /index.html
                                                node  // 在你应用 JavaScript 文件中包含了一个 script 标签
                                                        // 的 index.html 中处理任何一个 route
                                                        app.get('*', function (request, response){
                                                        response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
                                                         })

####                     HashRouter： 带#



###      2、默认路由：IndexRoute  当App 的 render 中的this.props.children 还是 undefined渲染


###     动态路由
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={App}>
                        <IndexRoute component={Dashboard} />
                        <Route path="about" component={About} />
                        <Route path="inbox" component={Inbox}>
                            <Route path="messages/:id" component={Message} />
                        </Route>
                    </Route>
                </Switch>
            </BrowserRouter>


### 或

            const routes = [
                {
                    path: '/home',
                    component: Home
                }]

            <Switch>
                <Route exact path="/" render={() =>
                    <Redirect to='/home'></Redirect>} />
                {
                    routes.map((route, i) => {
                    return <RouteWithSubRoutes key={i} {...route} />
                    })
                }
                <Route component={ErrorPage} />
            </Switch>

### 或

        <Switch>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/users">
                <Users />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>



##    钩子：适用hooks


###  useHistory: 该useHistory挂钩使您可以访问history可用于导航的实例。 React钩子必须在React函数组件或自定义React Hook函数中调用
###  跳转

        import { useHistory } from "react-router-dom";

        function HomeButton() {
        let history = useHistory();

        function handleClick() {
            history.push("/home")//去home
            history.goBack()//返回
        }

        return (
            <button type="button" onClick={handleClick}>
            Go home
            </button>
        );
        }




###    路由守卫：

                routerWillLeave 返回值有以下两种：

                return false 取消此次跳转
                return 返回提示信息，在离开 route 前提示用户进行确认。

####        在 route 组件 中引入 Lifecycle mixin 来安装这个钩子。

                import { Lifecycle } from 'react-router'

                const Home = React.createClass({

                // 假设 Home 是一个 route 组件，它可能会使用
                // Lifecycle mixin 去获得一个 routerWillLeave 方法。
                mixins: [ Lifecycle ],

                routerWillLeave(nextLocation) {
                    if (!this.state.isSaved)
                    return 'Your work is not saved! Are you sure you want to leave?'
                },

                // ...

                })

####        如果你想在一个深层嵌套的组件中使用 routerWillLeave 钩子，只需在 route 组件 中引入 RouteContext mixin，这样就会把 route 放到 context 中。

                import {Lifecycle,RouteContext} from 'react-router'

                const Home=React.createClass({
                    // route 会被放到 Home 和它子组件及孙子组件的 context 中，
                    // 这样在层级树中 Home 及其所有子组件都可以拿到 route。
                    mixins;[RouteContext],

                    render(){
                        return <NestedForm>
                    }
                })

                const NestedForm =React.createClass({
                    // 后代组件使用 Lifecycle mixin 获得
                    // 一个 routerWillLeave 的方法。

                    mixins:[Lifecycle],

                    routerWillLeave(nextLocation){
                        if(!this.state.isSaved) return `xxxxx`
                    }
                })


###   js函数触发导航：

####      组件内部可以使用 this.context.router 来实现导航


        // your main file that renders a Router
        import { Router, browserHistory } from 'react-router'
        import routes from './app/routes'
        render(<Router history={browserHistory} routes={routes}/>, el)


        // somewhere like a redux/flux action file:
        import { browserHistory } from 'react-router'
        browserHistory.push('/some/path')