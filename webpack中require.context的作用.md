# webpack中require.context的作用
在我们项目开发中，经常需要import或者export各种模块，那么有没有什么办法可以简化这种引入或者导出操作呢？答案是肯定的，下面就为大家介绍一下require.context

我们会这样引入组件：

import A from 'components/A'
import B from 'components/B'
import C from 'components/C'
import D from 'components/D'
// ...
这样很蛋疼，因为每加一个组件，可能都要写这么一句，这样有规律的事，是否可以通过自动化完成?

## require.context

    require.context(directory, useSubdirectories, regExp)
    directory: 要查找的文件路径
    useSubdirectories: 是否查找子目录
    regExp: 要匹配文件的正则

用法

    require.context('./components/', true, /\.js$/)

    
上面调用方法，到底返回的是什么？

var map = {
	"./A.js": "./src/components/test/components/A.js",
	"./B.js": "./src/components/test/components/B.js",
	"./C.js": "./src/components/test/components/C.js",
	"./D.js": "./src/components/test/components/D.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}

function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/components/test/components sync recursive \\.js$";

代码很简单，require.context执行后，返回一个方法webpackContext，这个方法又返回一个__webpack_require__，这个__webpack_require__就相当于require或者import。同时webpackContext还有二个静态方法keys与resolve，一个id属性。

## context 返回值的方法函数

* keys: 返回匹配成功模块的名字组成的数组
* resolve: 接受一个参数request，request为test文件夹下面匹配文件的相对路径，返回这个匹配文件相对于整个工程的相对路径
* id: 执行环境的id，返回的是一个字符串，主要用在module.hot.accept，应该是热加载
  
### 看下keys是作用
const ctx = require.context('./components/', true, /\.js$/)
console.log(ctx.keys())
// ["./A.js", "./B.js", "./C.js", "./D.js"]

其实就是

    var map = {
        "./A.js": "./src/components/test/components/A.js",
        "./B.js": "./src/components/test/components/B.js",
        "./C.js": "./src/components/test/components/C.js",
        "./D.js": "./src/components/test/components/D.js"
    };

    Object.keys(map)

只不过map是模块内部变量，无法直接访问，所以通过其实提供的keys方法访问

那么如何引入ABCD组件呢？

    const ctx = require.context('./components/', true, /\.js$/)
    const map = {}
    for (const key of ctx.keys()) {
    map[key] = ctx(key)
    }
    console.log(map)


https://pic1.zhimg.com/80/v2-8c03e6ec4cea39da353e63134937ca64_720w.png

看到了吧！成功import进来了，但'./A.js'这样的key有点不太好，自己可以处理字符串生成自己想


可以优化一下，生成一个公共的方法

const importAll = context => {
  const map = {}

  for (const key of context.keys()) {
    const keyArr = key.split('/')
    keyArr.shift() // 移除.
    map[keyArr.join('.').replace(/\.js$/g, '')] = context(key)
  }

  return map
}

export default importAll

使用
All.js
import importAll from '$common/importAll'
export default importAll(require.context('./', true, /\.js$/))

项目文件.js引入All.js就全部引入了ABCD
