const Compiler = require('./Compiler')

class MyPlugin {
    constructor() { }

    apply(compiler) {//监听 hook

        compiler.hooks.brake.tap("WarningLampPlugin", () => console.log('WarningLampPlugin'));

        compiler.hooks.accelerate.tap("LoggerPlugin", newSpeed => console.log(`Accelerating to ${newSpeed}`));

        compiler.hooks.calculateRoutes.tapPromise("calculateRoutes tapAsync", (source, target, routesList) => {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(`tapPromise to ${source} ${target} ${routesList}`)
                    resolve();
                }, 1000)
            });
        });

    }
}

//模拟插件执行
const myPlugin = new MyPlugin();//实例话 模拟插件对象
const options = {//webpack 模拟配置
    plugins: [myPlugin]
}
const compiler = new Compiler();//创建compiler对象

for (const plugin of options.plugins) {

    if (typeof plugin === "function") {
        plugin.call(compiler, compiler);
    } else {
        plugin.apply(compiler); //监听 hook
    }
}
compiler.run();