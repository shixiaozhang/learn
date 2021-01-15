<!--
 * @Author: your name
 * @Date: 2021-01-12 17:18:39
 * @LastEditTime: 2021-01-15 17:06:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Ts\Ts笔记.md
-->
# 各种关键词汇总：

## interface:接口定义类型；

interface Add{
    a:number;
    fly();void;
}

## type :类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型,类型别名不能被 extends(继承)和 implements(实现)

 类型别名不能出现在声明右侧的任何地方

    type Yikes = Array<Yikes>; // error

但是可以这样

    type Tree<T> = {
        value: T;
        left: Tree<T>;
        right: Tree<T>;
    }
    
## typeof :可用于获取变量的类型 只能用于 number, string, boolean, symbol
 
 typeof类型保护*只有两种形式能被识别：
    typeof v === "typename"和 typeof v !== "typename"，
    "typename"必须是 "number"， "string"， "boolean"或 "symbol"。

    if (typeof padding === 'number') {
            return Array(padding + 1).join('') + value
        }

## instanceof :右侧要求是一个构造函数，用于类。获取前者是不是这个类的类型；
instanceof操作符是 JS 中的原生操作符，用来判断一个实例是不是某个构造函数创建的
    
    interface Padder {
        getPaddingString(): string
    }

    class SpaceRepeatingPadder implements Padder {
        constructor(private numSpaces: number) { }
        getPaddingString() {
            return Array(this.numSpaces + 1).join(" ");
        }
    }

    if (padder instanceof SpaceRepeatingPadder) {
        padder; // 类型细化为'SpaceRepeatingPadder'
    }


# implements 和 extends 一起使用：

    interface Alarm {
        alert(): void;
    }

    class Door {
    }
    //先继承Door 再 实现Alarm；
    
    //实现的Alarm 不影响 继承的 Door；只影响 SecurityDoor

    class SecurityDoor extends Door implements Alarm {
        alert() {
            console.log('SecurityDoor alert');
        }
    }

    class Car implements Alarm {
        alert() {
            console.log('Car alert');
        }
    }










# implements ：类实现（implements）接口

    interface Alarm {
        // 定义一个公用的方法，具体的实现在实现的类里面去实现
        warning():void;
    }
    class Door implements Alarm {
        warning() {
            console.log('门报警器');
        }
    }
# extends ：接口继承的关键词，也是函数继承的关键词

接口的继承：

    interface Shape {
     color: string;
    }
    interface Square extends Shape {
        sideLength: number;
    }

接口 继承 基类：

    class Animal {
        //基类可以直接当类型使用

        //function printPoint(p: Animal) {}
        
        name: string;
        // move: (x: string, y: number) => string;
        move() {
            console.log(123);
        }
    }
    interface Dog extends Animal {
        eat(): void;
    }

## 为什么 TypeScript 会支持接口继承类呢？

实际上，当我们在声明 class Animal 时，除了会创建一个名为 Animal 的类之外，同时也创建了一个名为 Animal 的类型（实例的类型）。

        class Point {
            x: number;
            y: number;
            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
            }
        }

        interface PointInstanceType {
            x: number;
            y: number;
        }

        function printPoint(p: PointInstanceType) {
            console.log(p.x, p.y);
        }

        printPoint(new Point(1, 2));

新声明的 PointInstanceType 类型，与声明 class Point 时创建的 Point 类型是等价的。

## 声明 Point 类时创建的 Point 类型只包含其中的实例属性和实例方法

值得注意的是，PointInstanceType 相比于 Point，缺少了 constructor 方法，这是因为声明 Point 类时创建的 Point 类型是不包含构造函数的。另外，除了构造函数是不包含的，静态属性或静态方法也是不包含的（实例的类型当然不应该包括构造函数、静态属性或静态方法）。
    
## 注意：
接口可以继承自一个类，从而像声明了所有类中存在的成员，并且private和protected成员也会被继承，这意味着：只有类自己或子类能够实现该接口，例子如：

        class A {
            protected propA: string
        }
        interface I extends A {
            method(): void
        }

        // 下面这种做法会报错
        class C implements A {
            // 因为propA是类A的保护成员，只有自身和子类可实现
            // 但类C不是A的子类
            protected propA: string
            method() {}
        }

        // 下面这种做法则是允许的
        class C extends A implements A {
            protected propA: string
            method() {}
        }
        
## keyof ：可以用于获取某种类型的所有键，其返回类型是联合类型。

    interface Person {
        name: string;
        age: number;
        location: string;
    }

    type K1 = keyof Person; // "name" | "age" | "location"
    type K2 = keyof Person[];  // number | "length" | "push" | "concat" | ...
    type K3 = keyof { [x: string]: Person };  // string | number



