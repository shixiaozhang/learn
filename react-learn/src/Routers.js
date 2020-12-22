// 基于路由的代码分割

import React, { Component, Suspense, lazy } from 'react'
import { BrowserRouter as Router, useParams, useRouteMatch, HashRouter, Switch, Link, Route } from 'react-router-dom'

// import App from './App'
// import Login from './Login'
import A from './routers/A'
import B from './routers/B'
import C from './routers/C'

const App = lazy(() => import('./App'));
const Login = lazy(() => import('./Login'));


const Routers = (props) => {
    
    return (
        <Router >
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/topics">Topics</Link>
                </li>
            </ul>
            <Suspense fallback={<div>1</div>}>
                <Switch>
                    <Route path='/' exact component={App} >
                    </Route>
                    <Route path="/topics">
                        <R1 />
                    </Route>
                </Switch>
            </Suspense>
        </Router>
    )

}


function R1() {
    let { path, url } = useRouteMatch();
    console.log(path, url);
    
    return (
        <>
            <h1>r1</h1>

            <ul>
                <li>
                    <Link to={`${url}/A`}>Rendering with React</Link>
                </li>
                <li>
                    <Link to={`${url}/B`}>Components</Link>
                </li>
                <li>
                    <Link to={`${url}/C`}>Props v. State</Link>
                </li>
            </ul>
                <Route exact path={path}>
                    <h3>Please select a topic.</h3>
                </Route>
                <Route path={`${path}/:topicId`} >
                    <Topic></Topic>
                </Route>
        </>
    )
}
function Topic() {
    // The <Route> that rendered this component has a
    // path of `/topics/:topicId`. The `:topicId` portion
    // of the URL indicates a placeholder that we can
    // get from `useParams()`.
    let { topicId } = useParams();
    if (topicId == 'A') {
        return <A />
    } else if (topicId == 'B') {
        return <B />
    } else {
        return <C />
    }

}

export default Routers