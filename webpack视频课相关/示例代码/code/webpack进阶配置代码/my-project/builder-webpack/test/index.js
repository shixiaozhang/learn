const path=require('path')
process.chdir(path.join(__dirname,'smoke/template'))//进入模版目录进行测试操作
describe('build-webpack test case', ()=>{
    //引入单元测试文件，统一运行
    require('./unit/webpac-base-test');
})