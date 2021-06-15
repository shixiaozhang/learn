import Home from './view/home';
import About from './view/about';
import Login from './view/login';
import { connect } from 'react-redux'
import { BrowserRouter as Routers, Route, Redirect, Link, Switch, } from 'react-router-dom'

import './style/App.css'


function App(props) {
  const { token } = props

  return (
    <Routers basename={window.__POWERED_BY_QIANKUN__ ? '/react-micro-app' : '/'}>
      {
        !token && <Redirect to="/login" />
      }
      {token && <ul className="nav">
        <li className="menu">
          <Link to="/">React Home</Link>
        </li>
        <li className="menu">
          <Link to="/about">React about</Link>
        </li>

      </ul>}
      <div className="container">
        {token && <div className="header"  >Child Header</div>}
        <div className="router-view">
          <Switch>
            <Route path='/' exact component={Home} >
            </Route>
            <Route path='/about' component={About}>
            </Route>
            <Route path='/login' component={Login}>
            </Route>
          </Switch>
        </div>
      </div>
    </Routers>

  );
}
export default connect((state) => state.token)(App);