## in ：可以遍历枚举类型，遍历 Keys


    type Keys = 'a' | 'b' | 'c';
    
    type Objooo = {

        [T in Keys]: string;

    }
    // 包装一个类型的属性
    type Proxy<T> = {
        get(): T
        set(value: T): void
    }
    type Proxify<T> = {

        [P in keyof T]: Proxy<T[P]>
        
    }




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

使用 import() （首选，ECMAScript 的提案）和 require.ensure() 

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

# 数组定义：arr: number[]; arr: Array<number> ; arr: Array<[any]> ;arr: [number, object, []]

    let a: number[] = [123, 4324, 123];
    console.log(a);

    let arr: Array<number> = [123, 132]
    interface Numberarr {
        [index: number]: string
    }
    let arr2: Array<[any]> = [['1']]
    console.log(arr2)



    let are: [number, object, []] = [123, {}, []]

    function sun(a: number, b: number, c: number): number {
        return a + b + c

        // IArguments 是arguments的专用接口
        // 常见的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等
        
        let arg: IArguments = arguments
    }

    const um: number = sun(1, 2, 3)
    console.log(um)

#  IArguments 是arguments的专用接口

常见的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等.

# any：所有类型都能被赋值给它，它也能被赋值给其他任何类型

# unknown 类型：
// unknown 类型也被认为是 top type ，但它更安全。
// 与 any 一样，所有类型都可以分配给unknown。

let uncertain: unknown = 'Hello'!;
uncertain = 12;
uncertain = { hello: () => 'Hello!' };

// 我们只能将 unknown 类型的变量赋值给 any 和 unknown。
let notSure: any = uncertain;


# null 和 undefined
在类型系统中，JavaScript 中的 null 和 undefined 字面量和其他被标注了 any 类型的变量一样，都能被赋值给任意类型的变量，如下例子所示：

    // strictNullChecks: false

    let num: number;
    let str: string;

    // 这些类型能被赋予
    num = null;
    str = undefined;



# 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

    function loggingIdentity<T>(arg: T): T {
        console.log(arg.length);
        return arg;
    }

    // index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
    //泛型 T 不一定包含属性 length，所以编译的时候报错了


## 对泛型进行约束

    interface Lengthwise {
        length: number;
    }

    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);
        return arg;
    }

## 多个类型参数之间也可以互相约束：

    function copyFields<T extends U, U>(target: T, source: U): T {
        for (let id in source) {
            target[id] = (<T>source)[id];
        }
        return target;
    }

    let x = { a: 1, b: 2, c: 3, d: 4 };

    copyFields(x, { b: 10, d: 20 });


## 泛型接口：

    interface CreateArrayFunc<T> {
        (length: number, value: T): Array<T>;
    }

    let createArray: CreateArrayFunc<any>;
    createArray = function<T>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }

    createArray(3, 'x'); // ['x', 'x', 'x']

## 泛型类

    class Animal<T>{
        zeroValue: T;
        add: (x: T, y: T) => T;
    }

    let myGenericNumber = new GenericNumber<number>();

## 泛型参数的默认类型

    <T=string>

# 接口的合并

    interface Alarm {
        price: number;
    }
    interface Alarm {
        weight: number;
    }

相当于：

    interface Alarm {
        price: number;
        weight: number;
    }
## 合并的属性的类型必须是唯一的,类型不一致，会报错

# 接口中方法的合并，与函数的合并一样

    interface Alarm {
        price: number;
        alert(s: string): string;
    }
    interface Alarm {
        weight: number;
        alert(s: string, n: number): string;
    }

相当于：

    interface Alarm {
        price: number;
        weight: number;
        alert(s: string): string;
        alert(s: string, n: number): string;
    }

相当于函数重构：

    function reverse(x: number): number;
    function reverse(x: string): string;
    function reverse(x: number | string): number | string {
        if (typeof x === 'number') {
            return Number(x.toString().split('').reverse().join(''));
        } else if (typeof x === 'string') {
            return x.split('').reverse().join('');
        }
    }



# 箭头函数：

它仅仅只能作为简单的箭头函数，你无法使用重载。如果想使用重载，你必须使用完整的 { (someArgs): someReturn } 的语法

        let jiantou=(val:number)=>val.toString();

        // 编译: var jiantou = function (val) { return val.toString(); };


        const simple: (foo: number) => string = foo => foo.toString();

        //编译: var simple = function (foo) { return foo.toString(); };

解释：simple: 后面到 =foo 之前的 (foo: number) => string 这部分是对simple的类型注释；
相当于

    type sm=(foo: number) => string;

    const simple2:sm  = foo => foo.toString();

    //编译: var simple2 = function (foo) { return foo.toString(); };

# 可实例化

可实例化仅仅是可调用的一种特殊情况，它使用 new 作为前缀。它意味着你需要使用 new 关键字去调用它：

    interface CallMeWithNewToGetString {
    new (): string;
    }

    // 使用
    declare const Foo: CallMeWithNewToGetString;
    const bar = new Foo(); // bar 被推断为 string 类型