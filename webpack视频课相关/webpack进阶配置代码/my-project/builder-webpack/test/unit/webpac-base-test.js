
const assert = require('assert')
describe('webpack-base test case', () => {
    const baseConfig = require('../../lib/webpack.base')
    // it 对一个功能进行描述
    it('entry', () =>{
         //断言
         assert.equal(baseConfig.entry.index, '/Users/Z/project/learn/webpack视频课相关/示例代码/code/webpack进阶配置代码/my-project/builder-webpack/test/smoke/template/src/index/index.js')
         assert.equal(baseConfig.entry.search, '/Users/Z/project/learn/webpack视频课相关/示例代码/code/webpack进阶配置代码/my-project/builder-webpack/test/smoke/template/src/search/index.js')
    })
})