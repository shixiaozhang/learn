// import alias from "@rollup/plugin-alias"; //支持别名配置
// import babel from "@rollup/plugin-babel"; //在 Rollup 中使用 Babel 进行 JS 代码的语法转译
// import resolve from "@rollup/plugin-node-resolve"; //为了允许我们加载第三方依赖，否则像import React from 'react' 的依赖导入语句将不会被 Rollup 识别
// import commonjs from "@rollup/plugin-commonjs"; //将 CommonJS 格式的代码转换为 ESM 格式
// import replace from "@rollup/plugin-replace"; //在 Rollup 进行变量字符串的替换
// import typescript from "@rollup/plugin-typescript"; //支持使用 TypeScript 开发
// import visualizer from "rollup-plugin-visualizer";
const { rollup } = require("rollup");
// 常用 inputOptions 配置
const inputOptions = {
  input: "./src/index.js",
  external: [],
  plugins: [],
};

// 常用 outputOptions 配置
const outputOptionsList = [
  {
    dir: "dist/es",
    entryFileNames: `[name].[hash].js`,
    chunkFileNames: "chunk-[hash].js",
    assetFileNames: `assets/[name].[hash][extname]`,
    format: "es",
    sourcemap: true,
    globals: {
      lodash: "_",
    },
  },
];

async function build() {
  let bundle;
  let buildFailed = false;
  try {
    // 1 调用rollup 打包生成 bundle 对象
    bundle = await rollup(inputOptions);
    for (const outputOptions of outputOptionsList) {
      // 2 拿到 bundle 对象， 根据每一份的输出配置，调用 generate 和 write 方法 分别生成和写入产物
      const { output } = await bundle.generate(outputOptions);
      console.log(output);
      await bundle.write(outputOptions);
    }
  } catch (error) {
    buildFailed = true;
    console.error(error);
  }
  if (bundle) {
    // 调用 bundle.close 方法结束打包
    await bundle.close();
  }
  //  退出进程
  process.exit(buildFailed ? 1 : 0);
}
build();
