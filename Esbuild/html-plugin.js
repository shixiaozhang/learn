const fs = require('fs/promises')
const path = require('path')
const { createLink, createScript, generateHtml } = require('./utils')

module.exports = () => {
  return {
    name: 'esbuild:html',
    setup(build) {
      build.onEnd(async (buildResult) => {
        if (buildResult.errors.length) {
          return
        }
        const { metafile } = buildResult
        // 1. 拿到metafile 后获取所有 js 和 css 产物路径
        const scripts = []
        const links = []
        if (metafile) {
          const { outputs } = metafile
          const assets = Object.keys(outputs)

          assets.forEach((asset) => {
            if (asset.endsWith('.js')) {
              scripts.push(createScript(asset))
            } else if (asset.endsWith('.css')) {
              links.push(createLink(asset))
            }
          })
        }
        // 2.拼接HTML 内容
        const templateContent = generateHtml(scripts, links)
        // 3.写入磁盘
        const templatePath = path.join(process.cwd(), 'index.html')
        await fs.writeFile(templatePath, templateContent)
      })
    },
  }
}
