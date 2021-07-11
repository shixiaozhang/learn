# 移动端 CSS px ⾃自动转换成 rem

px2rem-loader lib-flexible配合使用

## lib-flexible:页⾯渲染时动态计算根元素的 font-size 值rem

* 可以使⽤用⼿手淘的lib-flexible库

* https://github.com/amfe/lib-flexible

## 使用：

### 安装 px2rem-loader lib-flexible

cnpm i px2rem-loader -D
cnpm i lib-flexible -S 

### 配置loader参数

remUnit：1rem ---等于多少px
remPrecesion：8 ----转换的时候保留 rem 小数点位数

{
    loader:'px2rem-loader',
    options:{
        remUnit:75,//? 1rem = 75px
        remPrecesion:8,//? 转换的时候rem 小数点位数
    }
}

### 引入 lib-flexible的方法：
 lib-flexible的替代方案：amfe-flexible（官方推荐amfe）
* 1、在项目入口文件 main.js 里 引入 lib-flexible

import 'lib-flexible/flexible.js'
import 'amfe-flexible/index.js'

* 2、在项目根目录的index.html 头部删除自动生成的meta标签, lib-flexible会根据屏幕自动生成相对于的meta标签
// lib-flexible中删除

<meta name="viewport" content="width=device-width,initial-scale=1.0">
//amfe-flexible中不删除
<meta name="viewport" content="width=device-width,initial-scale=1.0">

<script src="../node_modules/lib-flexible/flexible.js"></script>