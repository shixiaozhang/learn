// ?单文件转译——Transform API

const { transform, transformSync } = require('esbuild')

async function runTransform() {
  // 第一个参数是代码字符串 第二个参数为编译配置
  const content = await transform(
    'const isNull = (str: string): boolean => str.length > 0;',
    {
      sourcemap: true,
      loader: 'tsx',
    }
  )
  console.log('runTransform')
  console.log(content)
}

runTransform()

function runTransformSync() {
  const content = transformSync(
    'const isNull = (str: string): boolean => str.length > 0;',
    {
      sourcemap: true,
      loader: 'tsx',
    }
  )
  console.log('runTransformSync')
  console.log(content)
}
runTransformSync()
