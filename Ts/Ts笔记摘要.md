<!--
 * @Author: your name
 * @Date: 2021-01-12 17:18:39
 * @LastEditTime: 2021-01-12 21:00:50
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




# typeof 简介
在 TypeScript 中， typeof 操作符可以用来获取一个变量或对象的类型。

    interface Person {
    name: string;
    age: number;
    }

    const sem: Person = { name: "semlinker", age: 30 };
    type Sem = typeof sem; // type Sem = Person

在上面代码中，我们通过 typeof 操作符获取 sem 变量的类型并赋值给 Sem 类型变量，之后我们就可以使用 Sem 类型：

    const lolo: Sem  = { name: "lolo", age: 5 }

你也可以对嵌套对象执行相同的操作：

    const kakuqo = {
        name: "kakuqo",
        age: 30,
        address: {
        province: '福建',
        city: '厦门'   
        }
    }

    type Kakuqo = typeof kakuqo;
    /*
    type Kakuqo = {
        name: string;
        age: number;
        address: {
            province: string;
            city: string;
        };
    }
    */

此外， typeof 操作符除了可以获取对象的结构类型之外，它也可以用来获取函数对象的类型，比如：

    function toArray(x: number): Array<number> {
    return [x];
    }

    type Func = typeof toArray; // -> (x: number) => number[]


# typeof 和 keyof 操作符
在 TypeScript 中， typeof 操作符可以用来获取一个变量或对象的类型。而 keyof 操作符可以用于获取某种类型的所有键，其返回类型是联合类型。了解完 typeof 和 keyof 操作符的作用，我们来举个例子，介绍一下它们如何结合在一起使用：

    const COLORS = {
    red: 'red',
    blue: 'blue'
    }

// 首先通过typeof操作符获取Colors变量的类型，然后通过keyof操作符获取该类型的所有键，
// 即字符串字面量联合类型 'red' | 'blue'

    type Colors = keyof typeof COLORS 
    let color: Colors;
    color = 'red' // Ok
    color = 'blue' // Ok

    // Type '"yellow"' is not assignable to type '"red" | "blue"'.
    color = 'yellow' // Error


# 类型断言有两种方式：

    <类型>值

    // 或者

    值 as 类型


# 双重断言
类型断言，尽管我们已经证明了它并不是那么安全，但它也还是有用武之地。如下一个非常实用的例子所示，当使用者了解传入参数更具体的类型时，类型断言能按预期工作：

    function handler(event: Event) {
    const mouseEvent = event as MouseEvent;
    }

然而，如下例子中的代码将会报错，尽管使用者已经使用了类型断言：

    function handler(event: Event) {
    const element = event as HTMLElement; // Error: 'Event' 和 'HTMLElement' 中的任何一个都不能赋值给另外一个
    }

如果你仍然想使用那个类型，你可以使用双重断言。首先断言成兼容所有类型的 any，编译器将不会报错：

    function handler(event: Event) {
    const element = (event as any) as HTMLElement; // ok
    }
    
# TypeScript 是怎么确定单个断言是否足够

当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 T。这是为了在进行类型断言时提供额外的安全性，完全毫无根据的断言是危险的，如果你想这么做，你可以使用 any。


# import/require 仅仅是导入类型（懒加载 没看懂）


# global.d.ts 文件

global.d.ts 文件，用来将一些接口或者类型放入全局命名空间里，这些定义的接口和类型能在你的所有 TypeScript 代码里使用

tips：对于任何需要编译成 JavaScript 的代码，我们强烈建议你放入文件模块里。

* global.d.ts 是一种扩充 lib.d.ts 很好的方式，如果你需要的话。
* 当你从 JS 迁移到 TS 时，定义 declare module "some-library-you-dont-care-to-get-defs-for" 能让你快速开始


# 命名空间

在确保创建的变量不会泄漏至全局命名空间时

    namespace Utility {
    export function log(msg) {
        console.log(msg);
    }
    export function error(msg) {
        console.log(msg);
    }
    }

    // usage
    Utility.log('Call me');
    Utility.error('maybe');

namespace 关键字编译后的 JavaScript 代码，与我们早些时候看到的 JavaScript 代码一样。

    (function (Utility) {
    // 添加属性至 Utility
    })(Utility || Utility = {});


 #   动态导入表达式
 


## webpack 实现代码分割的方式有两种：

使用 import() （首选，ECMAScript 的提案）和 require.ensure() （最后考虑，webpack 具体实现）。因此，我们期望 TypeScript 的输出是保留 import() 语句，而不是将其转化为其他任何代码。


        import(/* webpackChunkName: "momentjs" */ 'moment')
            .then(moment => {
                // 懒加载的模块拥有所有的类型，并且能够按期工作
                // 类型检查会工作，代码引用也会工作  :100:
                const time = moment().format();
                console.log('TypeScript >= 2.4.0 Dynamic Import Expression:');
                console.log(time);
            })
            .catch(err => {
                console.log('Failed to load moment', err);
            });

##重要的提示

tsconfig.json使用 "module": "esnext" 选项：TypeScript 保留 import() 语句，该语句用于 Webpack Code Splitting。