const rollup = require('rollup')
// 常用 inputOptions 配置

const inputOptions = {
  input: './src/index.js',
  external: [],
}

const outputOptionsList = [
  // 常用 outputoption配置
  {
    dir: 'dist-api/es',
    entryFileNames: `[name].[hash].js`,
    chunkFileNames: `chunk-[hash].js`,
    assetFileNames: `assets/[name]-[hash][extname]`,
    format: 'es',
    souremap: true,
    globals: {
      lodash: '_',
    },
  },
]

async function build() {
  let bundle
  let buildFailed = false
  try {
    // 1.调用 rollup.rollup 生成 bundle 对象
    bundle = await rollup.rollup(inputOptions)
    for (const outputOptions of outputOptionsList) {
      // 2. 拿到bundle 对象 根据每一份输出配置 调用 generate 和 write 方法分别生成和写入产物
      const { output } = await bundle.generate(outputOptions)
      //   console.log(output)
      await bundle.write(outputOptions)
    }
  } catch (error) {
    buildFailed = true
    console.error(error)
  }
  if (bundle) {
    // 最后调用 bundle.close 方法结束打包
    await bundle.close()
  }
  process.exit(buildFailed ? 1 : 0)
}
build()
