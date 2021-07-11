# 持续集成的作用

## 优点:

* 快速发现错误 
* 防止分支大幅偏离主干


**核心措施是，代码集成到主干之前，必须通过自动化测试。只要有一个测试用例失败，就不能集成。**

## 接入 Travis CI

1. https://travis-ci.org/ 使用 GitHub 账号登录
2. 在 https://travis-ci.org/account/repositories 为项目开启--新版地址：https://travis-ci.com/
3. 项目根目录下新增 .travis.yml


![img](allImg/webpack-travis.png)

# 示例地址：
我的github ：build-webpack-zpc 

