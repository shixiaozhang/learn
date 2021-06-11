import Home from './view/home';
import About from './view/about';
import { connect } from 'react-redux'
import { Route, Redirect, Link, Switch, useRouteMatch } from 'react-router-dom'

import './style/App.css'


function App(props) {
  let { path, url } = useRouteMatch();
  console.log(path, url);
  const { token } = props
  if (!token) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <ul className="nav">
        <li className="menu">
          <Link to="/home">React Home</Link>
        </li>
        <li className="menu">
          <Link to={`${path}/about`}>React about</Link>
        </li>
        
      </ul>
      <div className="container">
        <div className="header" >Child Header</div>
        <div className="router-view">
          <Switch>
            <Route path={path} exact component={Home} >
            </Route>
            <Route path={`${path}/about`} component={About}>
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}
export default connect((state) => state.token)(App);

