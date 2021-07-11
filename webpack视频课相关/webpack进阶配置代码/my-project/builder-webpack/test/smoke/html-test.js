const glob = require('glob-all')
describe('Checking generated html files',()=>{
    it('should generate html files',(done)=>{
        // 获取html文件
        const files=glob.sync([
            './dist/index.html',
            './dist/search.html'
        ]);
        // 判断文件时候存在
        if(files.length > 0){
            done()//存在则运行 回调done 表示成功
        }else{
            throw new Error('no html files generate ')
        }
    })
})