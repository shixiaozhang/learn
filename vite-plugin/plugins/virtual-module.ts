// 实现一个虚拟模块的加载插件
/**
 * 作为构建工具，一般需要处理两种形式的模块，一种存在于真实的磁盘文件系统中，另一种并不在磁盘而在内存当中，也就是虚拟模块。通过虚拟模块，我们既可以把自己手写的一些代码字符串作为单独的模块内容，又可以将内存中某些经过计算得出的变量作为模块内容进行加载，非常灵活和方便。
 */

import { Plugin, ResolvedConfig } from 'vite'

// 虚拟模块名称
const virtualFibModuleId = 'virtual:fib'
// vite 中 约定对于虚拟模块，解析后的路径需要加上 `\0` 前缀
const resolveFibVirtualModuleId = '\0' + virtualFibModuleId

const virtualEnvModuleId = 'virtual:env'

const resolveEnvVirtualModuleId = '\0' + virtualEnvModuleId

export default function virtualFibModulePlugin(): Plugin {
  let config: ResolvedConfig | null = null
  return {
    name: 'vite-plugin-virtual-fib-module',
    configResolved(c: ResolvedConfig) {
      config = c
    },
    resolveId(id) {
      if (id === virtualFibModuleId) {
        return resolveFibVirtualModuleId
      }
      if (id === virtualEnvModuleId) {
        return resolveEnvVirtualModuleId
      }
    },
    load(id) {
      // 加载虚拟模块
      if (id === resolveFibVirtualModuleId) {
        return `export default function fib(n) { return n <= 1 ? n : fib(n - 1) + fib(n - 2)}`
      }
      if (id === resolveEnvVirtualModuleId) {
        return `export default ${JSON.stringify(config!.env)}`
      }
    },
  }
}
