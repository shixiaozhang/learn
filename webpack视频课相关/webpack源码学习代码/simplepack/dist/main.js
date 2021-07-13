(function (modules) {
    function require(filename) {
        var fn = modules[filename]
        var module = { exports: {} };

        fn(require, module, module.exports);

        return module.exports
    }
    require('/Users/Z/project/learn/webpack视频课相关/webpack源码学习代码/simplepack/src/index.js')
})({
    '/Users/Z/project/learn/webpack视频课相关/webpack源码学习代码/simplepack/src/index.js': function (require, module, exports) {
        "use strict";

        var _greeting = require("./greeting.js");

        document.write((0, _greeting.greeting)('xiaozhang'));
    }, './greeting.js': function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.greeting = greeting;
        function greeting(name) {
            return "hello " + name;
        }
    },
})