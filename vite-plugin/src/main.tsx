import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import fib from "virtual:fib";

console.log(`结果: ${fib(10)}`);
import env from "virtual:env";
console.log(env);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if (import.meta.hot) {

  import.meta.hot.on("my:serverSend", (msg) => {
    console.log("serverSend");
    console.log(msg);
  });
  import.meta.hot.on("my:ack", (msg) => {
    console.log("ack");
    console.log(msg);
  });
  import.meta.hot.send("my:clientSend", { msg: "客户端发送到服务器！" });
}
