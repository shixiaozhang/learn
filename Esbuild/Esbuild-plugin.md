## onResolve 钩子 和 onLoad 钩子

```js
build.onResolve({ filter: /^env$/ }, (args) => ({
  path: args.path,
  namespace: 'env-ns',
}))
build.onLoad({ filter: /.\*/, namespace: 'env-ns' }, () => ({
  contents: JSON.stringify(process.env),
  loader: 'json',
}))
```

- 两个钩子函数中都需要传入两个参数: Options 和 Callback

```ts
// Options 类型定义
/**
 * filter 为必传参数，是一个正则表达式，它决定了要过滤出的特征文件
 *  插件中的 filter 正则是使用 Go 原生正则实现的，为了不使性能过于劣化，规则应该尽可能严格。同时它本身和 JS 的正则也有所区别，不支持前瞻(?<=)、后顾(?=)和反向引用(\1)这三种规则
 *
*/
/**
 * namespace 为选填参数，一般在 onResolve 钩子中的回调参数返回namespace属性作为标识，我们可以在onLoad钩子中通过 namespace 将模块过滤出来。如上述插件示例就在onLoad钩子通过env-ns这个 namespace 标识过滤出了要处理的env模块。
 *
 *
*/
interface Options {
  filter: RegExp;
  namespace?: string;
}

// onResolve回调参数 Callback
build.onResolve({ filter: /^env$/ }, (args: onResolveArgs): onResolveResult => {
  // 模块路径
  console.log(args.path)
  // 父模块路径
  console.log(args.importer)
  // namespace 标识
  console.log(args.namespace)
  // 基准路径
  console.log(args.resolveDir)
  // 导入方式，如 import、require
  console.log(args.kind)
  // 额外绑定的插件数据
  console.log(args.pluginData)

  return {
      // 错误信息
      errors: [],
      // 是否需要 external
      external: false;
      // namespace 标识
      namespace: 'env-ns';
      // 模块路径
      path: args.path,
      // 额外绑定的插件数据
      pluginData: null,
      // 插件名称
      pluginName: 'xxx',
      // 设置为 false，如果模块没有被用到，模块代码将会在产物中会删除。否则不会这么做
      sideEffects: false,
      // 添加一些路径后缀，如`?xxx`
      suffix: '?xxx',
      // 警告信息
      warnings: [],
      // 仅仅在 Esbuild 开启 watch 模式下生效
      // 告诉 Esbuild 需要额外监听哪些文件/目录的变化
      watchDirs: [],
      watchFiles: []
  }
}

// onLoad回调参数 Callback
build.onLoad({ filter: /.*/, namespace: 'env-ns' }, (args: OnLoadArgs): OnLoadResult => {
  // 模块路径
  console.log(args.path);
  // namespace 标识
  console.log(args.namespace);
  // 后缀信息
  console.log(args.suffix);
  // 额外的插件数据
  console.log(args.pluginData);

  return {
      // 模块具体内容
      contents: '省略内容',
      // 错误信息
      errors: [],
      // 指定 loader，如`js`、`ts`、`jsx`、`tsx`、`json`等等
      loader: 'json',
      // 额外的插件数据
      pluginData: null,
      // 插件名称
      pluginName: 'xxx',
      // 基准路径
      resolveDir: './dir',
      // 警告信息
      warnings: [],
      // 同上
      watchDirs: [],
      watchFiles: []
  }
});

```

## 其他钩子

- 在 build 对象中，除了 onResolve 和 onLoad，还有 onStart 和 onEnd 两个钩子用来在构建开启和结束时执行一些自定义的逻辑，使用上比较简单，如下面的例子所示:

```js
let examPlugin = {
  name: 'example',
  setup(build) {
    // onStart 的执行时机是在每次 build 的时候，包括触发 watch 或者 serve模式下的重新构建
    build.onStart(() => {
      console.log('build started')
    })

    // onEnd 钩子中如果要拿到 metafile，必须将 Esbuild 的构建配置中metafile属性设为 true
    build.onEnd((buildResult) => {
      if (buildResult.errors.length) {
        return
      }
      // 构建元信息
      // 获取元信息后做一些自定义的事，比如生成 HTML
      console.log(buildResult.metafile)
    })
  },
}
```
