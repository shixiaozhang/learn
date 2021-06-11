import { useState } from "react"
import { connect } from "react-redux";
import { getToken } from '../../store/actions'
import { Redirect, useHistory } from "react-router-dom";
function Login(props) {
    console.log(props);
    const history = useHistory();
    const { token, getToken } = props;
    const [username, setName] = useState('')
    const [password, setPass] = useState('')
    const login = () => {
        if (username && password) {
            getToken(username, password)
                .then((data) => {
                    alert("chenggongdenglu!")
                    console.log(data);
                    history.push("/home")
                })
                .catch((error) => {
                    alert(error.msg)
                });
        }
    }
    if (token) {
        return <Redirect to="/home" />;
    }
    return (
        <div>
            登录页
            <div>用户名：<input onChange={(e) => setName(e.target.value)} value={username} /></div>
            <div>密码：<input onChange={(e) => setPass(e.target.value)} value={password} /></div>
            <div><button onClick={login}>登录</button></div>
        </div >
    )
}

export default connect((state) => state.token, { getToken })(Login);