const glob = require('glob-all')
describe('Checking generated css js files',()=>{
    it('should generate css js files',(done)=>{
        // 获取html文件
        const files=glob.sync([//用 * 代替hash的值进行匹配
            './dist/index_*.js',
            './dist/search_*.js',
            './dist/search_*.css'
        ]);
        // 判断文件时候存在
        if(files.length > 0){
            done()//存在则运行 回调done 表示成功
        }else{
            throw new Error('no css js files generate ')
        }
    })
})