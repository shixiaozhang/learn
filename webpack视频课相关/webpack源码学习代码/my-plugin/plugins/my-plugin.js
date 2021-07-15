module.exports = class MyPlugin {
    constructor(options){
        this.options=options
    }
    apply(compiler){//compiler 是webpack 的内置对象
        console.log('my plugin run',compiler);
        console.log(this.options);
    }
}