
const JSZip = require('jszip');
const path=require('path')
const RawSource = require('webpack-sources').RawSource;
const zip = new JSZip()
module.exports = class ZipPlugin {
    constructor(options) {
        this.options = options
    }
    apply(compiler) {//compiler 是webpack 的内置对象
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {

            const folder = zip.folder(this.options.filename);
            for (let filename in compilation.assets) {
              const source=  compilation.assets[filename].source()
              folder.file(filename,source)//为zip文件添加内容
                console.log(source);
            }
            zip.generateAsync({type:"nodebuffer"}).then((content)=> {
                // see FileSaver.js
                // saveAs(content, "example.zip");//进行文件输出
                console.log(content);
                const outputPath = path.join(
                    compilation.options.output.path, 
                    this.options.filename + '.zip'
                );
                const outputRelativePath = path.relative(
                    compilation.options.output.path,
                    outputPath
                );
                compilation.assets[outputRelativePath] = new RawSource(content);

                callback()

            });
        });//触发钩子函数
    }
}