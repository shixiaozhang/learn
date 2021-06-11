import Login from '@view/login'
import Home from '@view/home'
import About from '@view/about'
import { BrowserRouter as Router, useParams, useRouteMatch, HashRouter, Switch, Link, Route } from 'react-router-dom'




export default (props) => {
    return (
        <Router >
            <ul class="nav">
                <li class="menu">
                    <Link to="/">React Home</Link>
                </li>
                <li class="menu">
                    <Link to="/about">React about</Link>
                </li>
            </ul>
            <div class="container">
                <div class="header" >Child Header</div>
                <div class="router-view">
                    <Switch>
                        <Route path='/' exact component={Home} >
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                    </Switch>
                </div>
            </div>

        </Router>
    )

}
