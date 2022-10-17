// 导出 SSR 组件入口
import App from "./App";
import "./index.css";

export async function fetchData() {
  return {
    user: "xxx",
  };
}

function ServerEntry(props: any) {
  return <App data={props.data}></App>;
}
export { ServerEntry };
