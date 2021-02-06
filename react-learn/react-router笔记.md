## 创建

####  npx create-react-app  my-project



###  react-router-dom  依赖于 react-router 

#### react-router-dom 

###    使用：

###  组件化使用：  

####    引入： import { Switch, Route, BrowserRouter, HashRouter,Router} from 'react-router-dom'

##    1、 两种路由模式：
###      1- BrowserRouter：不带#； 需后台配合
        nginx  添加：try_files $uri /index.html

        node  // 在你应用 JavaScript 文件中包含了一个 script 标签
                // 的 index.html 中处理任何一个 route
                
                app.get('*', function (request, response){
                response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
                    })

####         相关属性：

####            basename="/calendar" 所有位置的基本URL。格式正确的基本名称应以斜杠开头，但不能以斜杠结尾。
                    <BrowserRouter basename="/calendar"/>
                    <Link to="/today"/> // renders <a href="/calendar/today">

 ####               getUserConfirmation：func  用于确认导航的功能。默认使用window.confirm。

                        <BrowserRouter
                            getUserConfirmation={(message, callback) => {
                                // this is the default behavior
                                const allowTransition = window.confirm(message);
                                callback(allowTransition);
                            }}
                        />

####                forceRefresh：布尔   如果true路由器将使用整页刷新页面导航。

####                keyLength：数字  location.key的长度。默认为6。

####                children：节点  要渲染的子元素。

###        2-  HashRouter： 带#

                    <HashRouter
                        basename={optionalString}
                        getUserConfirmation={optionalFunc}
                        hashType={optionalString}
                        >
                        <App />
                    </HashRouter>


####         相关属性：

####            basename="/calendar" 所有位置的基本URL。格式正确的基本名称应以斜杠开头，但不能以斜杠结尾。
                    <HashRouter basename="/calendar"/>
                    <Link to="/today" /> 
                    // renders <a href="#/calendar/today">

####   其他属性与BrowserRouter相同



###      2、默认路由：IndexRoute  当App 的 render 中的this.props.children 还是 undefined渲染



##  Link 组件

    1     <Link to="/about">About</Link>

    2    <Link
            to={{
                pathname: "/courses",//路径
                search: "?sort=name",//参数
                hash: "#the-hash",  //hash值，就是锚点
                state: { fromDashboard: true }//在下一个页面可以这样取到值 (通过props.location.state 取值)
            }}
            />

    3    <Link to="/courses" replace />  当为时true，单击链接将替换历史记录堆栈中的当前条目，而不是添加新条目。

    4  <Link to="/" component={FancyLink} />   如果您想利用自己的导航组件，只需将其通过component道具即可

###   Redirect （重定向）  NavLink（特殊版本<Link>，它将在与当前URL匹配时将样式属性添加到呈现的元素）  与Link用法类似

    if (token) {
        return <Redirect to="/dashboard" />;
    }






###     动态路由


            const routes = [
                    {
                        path: "/sandwiches",
                        component: Sandwiches
                    },
                    {
                        path: "/tacos",
                        component: Tacos,
                        routes: [
                            {
                                path: "/tacos/bus",
                                component: Bus
                            },
                            {
                                path: "/tacos/cart",
                                component: Cart
                            }
                        ]
                    }
                ]
