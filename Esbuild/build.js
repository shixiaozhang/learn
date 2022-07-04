//? 项目打包——Build API
const { build, buildSync, serve } = require('esbuild')

async function runBuild() {
  const result = await build({
    // 配置
    // 当前项目根目录
    absWorkingDir: process.cwd(),
    //   入口文件 数组
    entryPoints: ['./src/index.jsx'],
    // 打包产物
    outdir: 'dist',
    // 是否需要打包，一般设为true
    bundle: true,
    // 模块格式，包括 esm commonjs iife
    format: 'esm',
    // 需要排除的大包以来列表
    external: [],
    // 是否开启自动拆包
    splitting: true,
    // 是否生成sourceMap文件
    sourcemap: true,
    // 是否生成打包元信息文件
    metafile: true,
    // 是否开始压缩
    minify: false,
    // 是否开始 watch 模式， 在 watch 模式下代码变动会自动触发重新打包
    watch: false,
    // 是否将产物写入磁盘
    write: true,
    // Esbuild 内置了一系列的 loader ，
    // 包括 base64、binary、css、dataurl、file、js(x)、ts(x)、text、json
    // 针对一些特殊的文件，调用不同的 loader 进行加载
    loader: {
      '.png': 'base64',
    },
  })
  console.log(result)
}

// runBuild()

function runBuildServe() {
  serve(
    {
      port: 8000,
      // 静态资源目录
      servedir: './dist',
    },
    {
      absWorkingDir: process.cwd(),
      entryPoints: ['./src/index.jsx'],
      bundle: true,
      format: 'esm',
      splitting: true,
      sourcemap: true,
      ignoreAnnotations: true,
      metafile: true,
    }
  ).then((server) => {
    console.log('HTTP Server starts at port', server.port)
  })
}

runBuildServe()
