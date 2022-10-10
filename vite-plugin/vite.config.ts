import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import testHookPlugin from "./plugins/test-hooks-plugin";
import serveSendClient from "./plugins/serveSendClient";
import virtual from "./plugins/virtual-module";
import svgr from "./plugins/svgr";
import inspect from "vite-plugin-inspect"; //调试插件
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // testHookPlugin(),
    virtual(),
    svgr({ defaultExport: "component" }),
    inspect(),
    serveSendClient(),
  ],
});
