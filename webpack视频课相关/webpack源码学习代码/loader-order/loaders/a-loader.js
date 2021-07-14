
const loaderUtils = require('loader-utils')//获取参数的插件
module.exports = function (source) {
    console.log('aaaa');
    //     interpolateName
    // 使用多个占位符和/或正则表达式插入文件名模板。模板和正则表达式被设置为所谓的查询参数name和regExp对当前装载机的上下文。

    const url = loaderUtils.interpolateName(this, '[name].[ext]', source);
    console.log('interpolateName',url);
    this.emitFile(url, source)
    return source
}

