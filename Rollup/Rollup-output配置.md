## 自定义 output 配置

```js

output:  {
  // 输出产物目录
  dir: path.resolve(__dirname, 'dist'),
  // 以下三种配置项都可以使用这些占位符：
  // 1.[name]:去除文件后缀的文件名
  // 2.[hash]:根据文件名和文件内容生成 hash 值
  // 3.[format]:产物模块格式，如 es cjs
  // 4.[extname]:产物后缀名（带 `.`）

  //  入口模块的输出文件名
  entryFileNames: `[name].js`,
  // 非入口模块（如动态 import） 的输出文件名
  chunkFileNames: 'chunk-[hash].js',
  // 静态资源文件输出文件名
  assetFileNames: 'assets/[name]-[hash][extname]',
  // 产物输出格式，包括 `amd` `cjs` `es` `iife` `umd` `system`
  format: 'cjs',
  // 是否生成 sourcemap 文件
  sourcemap: true,
  // 如果打包 iife/umd 格式，需要对外暴露出一个全局变量，通过 name 配置变量名
  name: 'MyBundle',
  // 全局变量声明
  globals: {
    // 项目总可以直接使用`$` 代替 `jquery`
    jquery: '$',
  },
}
```

## 依赖 external

对于某些第三方包，有时候我们不想让 Rollup 进行打包，也可以通过 external 进行外部化:

```js
{
  external: ['react', 'react-dom']
}
```

## 接入插件能力

Rollup 能够打包输出出 CommonJS 格式的产物，但对于输入给 Rollup 的代码并不支持 CommonJS，仅仅支持 ESM

- @rollup/plugin-node-resolve 是为了允许我们加载第三方依赖，否则像 import React from 'react' 的依赖导入语句将不会被 Rollup 识别。
- @rollup/plugin-commonjs 的作用是将 CommonJS 格式的代码转换为 ESM 格式

另外，这里也给大家分享其它一些比较常用的 Rollup 插件库:

- @rollup/plugin-json： 支持.json 的加载，并配合 rollup 的 Tree Shaking 机制去掉未使用的部分，进行按需打包。
- @rollup/plugin-babel：在 Rollup 中使用 Babel 进行 JS 代码的语法转译。
- @rollup/plugin-typescript: 支持使用 TypeScript 开发。
- @rollup/plugin-alias：支持别名配置。
- @rollup/plugin-replace：在 Rollup 进行变量字符串的替换。
- rollup-plugin-visualizer: 对 Rollup 打包产物进行分析，自动生成产物体积可视化分析图。