--------
            <Router>
                    <div>
                        <ul>
                        <li>
                            <Link to="/tacos">Tacos</Link>
                        </li>
                        <li>
                            <Link to="/sandwiches">Sandwiches</Link>
                        </li>
                        </ul>

                        <Switch>
                        {routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                        </Switch>
                    </div>
                    </Router>
-------
        function RouteWithSubRoutes(route) {
                return (
                    <Route
                    path={route.path}
                    render={props => (

                        <route.component {...props} routes={route.routes} />
                    )}
                    />
                );
            }

            function Tacos({ routes }) {
                return (
                    <div>
                    <h2>Tacos</h2>
                    <ul>
                        <li>
                        <Link to="/tacos/bus">Bus</Link>
                        </li>
                        <li>
                        <Link to="/tacos/cart">Cart</Link>
                        </li>
                    </ul>

                    <Switch>
                        {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                    </div>
                );
                }




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

##  路线渲染方法

    <Route component={User}>
    <Route render={() => <div>Home</div>}>
    <Route children={({  match, ...rest }) => (
        <li className={match ? "active" : ""}>
          <Link to={to} {...rest} />
        </li>
      )}> 
###   component 

        指定只有当位置匹配时才会渲染的 React 组件，该组件会接收 route props 作为属性

        const User = ({ match }) => {
        return <h1>Hello {match.params.username}!</h1>
        }

        <Route path="/user/:username" component={User} />

###   render: func 
        使用 render 可以方便地进行内联渲染和包装，而无需进行上文解释的不必要的组件重装。

        你可以传入一个函数，以在位置匹配时调用，而不是使用 component 创建一个新的 React 元素。render 渲染方式接收所有与 component 方式相同的 route props。

        // 方便的内联渲染
        <Route path="/home" render={() => <div>Home</div>} />

        // 包装
        const FadingRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={props => (
            <FadeIn>
            <Component {...props} />
            </FadeIn>
        )} />
        )

        <FadingRoute path="/cool" component={Something} />



###   children: func

        有时候不论 path 是否匹配位置，你都想渲染一些内容。在这种情况下，你可以使用 children 属性。除了不论是否匹配它都会被调用以外，它的工作原理与 render 完全一样。

        children 渲染方式接收所有与 component 和 render 方式相同的 route props，除非路由与 URL 不匹配，不匹配时 match 为 null。这允许你可以根据路由是否匹配动态地调整用户界面。如下所示，如果路由匹配，我们将添加一个激活类：

        const ListItemLink = ({ to, ...rest }) => (
        <Route path={to} children={({ match }) => (
            <li className={match ? 'active' : ''}>
            <Link to={to} {...rest} />
            </li>
        )} />
        )

        <ul>
        <ListItemLink to="/somewhere" />
        <ListItemLink to="/somewhere-else" />
        </ul

对动画也很有用

    <Route children={({ match, ...rest }) => (
    {/* Animate 将始终渲染，因此你可以利用生命周期来为其子元素添加进出动画 */}
    <Animate>
        {match && <Something {...rest} />}
    </Animate>
    )} />

### <Route component> 和 <Route render> 优先于 <Route children>，因此不要在同一个 <Route> 中同时使用多个

###  path: string | string[] 写法：


        <Route path="/users/:id">
             <User />
        </Route>

        exact为true，仅当路径location.pathname 完全匹配时才匹配
        <Route exact path="/one">
            <About />
        </Route>

        strict: bool
        当使用时true，带有path斜杠的只会与location.pathname带有斜杠的匹配。当中有其他网址段时，此选项无效location.pathname。
        <Route strict path="/one/">
            <About />
        </Route>

        路径	location.pathname
        /one/	/one	没有
        /one/	/one/	是
        /one/	/one/two	是

        <Route exact strict path="/one">
        <About />
        </Route>

        路径	location.pathname
        /one	/one	是
        /one	/one/	没有
        /one	/one/two	没有


        <Route sensitive path="/one">
        <About />
        </Route>

        路径	location.pathname	
        /one	/one	true	是
        /One	/one	true	没有
        /One	/one	false	是




##    钩子：适用hooks,函数组件


###  useHistory: 该useHistory挂钩使您可以访问history可用于导航的实例。 React钩子必须在React函数组件或自定义React Hook函数中调用

###  跳转

        import { useHistory } from "react-router-dom";

        function HomeButton() {
        let history = useHistory();

        function handleClick() {
            history.push("/home")//去home
            <!-- history.goBack()//返回上一页 -->
             <!-- history.replace(location) -->
        }

        return (
            <button type="button" onClick={handleClick}>
            Go home
            </button>
        );
        }

###  useLocation  useLocation挂钩返回location代表当前URL的对象。您可以将其视为类似于URL更改时useState会返回新值的a location


        <Router>
            <App />
        </Router>
            
        function usePageViews() {
            let location = useLocation();
            React.useEffect(() => {
                ga.send(["pageview", location.pathname]);
            }, [location]);
            }

        function App() {
            usePageViews();
            return <Switch>...</Switch>;
            }


    打印：  Object {pathname: "/blog/4", search: "", hash: "", state: undefined}
            pathname: "/blog/4"
            search: ""
            hash: ""
            state: undefined

###  useParams useParams返回URL参数的键/值对的对象。使用它来访问match.params当前<Route>
             
                <Router>
                    <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/blog/:slug">
                        <BlogPost />
                    </Route>
                    </Switch>
                </Router>


                function BlogPost() {
                let { slug } = useParams();
                return <div>Now showing post {slug}</div>;
                }

###   useRouteMatch  用与 <Route> 一样的方式匹配当前 URL，但是不会渲染对应的组件，只是返回 match



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
                    mixins:[RouteContext],

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


###   generatePath 该generatePath功能可用于生成路线的URL。内部使用该path-to-regexp库。

     将路径编译为正则表达式的结果将被缓存，因此生成具有相同模式的多个路径不会产生任何开销。

####   generatePath （path，params）
            path：作为路径属性提供给Route组件的模式。string

            params： 具有要使用的模式的相应参数的对象。如果提供的参数和路径不匹配，将引发错误； obj

        import { generatePath } from "react-router";

        generatePath("/user/:id/:entity(posts|comments)", {
        id: 1,
        entity: "posts"
        });
        // Will return /user/1/posts


# 一个跳转完成时可在下级页面，获取到props 包含 history location match 三个参数

### history

####  创建最初history：还可以用useHistory hook


        import { createBrowserHistory } from 'history';

        const history = createBrowserHistory();

        // 获取当前 location
        const location = history.location;

        // 监听当前 location改变
        const unlisten = history.listen((location, action) => {
        // location is an object like window.location
        console.log(action, location.pathname, location.state);
        });

        //使用push、replace和go导航
        history.push('/home', { some: 'state' });

        //要停止侦听，请调用从listen（）返回的函数
        unlisten();



#### 创建时的默认值：

        createBrowserHistory({
        basename: '', // url
        forceRefresh: false, // 是否强制刷新整个页面
        keyLength: 6, // location.key长度
        // 用于与用户确认导航功能
        getUserConfirmation: (message, callback) => callback(window.confirm(message))
        });

        createHashHistory({
        basename: '', // The base URL of the app (see below)
        hashType: 'slash', // 要是用的hash类型
        // A function to use to confirm navigation with the user (see below)
        getUserConfirmation: (message, callback) => callback(window.confirm(message))
        });

        createMemoryHistory({
        initialEntries: ['/'], // The initial URLs in the history stack
        initialIndex: 0, // 历史记录堆栈的起始索引
        keyLength: 6, // The length of location.key
        // A function to use to confirm navigation with the user. Required
        // if you return string prompts from transition hooks (see below)
        getUserConfirmation: null
        });
    
### history 属性、方法：

        history 对象通常具有以下属性和方法：
                length -（数字）历史记录堆栈中的条目数
                action- （字符串）当前动作（PUSH，REPLACE，或POP）
                location-（对象）当前位置。可能具有以下属性：
                pathname -（字符串）URL的路径
                search -（字符串）URL查询字符串
                hash -（字符串）URL哈希片段
                state-（对象）特定于位置的状态，例如push(path, state)在将该位置推入堆栈时所提供的状态。仅在浏览器和内存历史记录中可用。
                push(path, [state]) -（功能）将新条目推入历史记录堆栈
                replace(path, [state]) -（函数）替换历史记录堆栈上的当前条目
                go(n)-（函数）通过n条目在历史记录堆栈中移动指针
                goBack() -（功能）等同于 go(-1)
                goForward() -（功能）等同于 go(1)
                block(prompt)-（功能）防止导航（请参阅历史记录文档）


###  location 表示应用程序现在所在的位置
####    路由器将在几个地方为您提供位置对象：


        Route component as this.props.location
        Route render as ({ location }) => ()
        Route children as ({ location }) => ()
        withRouter as this.props.location


### location 属性：
        {
        key: 'ac3df4', // not with HashHistory!
        pathname: '/somewhere',
        search: '?some=search-string',
        hash: '#howdy',
        state: {
            [userDefined]: true
        }
        }

        这些后面可传一个location ，用来返回响应的位置
        Web Link to
        Native Link to
        Redirect to
        history.push
        history.replace


        // 普通情况
        <Link to="/somewhere"/>

        //使用location 对象
        const location = {
        pathname: '/somewhere',
        state: { fromDashboard: true }
        }

        <Link to={location}/>
        <Redirect to={location}/>
        history.push(location)
        history.replace(location)

###  match

    一个match对象包含有关如何信息<Route path>相匹配的URL。match对象包含以下属性：
            params -（对象）从对应于路径动态段的URL解析的键/值对
            isExact-（布尔值）true如果整个URL都匹配（没有结尾字符）
            path-（字符串）用于匹配的路径模式。用于构建嵌套的<Route>s
            url-（字符串）URL的匹配部分。用于构建嵌套的<Link>s


    可以match在各个地方访问对象：

            Route component as this.props.match
            Route render as ({ match }) => ()
            Route children as ({ match }) => ()
            withRouter as this.props.match
            matchPath as the return value
            useRouteMatch as the return value


###   withRouter
高阶组件中的withRouter, 作用是将一个组件包裹进Route里面, 然后react-router的三个对象history, location, match就会被放进这个组件的props属性中.

withRouter的作用就是, 如果我们某个东西不是一个Router, 但是我们要依靠它去跳转一个页面, 比如点击页面的logo, 返回首页, 这时候就可以使用withRouter来做.
在这个例子中, 我将span使用withRouter作为一个可点击跳转的Link





        import React from "react";
        import PropTypes from "prop-types";
        import { withRouter } from "react-router";

        

        class ShowTheLocation extends React.Component {
            static propTypes = {
                match: PropTypes.object.isRequired,
                location: PropTypes.object.isRequired,
                history: PropTypes.object.isRequired
            };

            render() {
                const { match, location, history } = this.props;

                return <div>You are now at {location.pathname}</div>;
            }
        }


        const ShowTheLocationWithRouter = withRouter(ShowTheLocation);


#       文档里面的例子：
        import {
            BrowserRouter as Router,
            Switch,
            Route,
            Link,
            useParams,
             Redirect,
            useHistory,
            useLocation
            } from "react-router-dom";

##      例子：


###  1

         <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>

###  2、url参数

        <li>
            <Link to="/netflix">Netflix</Link>
          </li>
          <li>
            <Link to="/zillow-group">Zillow Group</Link>
          </li>
          <li>
            <Link to="/yahoo">Yahoo</Link>
          </li>
          <li>
            <Link to="/modus-create">Modus Create</Link>
          </li>



            <Switch>
                    <Route path="/:id" children={<Child />} />
            </Switch>



        function Child() {
        // We can use the `useParams` hook here to access
        // 我们可以在此处使用useParams 钩子访问 url 的动态片段
        // the dynamic pieces of the URL.
        let { id } = useParams();

        return (
            <div>
            <h3>ID: {id}</h3>
            </div>
        );
        }


### 3 、嵌套：

            <Router>
                <div>
                    <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                    </ul>

                    <hr />

                    <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/topics">
                        <Topics />
                    </Route>
                    </Switch>
                </div>
            </Router>


            function Topics() {
            // The `path` lets us build <Route> paths that are
            // relative to the parent route, while the `url` lets
            // us build relative links.
            // path 获取路径；
            //url  建立相对于父路由的链接

            let { path, url } = useRouteMatch();

            return (
                <div>
                <h2>Topics</h2>
                <ul>
                    <li>
                    <Link to={`${url}/rendering`}>Rendering with React</Link>
                    </li>
                    <li>
                    <Link to={`${url}/components`}>Components</Link>
                    </li>
                    <li>
                    <Link to={`${url}/props-v-state`}>Props v. State</Link>
                    </li>
                </ul>

                <Switch>
                    <Route exact path={path}>
                    <h3>Please select a topic.</h3>
                    </Route>
                    <Route path={`${path}/:topicId`}>
                    <Topic />
                    </Route>
                </Switch>
                </div>
            );
            }

### 4、重定向：

        //这个例子有3个页面：一个公共页面，一个受保护的页面

        //页面和登录屏幕。为了看到被保护的

        //页面，您必须先登录。相当标准的东西。

        //首先，访问公共页面。然后，访问受保护的

        //页面。你还没有登录，所以你被重定向了

        //到登录页面。登录后，您将被重定向

        //返回受保护页面。

        //请注意，URL每次都会更改。如果你点击后面

        //在这一点上，你希望回到

        //登录页面？不！你已经登录了。试试看，

        //你会看到你回到你访问过的页面

        //在登录之前，在公共页面。

            export default function AuthExample() {
            return (
                <ProvideAuth>
                <Router>
                    <div>
                    <AuthButton />

                    <ul>
                        <li>
                        <Link to="/public">Public Page</Link>
                        </li>
                        <li>
                        <Link to="/protected">Protected Page</Link>
                        </li>
                    </ul>

                    <Switch>
                        <Route path="/public">
                        <PublicPage />
                        </Route>
                        <Route path="/login">
                        <LoginPage />
                        </Route>
                        <PrivateRoute path="/protected">
                        <ProtectedPage />
                        </PrivateRoute>
                    </Switch>
                    </div>
                </Router>
                </ProvideAuth>
            );
            }

            const fakeAuth = {
            isAuthenticated: false,
            signin(cb) {
                fakeAuth.isAuthenticated = true;
                setTimeout(cb, 100); // fake async
            },
            signout(cb) {
                fakeAuth.isAuthenticated = false;
                setTimeout(cb, 100);
            }
            };

            /** For more details on
            * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
            * refer to: https://usehooks.com/useAuth/
            */
            const authContext = createContext();

            function ProvideAuth({ children }) {
            const auth = useProvideAuth();
            return (
                <authContext.Provider value={auth}>
                {children}
                </authContext.Provider>
            );
            }

            function useAuth() {
            return useContext(authContext);
            }

            function useProvideAuth() {
            const [user, setUser] = useState(null);

            const signin = cb => {
                return fakeAuth.signin(() => {
                setUser("user");
                cb();
                });
            };

            const signout = cb => {
                return fakeAuth.signout(() => {
                setUser(null);
                cb();
                });
            };

            return {
                user,
                signin,
                signout
            };
            }

            function AuthButton() {
            let history = useHistory();
            let auth = useAuth();

            return auth.user ? (
                <p>
                Welcome!{" "}
                <button
                    onClick={() => {
                    auth.signout(() => history.push("/"));
                    }}
                >
                    Sign out
                </button>
                </p>
            ) : (
                <p>You are not logged in.</p>
            );
            }

            // A wrapper for <Route> that redirects to the login
            // screen if you're not yet authenticated.
            function PrivateRoute({ children, ...rest }) {
            let auth = useAuth();
            return (
                <Route
                {...rest}
                render={({ location }) =>
                    auth.user ? (
                    children
                    ) : (
                    <Redirect
                        to={{
                        pathname: "/login",
                        state: { from: location }
                        }}
                    />
                    )
                }
                />
            );
            }

            function PublicPage() {
            return <h3>Public</h3>;
            }

            function ProtectedPage() {
            return <h3>Protected</h3>;
            }

            function LoginPage() {
            let history = useHistory();
            let location = useLocation();
            let auth = useAuth();

            let { from } = location.state || { from: { pathname: "/" } };
            let login = () => {
                auth.signin(() => {
                history.replace(from);
                });
            };

            return (
                <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={login}>Log in</button>
                </div>
            );
            }

### * 递归路径


 <Router>
      <Switch>
        <Route path="/:id">
          <Person />
        </Route>
        <Route path="/">
          <Redirect to="/0" />
        </Route>
      </Switch>
</Router>

 function Person() {
  let { url } = useRouteMatch();
  let { id } = useParams();
  let person = find(parseInt(id));

  return (
    <div>
      <h3>{person.name}’s Friends</h3>

      <ul>
        {person.friends.map(id => (
          <li key={id}>
            <Link to={`${url}/${id}`}>{find(id).name}</Link>
          </li>
        ))}
      </ul>

      <Switch>
        <Route path={`${url}/:id`}>
          <Person />
        </Route>
      </Switch>
    </div>
  );
}

const PEEPS = [
  { id: 0, name: "Michelle", friends: [1, 2, 3] },
  { id: 1, name: "Sean", friends: [0, 3] },
  { id: 2, name: "Kim", friends: [0, 1, 3] },
  { id: 3, name: "David", friends: [1, 2] }
];

function find(id) {
  return PEEPS.find(p => p.id === id);
}


