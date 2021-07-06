# 关于webpack4.0打包代码分割optimization.splitChunks的配置详解

## optimization可以实现很多功能，最常见的功能是：

* three shaking 只支持ES Module模块的引入，删除没有引用的模块打包
* Code Splitting 拆分代码，提高执行效率和用户体验
splitChunks是用来设置代码如何打包和分割的，现就webpack官网提供的默认参数详细解释一下每个参数配置的含义以及使用场景。官网链接：https://www.webpackjs.com/plugins/split-chunks-plugin/

/**
   * webpack中实现代码分割的两种方式：
   * 1.同步代码：只需要在webpack配置文件总做optimization的配置即可
   * 2.异步代码(import)：异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中
   */
  optimization: {
    splitChunks: {
      chunks: "all",          //async：对异步引入的代码进行分割（默认） initial：对同步引入的代码进行分割 all：同步异步的代码都进行分割
      minSize: 30000,         //字节 引入的文件大于30kb才进行分割
      //maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
      minChunks: 1,           //模块至少使用次数
      maxAsyncRequests: 5,    //同时加载异步资源数量，同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
      maxInitialRequests: 3,  //首页加载的时候引入的文件最多3个
      automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
      name: true,                  //缓存组里面的filename生效，覆盖默认命名
      cacheGroups: { //缓存组，将所有加载模块放在缓存里面一起分割打包
        vendors: {  //自定义打包模块
          test: /[\\/]node_modules[\\/]/,
          priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
          filename: 'vendors.js',
        },
        default: { //默认打包模块
          priority: -20,
          reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
          filename: 'common.js'
        }
      }
    }
  }

## 一.splitChunks基本配置
### 1.chunks：分割代码的模式

* async 异步代码分割模式：只分割出异步引入的模块
异步代码指的是异步引入的代码模块单独打包成一个或多个文件，下面是异步引入的例子：

    //异步加载模块
    function getComponent () {
    return import(/* webpackChunkName:"lodash" */ 'lodash').then(({ default: _ }) => {
    var element = document.createElement('div')
    element.innerHTML = _.join(['Dell', ' ', 'Lee', '-'])
    return element
    })
    }
    getComponent().then(el => {
    document.body.appendChild(el)
    })

initial 同步代码分割模式：只分割同步引入的模块
* 同步代码引入方式：

    //同步加载模块
    import _ from 'lodash'  //第三方库
    import test from './test.js' //业务代码
    import jquery from 'jquery'  //第三方库
    console.log(test.name)

    var element = document.createElement('div')
    element.innerHTML = _.join(['Dell', ' ', 'Lee', '-'])
    document.body.appendChild(element)
    console.log(jquery('div'))

all 同步异步都分割模式：在所有配置条件都满足的情况下，无论如何引入模块都会进行分割
2.minSize和maxSize（单位：字节）
minSize指的是引入的模块的最小值
maxSize指的是引入的模块的最大值，当引入的模块大小大于最大值时，weback会尝试将这个模块以最大值为准分割成多个模块，前提是这个模块可以分割，比如lodash的提交大于50KB，那么设置maxSize：5000时，依然打包出一个文件来，故此属性一般不用

3.minChunks：模块至少使用次数
当值为2时，代表只引用了一次的模块不做分割打包处理

4.maxAsyncRequests：同时加载的模块数量最大值
当需要分割的模块同步引入个数超出限时时，webpack之后分割限制值的模块，其它的将不做处理

5.maxInitialRequests：首次加载引入模块可分割的最大值
6.automaticNameDelimiter：缓存组名称和生成文件名称之间的连接字符串
1. name： 设置为true时，缓存组里面的filename生效，覆盖默认命名方式

## 二.cacheGroups缓存组

    cacheGroups: { //缓存组，将所有加载模块放在缓存里面一起分割打包
    vendors: {  //自定义打包模块
        test: /[\\/]node_modules[\\/]/,
        priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
        filename: 'vendors.js',
    },
    default: { //默认打包模块
        priority: -20,
        reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
        filename: 'common.js'
    }
    }

* vendors为自定义打包模块，当vendors.test设置为/[\/]node_modules[\/]/，webpack将把使用npm命令安装的第三方库打包到vendors缓存组里面。
1.test：正则匹配打包分离的文件条件
2.priority：定义打包组的打包顺序优先级，值越大，优先级越高
3.filename：打包模块输出的文件名，默认为 缓存组名称（vendors） + 连接字符串（automaticNameDelimiter） + 模块入口文件（main.js） 例如：vendors~main.js

* default为默认模块打包的缓存组，一般情况下打包业务模块编码。
reuseExistingChunk：模块嵌套引入时，判断是否复用已经被打包的模块
