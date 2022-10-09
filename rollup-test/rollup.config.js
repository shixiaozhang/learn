import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import cycle from "./plugin-cycle";
/**
 * @type { import('rollup').RollupOptions}
 */
const buildOptions = {
  input: ["src/index.js", "src/util.js"],
  output: [
    {
      // 产物输出目录
      dir: "dist/es",
      format: "esm", // 产物输出格式，包括`amd`、`cjs`、`es`、`iife`、`umd`、`system`
    },
    {
      // 产物输出目录
      dir: "dist/cjs",
      format: "cjs",
    },
  ],
  plugins: [resolve(), commonjs(), cycle()],
};

export default buildOptions;

// rollup 打包命令，`-c` 表示使用配置文件中的配置
//   "build": "rollup -c"

// 如果不同入口对应的打包配置不一样，我们也可以默认导出一个配置数组，
// export default [buildIndexOptions, buildUtilOptions];
