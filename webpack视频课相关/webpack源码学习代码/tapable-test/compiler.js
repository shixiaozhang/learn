const {
    SyncHook,
    AsyncSeriesHook//异步串行 hook
} = require('tapable')

module.exports = class Compiler {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(['newspeed']),
            brake: new SyncHook(),
            calculateRoutes: new AsyncSeriesHook(["source", "target", "routesList"])
        }
    }
    run() { //触发 hook
        this.accelerate(10)
        this.break()
        this.calculateRoutes('Async', 'hook', 'demo')
    }
    //单独触发 不同 hook 
    accelerate(speed) {
        this.hooks.accelerate.call(speed);
    }
    break() {
        this.hooks.brake.call();
    }
    calculateRoutes() {
        this.hooks.calculateRoutes.promise(...arguments).then(() => { }, err => {
            console.error(err);
        })
    }
}