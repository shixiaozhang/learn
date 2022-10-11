| 工具                            | 编译时 | 运行时 |                                                                            作用                                                                             | 备注             |
| :------------------------------ | -----: | :----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------- |
| core-js                         |        |   ✅   |                                                                                                                                                             |                  |
| regenerator-runtime             |        |   ✅   |                                                                                                                                                             |                  |
| @babel/polyfill                 |        |   ✅   |                                                                                                                                                             |                  |
| @babel/runtime                  |        |   ✅   |                                                                                                                                                             |                  |
| @babel/runtime-corejs2          |        |   ✅   |                                                                                                                                                             |                  |
| @babel/runtime-corejs3          |        |   ✅   |                                              封装了 core-js、regenerator-runtime 和各种语法转换用到的工具函数                                               |                  |
| @babel/plugin-transform-runtime |     ✅ |        | transform-runtime 方案可以作为@babel/preset-env 中 useBuiltIns 配置的替代品，也就是说，一旦使用 transform-runtime 方案，你应该把 useBuiltIns 属性设为 false |                  |
| @babel/cli                      |     ✅ |        |                                                                   babel 官方的脚手架工具                                                                    | 很适合我们练习用 |
| @babel/core                     |     ✅ |        |                                                                      babel 核心编译库                                                                       |                  |
| @babel/preset-env               |     ✅ |        |                                                          babel 的预设工具集，基本为 babel 必装的库                                                          |                  |
| transform-runtime               |     ✅ |        |                                                                      Polyfill 注入方案                                                                      |                  |

* **编译时工具**。代表工具有`@babel/preset-env`和`@babel/plugin-transform-runtime`。

* **运行时基础库**。代表库包括`core-js`和`regenerator-runtime`。

**编译时工具**的作用是在代码编译阶段进行**语法降级**及**添加 polyfill 代码**的**引用语句**，如:

```js
import "core-js/modules/es6.set.js"
```
由于这些工具只是**编译阶段**用到，**运行时**并不需要，我们需要将其放入package.json中的devDependencies中。

而**运行时基础库**是根据 ESMAScript官方语言规范提供各种Polyfill实现代码，主要包括`core-js`和`regenerator-runtime`两个基础库，不过在 `babel` 中也会有一些上层的封装，包括：

* `@babel/polyfill`
* `@babel/runtime`
* `@babel/runtime-corejs2`
* `@babel/runtime-corejs3` 看似各种运行时库眼花缭乱，其实都是core-js和regenerator-runtime不同版本的封装罢了(@babel/runtime是个特例，不包含 core-js 的 Polyfill)。这类库是项目运行时必须要使用到的，因此一定要放到package.json中的dependencies中！

- **@babel/preset-env**

  - 如果使用新特性，往往是通过基础库(如 core-js)往全局环境添加 Polyfill，如果是开发应用没有任何问题，如果是开发第三方工具库，则很可能会对全局空间造成污染。
  - 很多工具函数的实现代码(如上面示例中的\_defineProperty 方法)，会在许多文件中重现出现，造成文件体积冗余。\*\*\*\*

- **core-js**
  - `core-js` 有三种产物，分别是 `core-js`、`core-js-pure` 和 `core-js-bundle`。第一种是全局 Polyfill 的做法，`@babel/preset-env` 就是用的这种产物；第二种不会把 Polyfill 注入到全局环境，可以按需引入；第三种是打包好的版本，包含所有的 Polyfill，不太常用。`@babel/runtime-corejs3` 使用的是第二种产物。
- **regenerator-runtime** 生成器函数、async、await 函数经 babel 编译后，regenerator-runtime 模块用于提供功能实现






```json
// .babelrc.json :@babel/preset-env 的polyfill方案
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // 指定兼容的浏览器版本
        "targets": {
          "ie": "11"
        },
        // 基础库 core-js 的版本，一般指定为最新的大版本
        "corejs": 3,
        // Polyfill 注入策略，后文详细介绍
        "useBuiltIns": "usage",
        // 不将 ES 模块语法转换为其他模块语法
        "modules": false
      }
    ]
  ]
}
```

### useBuiltIns

