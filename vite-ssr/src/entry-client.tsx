// 客户端入口文件
import { StrictMode } from "react";
import "./index.css";
import App from "./App";
import { hydrateRoot } from "react-dom/client";

// @ts-ignore
const data = window.__SSR_DATA__;

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <App data={data}></App>
  </StrictMode>
);
