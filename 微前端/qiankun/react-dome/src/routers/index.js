import App from '../App'
import login from '../view/login';
import { connect } from 'react-redux'
import { BrowserRouter as Routers, Route, Redirect, Switch } from 'react-router-dom'

const Router = (props) => {
    console.log(props);
    // const { token } = props
    // if (!token) {
    //     return <Redirect to="/login" />;
    // }
    return (
        <>
            <Routers>
                <Redirect from='/' to="/home" />
                <Switch>
                    <Route path='/home' component={App} >
                    </Route>
                    <Route path="/login" component={login}>
                    </Route>
                </Switch>
            </Routers>
        </>
    )

}

export default connect((state) => state.token)(Router);