- **false** ： 此时不对 polyfill 做操作。如果引入 @babel/polyfill，则无视配置的浏览器兼容，引入所有的 polyfill
- **entry** ： 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill。需要在入口文件手动添加 import '@babel/polyfill'，会自动根据 browserslist 替换成浏览器不兼容的所有 polyfill。这里需要指定 core-js 的版本, 如果是 corejs3 则 import '@babel/polyfill' 需要改成 import 'core-js'
- **usage** ： usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加。

### @babel/preset-env 的方案也存在一定局限性:

- 如果使用新特性，往往是通过基础库(如 core-js)往全局环境添加 Polyfill，如果是开发应用没有任何问题，如果是开发第三方工具库，则很可能会对全局空间造成污染。
- 很多工具函数的实现代码(如上面示例中的\_defineProperty 方法)，会在许多文件中重现出现，造成文件体积冗余。

```json
// .babelrc.json : transform-runtime 方案
// 需要提前说明的是，transform-runtime方案可以作为@babel/preset-env中`useBuiltIns`配置的替代品，
// 也就是说，一旦使用transform-runtime方案，你应该把useBuiltIns属性设为 false。
{
  "plugins": [
    // 添加 transform-runtime 插件
    [
      "@babel/plugin-transform-runtime", //需要安装 @babel/runtime-corejs3  -S
      // transform-runtime方案引用的基础库也发生了变化，不再是直接引入core-js和regenerator-runtime，而是引入@babel/runtime-corejs3
      {
        "corejs": 3
      }
    ]
  ],
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "ie": "11"
        },
        "corejs": 3,
        // 关闭 @babel/preset-env 默认的 Polyfill 注入
        "useBuiltIns": false,
        "modules": false
      }
    ]
  ]
}
```

## **@vitejs/plugin-legacy** 通过 Vite 构建我们完全可以兼容各种低版本浏览器

```typescript
// vite.config.ts
import legacy from "@vitejs/plugin-legacy";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    // 省略其它插件
    legacy({
      // 设置目标浏览器，browserslist 配置语法
      targets: ["ie >= 11"],
    }),
  ],
});
```
相比一般的打包过程，多出了index-legacy.js、vendor-legacy.js以及polyfills-legacy.js三份产物文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/assets/favicon.17e50649.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <!-- 1. Modern 模式产物 -->
    <script type="module" crossorigin src="/assets/index.c1383506.js"></script>
    <link rel="modulepreload" href="/assets/vendor.0f99bfcc.js">
    <link rel="stylesheet" href="/assets/index.91183920.css">
  </head>
  <body>
    <div id="root"></div>
    <!-- 2. Legacy 模式产物 -->
    <script nomodule>兼容 iOS nomodule 特性的 polyfill，省略具体代码</script>
    <script nomodule id="vite-legacy-polyfill" src="/assets/polyfills-legacy.36fe2f9e.js"></script>
    <script nomodule id="vite-legacy-entry" data-src="/assets/index-legacy.c3d3f501.js">System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'))</script>
  </body>
```
通过官方的legacy插件， Vite 会分别打包出Modern模式和Legacy模式的产物，然后将两种产物插入同一个 HTML 里面，Modern产物被放到 type="module"的 script 标签中，而Legacy产物则被放到带有 nomodule 的 script 标签中

## tips:
* 1、其实 transform-runtime 也不是完美的方案，在 polyfill 方面不会读取 targets，因此凡是项目用到的语法都会注入 polyfill，对于一些需要兼容低端浏览器的项目可能影响并不大，但如果是现代浏览器，会注入很多没有必要的 polyfill 代码，导致bundle体积明显增大。因此 transform-runtime 和 preset-env 两个方面没有绝对的好与坏，到底选择哪个看需求场景，Vite 也是出于项目打包场景和 Polyfill 体积的原因，选择了 polyfill 方案；如果是基础库打包，那么 transform-runtime 将更加合适。

* 2、因为已经实现全方面降级（nomodule），还保留了现代浏览器支持的特性（module），所以，在低版本浏览器里，不用担心preset-env进行polyfill产生的全局污染问题。transform-runtime对api的降级，主要避免了全局污染，比如使用preset-env进行api降级，会直接修改window.Promise