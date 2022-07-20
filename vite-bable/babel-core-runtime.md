| 工具                            | 编译时 | 运行时 |                               作用                               | 备注             |
| :------------------------------ | -----: | :----: | :--------------------------------------------------------------: | ---------------- |
| core-js                         |        |   ✅   |                                                                  |                  |
| regenerator-runtime             |        |   ✅   |                                                                  |                  |
| @babel/polyfill                 |        |   ✅   |                                                                  |                  |
| @babel/runtime                  |        |   ✅   |                                                                  |                  |
| @babel/runtime-corejs2          |        |   ✅   |                                                                  |                  |
| @babel/runtime-corejs3          |        |   ✅   | 封装了 core-js、regenerator-runtime 和各种语法转换用到的工具函数 |                  |
| @babel/plugin-transform-runtime |     ✅ |        |                                                                  |                  |
| @babel/cli                      |     ✅ |        |                      babel 官方的脚手架工具                      | 很适合我们练习用 |
| @babel/core                     |     ✅ |        |                         babel 核心编译库                         |                  |
| @babel/preset-env               |     ✅ |        |            babel 的预设工具集，基本为 babel 必装的库             |                  |
| transform-runtime               |     ✅ |        |                        Polyfill 注入方案                         |                  |

- **@babel/preset-env**

  - 如果使用新特性，往往是通过基础库(如 core-js)往全局环境添加 Polyfill，如果是开发应用没有任何问题，如果是开发第三方工具库，则很可能会对全局空间造成污染。
  - 很多工具函数的实现代码(如上面示例中的\_defineProperty 方法)，会在许多文件中重现出现，造成文件体积冗余。\*\*\*\*

- **core-js**
  - core-js 有三种产物，分别是 core-js、core-js-pure 和 core-js-bundle。第一种是全局 Polyfill 的做法，@babel/preset-env 就是用的这种产物；第二种不会把 Polyfill 注入到全局环境，可以按需引入；第三种是打包好的版本，包含所有的 Polyfill，不太常用。@babel/runtime-corejs3 使用的是第二种产物。
- **regenerator-runtime** 生成器函数、async、await函数经babel编译后，regenerator-runtime模块用于提供功能实现

* **@vitejs/plugin-legacy** 通过 Vite 构建我们完全可以兼容各种低版本浏览器