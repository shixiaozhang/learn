const {
    SyncHook,
    AsyncSeriesHook//异步串行 hook
} = require('tapable')

class Car {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(['newspeed']),
            brake: new SyncHook(),
            calculateRoutes: new AsyncSeriesHook(['source', 'target', 'routesList'])
        }
    }
}

const myCar = new Car()


// 绑定同步钩子
myCar.hooks.brake.tap('WarningLampPligin', () => console.log('WarningLampPligin'));

// 绑定同步传参钩子
myCar.hooks.accelerate.tap('LoggerPlugin', newspeed => console.log(`Accelerating to ${newspeed}`));

// 绑定异步Promise 钩子
myCar.hooks.calculateRoutes.tapPromise('calculateRoutes tapPromise', (source, target, routesList, callback) => {//可以穿一个 cb 用来异步完成后调用
    console.log("source", source);
    // return a promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`tapPromise to ${source} ${target} ${routesList}`);
            resolve()
        }, 1000)
    })
});

myCar.hooks.brake.call()
myCar.hooks.accelerate.call(10)

console.time('cost');//计时
// 执行异步钩子
myCar.hooks.calculateRoutes.promise('Async', 'hook', 'demo').then(() => {
    console.timeEnd('cost');
}, err => {
    console.error(err);
    console.timeEnd('cost');
})