<!--
 * @Author: your name
 * @Date: 2021-01-13 14:32:07
 * @LastEditTime: 2021-01-18 15:05:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Ts\类型保护.md
-->
# typescript类型保护

        function doSome(x: number | string) {
            if (typeof x === 'string') {
                // 在这个块中，TypeScript 知道 `x` 的类型必须是 `string`
                console.log(x.subtr(1)); // Error: 'subtr' 方法并没有存在于 `string` 上
                console.log(x.substr(1)); // ok
            }

            x.substr(1); // Error: 无法保证 `x` 是 `string` 类型
        }







当遇到需要告诉编译器某个值是指定类型的场景时，我们可以使用类型断言，比如这个例子：


        const valueList = [123, "hello"]

        // getValue 函数随机返回数字类型或者字符串类型
        function getValue() {
            const num = Math.random() * 10
            if (num < 5) {
                return valueList[0]
            } else {
                return valueList[1]
            }
        }

        const v = getValue()
        if (v.length) { // error，类型“string | number”上不存在属性“length”。类型“number”上不存在属性“length”。
            console.log(v.length)
        } else {
            console.log(v.toFixed()) // 类型“string | number”上不存在属性“toFixed”。类型“string”上不存在属性“toFixed”。
        }

这种情况在编译阶段报错，可以使用类型断言解决：

        if ((v as string).length) {
            console.log((v as string).length)
        } else {
            console.log((v as number).toFixed()) 
        }
        
使用类型断言虽然可以解决这种需要指定类型的情况，但是显得有些繁琐，我们尝试类型保护的方式来优化。

 

## 自定义类型保护

类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 “类型谓词”。比如可以这样定义一个类型保护函数：

        function isString(value: number | string):value is string{
            const num = Math.random() * 10
            return num > 5
        }

例子中的 value is string 就是类型谓词，value 必须是参数中的一个。使用它也很方便：

        const v = getValue()
        if (isString(v)) { 
            console.log(v.length)
        } else {
            console.log(v.toFixed())
        }

可以看到这比类型断言更简洁，只要检查过一次类型，后续分支就不用检查了，并且会自动推断出 else 分支中的 v 是 number 类型。

# 使用定义的类型保护2

JavaScript 并没有内置非常丰富的、运行时的自我检查机制。当你在使用普通的 JavaScript 对象时（使用结构类型，更有益处），你甚至无法访问 instanceof 和 typeof。在这种情景下，你可以创建用户自定义的类型保护函数，这仅仅是一个返回值为类似于someArgumentName is SomeType 的函数，如下：

    // 仅仅是一个 interface
        interface Foo {
            foo: number;
            common: string;
        }

        interface Bar {
            bar: number;
            common: string;
        }

        // 用户自己定义的类型保护！
        function isFoo(arg: Foo | Bar): arg is Foo {
            return (arg as Foo).foo !== undefined;
        }

        // 用户自己定义的类型保护使用用例：
        function doStuff(arg: Foo | Bar) {
            if (isFoo(arg)) {
                console.log(arg.foo); // ok
                console.log(arg.bar); // Error
            } else {
                console.log(arg.foo); // Error
                console.log(arg.bar); // ok
            }
        }

        doStuff({ foo: 123, common: '123' });
        doStuff({ bar: 123, common: '123' });
 

## typeof 类型保护

自定义类型保护需要定义一个函数来判断类型，难免还是有些复杂，其实在 ts 中，如果是基本类型而不是复杂类型，可以直接使用 typeof 来做类型保护，如：

        if (typeof v === 'string') { 
            console.log(v.length)
        } else {
            console.log(v.toFixed())
        }

这样写是可以的，效果和自定义类型保护一样的。但它有一些限制，这些 typeof 类型保护只有两种形式能被识别： typeof v === "typename"和 typeof v !== "typename"， "typename"必须是 "number"， "string"， "boolean"或 "symbol"。 但是TypeScript并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护。

 

## instanceof 类型保护

instanceof 操作符是 JS 中的原生操作符，用来判断一个实例是不是某个构造函数创建的，或者是不是使用 es6 语法的某个类创建的。在 ts 中，使用 instanceof 操作符可以达到类型保护的效果。例子：

        class Class1 {
            constructor(public name: string = 'aa') { }
        }

        class Class2 {
            constructor(public age: number = 18) { }
        }

        function getRandomItem() {
            return Math.random() > 0.5 ? new Class1() : new Class2()
        }

        const item = getRandomItem()
        if (item instanceof Class1) {
            console.log(item.name)
        } else {
            console.log(item.age)
        }
        
if 分支中使用 instanceof 判断了 item，如果是 Class1 创建的，那么应该有 name 属性，如果不是，那它就有 age 属性


# in 操作符可以安全的检查一个对象上是否存在一个属性，它通常也被作为类型保护使用：

    interface A {
        x: number;
    }

    interface B {
        y: string;
    }

    function doStuff(q: A | B) {
        if ('x' in q) {
            // q: A
        } else {
            // q: B
        }
    }


# 字面量类型保护
当你在联合类型里使用字面量类型时，你可以检查它们是否有区别：

    type Foo = {
        kind: 'foo'; // 字面量类型
        foo: number;
    };

    type Bar = {
        kind: 'bar'; // 字面量类型
        bar: number;
    };

    function doStuff(arg: Foo | Bar) {
        if (arg.kind === 'foo') {
            console.log(arg.foo); // ok
            console.log(arg.bar); // Error
        } else {
            // 一定是 Bar
            console.log(arg.foo); // Error
            console.log(arg.bar); // ok
        }
    }