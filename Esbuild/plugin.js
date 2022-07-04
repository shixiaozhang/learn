let envPlugin = {
  name: 'env',
  setup(build) {
    build.onResolve({ filter: /^env$/ }, (args) => ({
      path: args.path,
      namespace: 'env-ns',
    }))
    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
      contents: JSON.stringify(process.env),
      loader: 'json',
    }))
  },
}

require('esbuild')
  .build({
    // absWorkingDir: process.cwd(),
    entryPoints: ['src/index.jsx'],
    bundle: true,
    outfile: 'out.js',
    // 应用插件
    plugins: [envPlugin],
  })
  .catch(() => process.exit(1))

//  ? 在 Esbuild 插件中，onResolve 和 onload是两个非常重要的钩子
// ?  分别控制 路径解析 和 模块内容 加载的过程。