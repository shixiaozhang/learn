// 基于路由的代码分割

import React, { Component, Suspense, lazy } from 'react'
import { BrowserRouter as Router, HashRouter, Switch, Link, Route } from 'react-router-dom'

// import App from './App'
// import Login from './Login'
import A from './routers/A'
import B from './routers/B'
import C from './routers/C'

const App = lazy(() =>  import('./App') );
const Login = lazy(() => import('./Login'));


const Routers = (props) => {
    return (
        <Router >
            <Suspense fallback={<div>1</div>}>
                <Switch>
                    <Route path='/' exact component={App} >
                       
                    </Route>
                    {/* <Route path='/other' exact render={() => <div><h1>other 组件</h1></div>}>
                        <Route path=':id' >
                            <Login />
                        </Route>
                    </Route> */}

                </Switch>
            </Suspense>
        </Router>
    )


}


export default Routers