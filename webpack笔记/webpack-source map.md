# 开发环境开启，线上环境关闭
* *线上排查问题的时候可以将 sourcemap 上传到错误监控系统；
* source-map不同模式搭配可以让我们在调试阶段更好的展示，错误所在的位置
* 不开启source-map我们打一个断点的话，此时显示的代码是打包过的代码，很难读懂和调试；
# source map 关键字

* eval: 使⽤用eval包裹模块代码，不产⽣.map⽂文件
* source-map: 会产⽣.map⽂件 
* cheap: 不包含列信息
* inline: 将.map作为DataURI嵌⼊，不单独⽣生成.map文件 ，js内容和source-map文件内联在一起
* module:包含loader的sourcemap

# 使用：上面几个类型是可以排列组合的；如：cheap-source-map、inline-source-map、cheap-eval-source-map
webpack配置中添加：

 devtool:'source-map',


 # source map 类型：

 ![img](allImg/source-map类型.png)