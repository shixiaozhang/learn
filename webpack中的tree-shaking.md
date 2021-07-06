# tree shaking(摇树优化)

## 概念:



1 个模块可能有多个⽅方法，只要其中的某个⽅方法使⽤用到了了，
则整个⽂文件都会被打到 bundle ⾥里里⾯面去，tree shaking 就是只把⽤用到的⽅方法打⼊入 bundle ，
没⽤用到的⽅方法会在 uglify 阶段被擦除掉。

## 使⽤:

webpack 默认⽀支持:
* 在 .babelrc ⾥里里设置 modules: false 即可 ,因为babel会默认将所有es6 import转化成cjs，所以我们要关掉这个默认功能，babel的presents 中的 modules为false关闭es6转es5
  
* production mode的情况下默认开启

## 要求:

**tree-shaking需要对代码进行静态分析，因为import 是静态引入，require是动态引入，代码有没有被用到，不能等到代码运行时在做判断，需要在定义后就进行判断，当判断到代码没有被用到，且没有副作用时，tree-shaking会给代码加上注释，在生成bundle前删除代码。**

必须是 ES6 的语法，CJS 的⽅方式不不⽀支持


## 什么样的代码会被擦除：--- DCE

* 代码不不会被执⾏行行，不不可到达
* 代码执⾏行行的结果不不会被⽤用到
* 代码只会影响死变量量(只写不不读)

## 原理：对代码进行静态分析

* 利用 ES6 模块的特点: 
·只能作为模块顶层的语句句出现
· import 的模块名只能是字符串串常量量
· import binding 是 immutable的 

* 代码擦除: uglify 阶段删除⽆无⽤用代码

## 缺点：

tree shaking 无法对存在副作用的代码尽心优化；
* class中无用方法：他无法做出判断；
* 存在副作用的代码，tree-shaking 不会对其进行擦除 

## tree-shkaing 优化：
## sideEffects 是什么呢？我用一句话来概括就是：让 webpack 去除 tree shaking 带来副作用的代码。