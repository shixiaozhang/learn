<!--
 * @Author: your name
 * @Date: 2021-01-12 17:18:39
 * @LastEditTime: 2021-01-12 17:58:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Ts\Ts笔记.md
-->


#  TypeScript 编译

* 运行 tsc，它会在当前目录或者是父级目录寻找 tsconfig.json 文件。
* 运行 tsc -p ./path-to-project-directory 。当然，这个路径可以是绝对路径，也可以是相对于当前目录的相对路径。
* 运行 tsc -w 来启用 TypeScript 编译器的观测模式，在检测到文件改动之后，它将重新编译




# 类型声明空间：（不能当做变量）

    class Foo {}//可以当做变量
    interface Bar {}//不能当做变量
    type Bas = {};//不能当做变量


# 变量声明空间

变量声明空间包含可用作变量的内容，在上文中 Class Foo 提供了一个类型 Foo 到类型声明空间，此外它同样提供了一个变量 Foo 到变量声明空间

class Foo {}
const someVar = Foo;
const someOtherVar = 123;


# 模块


## 全局模块:当一个ts文件中不存在export和import时；他默认是全局模块；他内部的变量是其他ts文件，可以直接访问的；


# 文件模块：当一个ts文件中存在export和import时；它不仅允许你使用从其他文件导入的内容，还会将此文件 bar.ts 标记为一个模块，不会“污染”全局命名空间


# 默认导入／导出

使用 export default
在一个变量之前（不需要使用 let/const/var）；
在一个函数之前；
在一个类之前

    // some var
    export default (someVar = 123);

    // some function
    export default function someFunction() {}

    // some class
    export default class someClass {}

导入使用 import someName from 'someModule' 语法（你可以根据需要为导入命名）：

    import someLocalNameForThisFile from './foo';