import { useState } from "react"


function Login(props) {
    const [username, setName] = useState('')
    const [password, setPass] = useState('')
    function login() {
        if (usernamez && password.value) {
            // store.commit("setToken", "123456");
            // router.push({
            //   path: "/",
            // });
            console.log(props);
        }
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
export default Login