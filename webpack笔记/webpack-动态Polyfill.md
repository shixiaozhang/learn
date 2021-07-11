# 构建体积优化:动态 Polyfill


## Polyfill对比：

| 方案                           | 优点                                               | 缺点                                                         | 是否采用 |
| ------------------------------ | -------------------------------------------------- | ------------------------------------------------------------ | -------- |
| Babel-polyfill                 | react16官方推荐                                    | 1、包体积200k+，难以淡出抽离出Map、Set<br />2、项目里的react是单独引用的cdn，如果要用它，需要单独构建一份放在react前加载 | no       |
| Babel-plugin-transform-runtime | 能只polyfill用到类或方法，相对体积较小             | 不能polyfill原型上的方法，不适用于业务项目复杂开发环境       | no       |
| 自己写polyfill                 | 定制化高，体积小                                   | 1、重复造轮子，容易在日后年久失修成为坑<br />2、即使体积小，依然所有用户都要加载 | no       |
| Es6-shim                       | 行业界维护的一个库，有效的减小体积，单独使用部分， | 但是所有用户都要加载polyfill；                               | no       |
| Polypill-service               | 只给用户返回需要的polyfill，社区维护               | 部分国内的奇葩浏览器UA可能无法识别（但是可以降级返回所有的polyfill | yes      |



##  Polyfill Service原理：识别 User Agent，下发不同的 Polyfill

## 如何使用动态 Polyfill service

### polyfill.io 官方提供的服务cdn：

    <script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>

### 基于官方自建 polyfill 服务

    //huayang.qq.com/polyfill_service/v2/polyfill.min.js?unknown=polyfill&features=Promise,Map,Set