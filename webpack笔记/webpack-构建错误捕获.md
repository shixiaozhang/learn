# 在构建项目之后，输入 echo $? 可以获取构建的错误代码：成功的错误码是：0

webpack4 之前的版本构建失败不不会抛出错误码 (error code)

## Node.js 中的 process.exit 规范

* 0 表示成功完成，回调函数中，err 为 null
  
* 非 0 表示执⾏失败，回调函数中，err 不为 null，err.code 就是传给 exit 的数字

# 如何主动捕获并处理构建错误?


compiler 在每次构建结束后会触发 done 这 个 hook

process.exit 主动处理理构建报错


plugins: [ 
    function() {
            //? 构建完成会自动触发done 这个hook；
            //? webpack 4 ：this.hooks.done.tap(...)
            //? webpack 3 ：this.plugin(...)
        this.hooks.done.tap('done', //监听 done hook‘
            (stats) => { 
                //通过 stats.compilation.errors 获取错误对象；
                if (stats.compilation.errors &&
                stats.compilation.errors.length && 
                process.argv.indexOf('- -watch') == -1){
                    //打印错误
                    console.log('build error');
                    // 抛出错误状态码
                    process.exit(1); 
                }
            }) 
    }
]


可以做一个自动上报错误码之类的功能；
