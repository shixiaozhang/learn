// @rollup/plugin-node-resolve 为了允许我们加载第三方依赖，否则像import React from 'react' 的依赖导入语句将不会被 Rollup 识别。
import resolve from '@rollup/plugin-node-resolve'
// @rollup/plugin-commonjs 将 CommonJS 格式的代码转换为 ESM 格式
import commonjs from '@rollup/plugin-commonjs'
// 加入 terser 插件，用来压缩代码
import { terser } from 'rollup-plugin-terser'

import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
// 以下注释是为了能使用 VSCode 的类型提示
/**
 * @type { import('rollup').RollupOptions }
 */
const buildOptions = {
  input: ['src/index.js', 'src/util.js'], //多入口
  output: [
    // 多产物配置
    {
      // 产物输出目录
      dir: 'dist/es',
      // 产物格式
      format: 'esm',
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
    },
  ],
  //  插件
  plugins: [resolve(), commonjs()],
}

// export default buildOptions

// 如果不同入口对应的打包配置不一样，我们也可以默认导出一个配置数组

/**
 * @type { import('rollup').RollupOptions }
 */

const buildUtilOptions = {
  input: ['src/util.js'],
  output: [
    // 省略 output 配置
  ],
}
//
const buildIndexOptions = {
  input: ['src/index.js'],
  output: [
    // 多产物配置
    {
      // 产物输出目录
      dir: 'dist/es',
      // 产物格式
      format: 'esm',
      // 在 Rollup 配置文件中，plugins除了可以与 output 配置在同一级，也可以配置在 output 参数里面
      plugins: [terser()],
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      plugins: [terser()],
    },
  ], //  插件
  plugins: [
    resolve(),
    commonjs(),
    alias({
      entries: [
        // 将把 import xxx from 'module-a'
        // 转换为 import xxx from './module-a'
        { find: 'module-a', replacement: './module-a.js' },
      ],
    }),
    // 将会把代码中所有的 __TEST__ 替换为 1
    replace({
      __TEST__: 1,
    }),
  ],
}

export default buildIndexOptions

// export default [buildIndexOptions,buildUtilOptions]
