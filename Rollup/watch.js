const rollup = require('rollup')
const watcher = rollup.watch({
  input: './src/index.js',
  output: [
    {
      dir: 'dist-watch/es',
      format: 'esm',
    },
    {
      dir: 'dist-watch/cjs',
      format: 'cjs',
    },
  ],
  watch: {
    exclude: ['node_modules/**'],
    include: ['src/**'],
  },
})

watcher.on('restart', () => {
  console.log('重新构建中。。。')
})
watcher.on('change', (id) => {
  console.log(`发生变动的模块id： `, id)
})
watcher.on('event', (e) => {
  if (e.code === 'BUNDLE_END') {
    console.log('打包信息： ', e)
  }
})
