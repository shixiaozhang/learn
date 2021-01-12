<!--
 * @Author: your name
 * @Date: 2021-01-12 17:18:39
 * @LastEditTime: 2021-01-12 17:54:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Ts\Ts笔记.md
-->

# tsconfig.json

    {
        "compilerOptions": {

            /* 基本选项 */
            "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
            "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
            "lib": [],                             // 指定要包含在编译中的库文件
            "allowJs": true,                       // 允许编译 javascript 文件
            "checkJs": true,                       // 报告 javascript 文件中的错误
            "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
            "declaration": true,                   // 生成相应的 '.d.ts' 文件
            "sourceMap": true,                     // 生成相应的 '.map' 文件
            "outFile": "./",                       // 将输出文件合并为一个文件
            "outDir": "./",                        // 指定输出目录
            "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
            "removeComments": true,                // 删除编译后的所有的注释
            "noEmit": true,                        // 不生成输出文件
            "importHelpers": true,                 // 从 tslib 导入辅助工具函数
            "isolatedModules": true,               // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.

            /* 严格的类型检查选项 */
            "strict": true,                        // 启用所有严格类型检查选项
            "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
            "strictNullChecks": true,              // 启用严格的 null 检查
            "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
            "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

            /* 额外的检查 */
            "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
            "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
            "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
            "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

            /* 模块解析选项 */
            "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
            "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
            "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
            "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
            "typeRoots": [],                       // 包含类型声明的文件列表
            "types": [],                           // 需要包含的类型声明文件名列表
            "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

            /* Source Map Options */
            "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
            "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
            "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
            "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

            /* 其他选项 */
            "experimentalDecorators": true,        // 启用装饰器
            "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
        }
    }


#  TypeScript 编译

好的 IDE 支持对 TypeScript 的即时编译。但是，如果你想在使用 tsconfig.json 时从命令行手动运行 TypeScript 编译器，你可以通过以下方式：

* 运行 tsc，它会在当前目录或者是父级目录寻找 tsconfig.json 文件。
* 运行 tsc -p ./path-to-project-directory 。当然，这个路径可以是绝对路径，也可以是相对于当前目录的相对路径。
* 你甚至可以使用 tsc -w 来启用 TypeScript 编译器的观测模式，在检测到文件改动之后，它将重新编译



# 指定文件
## 你也可以显式指定需要编译的文件：

    {
        "files": [
            "./some/file.ts"
        ]
    }

## 你还可以使用 include 和 exclude 选项来指定需要包含的文件和排除的文件：

    {
        "include": [
            "./folder"
        ],
        "exclude": [
            "./folder/**/*.spec.ts",
            "./folder/someSubFolder"
        ]
    }
   ## 注意

  使用 globs：**/* （一个示例用法：some/folder/**/*）意味着匹配所有的文件夹和所有文件（扩展名为 .ts/.tsx，当开启了 allowJs: true 选项时，扩展名可以是 .js/.jsx）。

  # 声明空间:分为声明类型和声明变量，除了class定义的值除外，其他的两者不能相互赋值

  ## 在 TypeScript 里存在两种声明空间：类型声明空间与变量声明空间。

  # 类型声明空间


类型声明空间包含用来当做类型注解的内容


    class Foo {}//可以当做变量
    interface Bar {}//不能当做变量
    type Bas = {};//不能当做变量
    
你可以将 Foo, Bar, Bas 作为类型注解使用，示例如下：

    let foo: Foo;
    let bar: Bar;
    let bas: Bas;

注意，尽管你定义了 interface Bar，却并不能够把它作为一个变量来使用，因为它没有定义在变量声明空间中。

    interface Bar {}
    const bar = Bar; // Error: "cannot find name 'Bar'"

出现错误提示提示： cannot find name 'Bar' 的原因是名称 Bar 并未定义在变量声明空间。

# 变量声明空间

变量声明空间包含可用作变量的内容，在上文中 Class Foo 提供了一个类型 Foo 到类型声明空间，此外它同样提供了一个变量 Foo 到变量声明空间，如下所示：

class Foo {}
const someVar = Foo;
const someOtherVar = 123;

与此相似，一些用 var 声明的变量，也只能在变量声明空间使用，不能用作类型注解。

    const foo = 123;
    let bar: foo; // ERROR: "cannot find name 'foo'"

提示 ERROR: "cannot find name 'foo'" 原因是，名称 foo 没有定义在类型声明空间里。



# 模块

## 全局模块

在默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中。如在 foo.ts 里的以下代码。

    const foo = 123;

如果你在相同的项目里创建了一个新的文件 bar.ts，TypeScript 类型系统将会允许你使用变量 foo，就好像它在全局可用一样：

    const bar = foo; // allowed

毋庸置疑，使用全局变量空间是危险的，因为它会与文件内的代码命名冲突。我们推荐使用下文中将要提到的文件模块

# 文件模块


文件模块也被称为外部模块。如果在你的 TypeScript 文件的根级别位置含有 import 或者 export，那么它会在这个文件中创建一个本地的作用域。因此，我们需要把上文 foo.ts 改成如下方式（注意 export 用法）：

    export const foo = 123;

在全局命名空间里，我们不再有 foo，这可以通过创建一个新文件 bar.ts 来证明：

    const bar = foo; // ERROR: "cannot find name 'foo'"

如果你想在 bar.ts 里使用来自 foo.ts 的内容，你必须显式地导入它，更新后的 bar.ts 如下所示。

    import { foo } from './foo';
    const bar = foo; // allow

在 bar.ts 文件里使用 import 时，它不仅允许你使用从其他文件导入的内容，还会将此文件 bar.ts 标记为一个模块，文件内定义的声明也不会“污染”全局命名空间

# 文件模块详情

使用 module: commonjs 选项以及使用 ES 模块语法导入、导出、编写模块