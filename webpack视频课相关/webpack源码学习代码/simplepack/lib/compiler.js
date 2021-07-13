// ? 模块构建，文件输出

const fs = require('fs')
const path = require('path')
const { getAST, getDependencies, transform } = require('./paraser')

module.exports = class Compiler {

    constructor(options) {
        // options webpack 配置
        const { entry, output } = options

        this.entry = entry;
        this.output = output;
        this.modules = [];//依赖队列，所有的依赖

    }
    run() {
        //入口方法
        //从入口文件构建出他的信息 filename，dependencies，source
        const entryModule = this.buildModule(this.entry, true)


        console.log(entryModule);

        this.modules.push(entryModule)
        this.modules.map((_module) => {//a
            // 循环我们模块列表 a
            // 取出我们的 模块依赖 表进行循环 b
            _module.dependencies.map((dependency) => {//b
                // 把本次循环的依赖，尽心build 解析。解析成为{filename，dependencies，source}这样的格式，追加到我们的modules模块列表中；
                // 因为本次循环a 结束的时候我们 又给我们的modules中push了新的值，长度发生了变化，所以会继续进行循环；
                this.modules.push(this.buildModule(dependency))
            })
        })
        // 最后我们所有用到的模块 ，都在 modules 中按顺序排放；以供我们进行处理
        console.log(this.modules);

        this.emitFiles()//输出文件
    }
    buildModule(filename, isEntry) {
        // 模块构建
        let ast;
        if (isEntry) {
            ast = getAST(filename);

        } else {
            // 转换路径
            const absolutePath = path.join(process.cwd(), './src', filename);
            ast = getAST(absolutePath)
        }
        return {
            filename,
            dependencies: getDependencies(ast),//依赖列表
            source: transform(ast)//转换过的js源代码
        }
    }
    emitFiles() {
        // 输出文件
        const outputPath = path.join(this.output.path, this.output.filename)//获取output输出目录的绝对路径和文件名
        let modules = '';
        this.modules.map((_module) => {
            modules += `'${_module.filename}':function(require,module,exports){${_module.source}},`
        })
        const bundle = `(function(modules){
                            function require(filename){
                                var fn = modules[filename]
                                var module = {exports: {}};

                                fn(require,module,module.exports);

                                return module.exports
                            }
                            require('${this.entry}')
                        })({${modules}})`;//在这里对模块进行包裹，自执行函数，划分作用域
        // console.log(bundle);
        fs.writeFileSync(outputPath, bundle, 'utf-8')
    }
}