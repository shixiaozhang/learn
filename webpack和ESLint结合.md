* ⾏业里面优秀的 ESLint 规范实践
Airbnb: eslint-config-airbnb、 eslint-config-airbnb-base
* 腾讯:
·alloyteam团队 eslint-config-alloy(https://github.com/AlloyTeam/eslint-config-alloy) ·ivweb 团队:eslint-config-ivweb(https://github.com/feflow/eslint-config-ivweb)


* 制定团队的 ESLint 规范

+ 不重复造轮⼦子，基于 eslint:recommend 配置并 改进
+ 能够帮助发现代码错误的规则，全部开启
+ 帮助保持团队的代码⻛风格统⼀一，⽽不是限制开发体验


# ESLint 如何执⾏落地?


* 和 CI/CD 系统集成 
* 和 webpack 集成


## ⽅案一:webpack 与 CI/CD 集成


### 本地开发阶段增加 precommit 钩⼦

安装 husky
    npm install husky --save-dev

增加 npm script，通过 lint-staged 增量量检查修改的⽂文件

    "scripts": {
        "precommit": "lint-staged"
    }, 
    "lint-staged": {
        "linters": {
            "*.{js,scss}": ["eslint --fix", "git add"]
         }
    },


 ## 方案二:webpack 与 ESLint 集成

 ### 使用 eslint-loader，构建时检查 JS 规范

 module.exports = { 
     module: {
        rules: [
            {
                test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        "babel-loader", "eslint-loader”
                    ] 
            }
       ] 
    }
 }

 ### 使用 eslint-config-airbnb

可以去 https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb 查看官方使用手册

先安装依赖：

    npm i eslint eslint-loader babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y -D

增加loader：

    module: {
            rules: [
                {
                    test: /.js$/,
                    use: [
                        'babel-loader',
                        'eslint-loader'
                    ]
                },
            ]
    }

### 初始化eslint 配置文件：---官网有详细教程
https://eslint.bootcss.com/docs/user-guide/getting-started
你可以使用 npm 安装 ESLint：

    $ npm install eslint --save-dev

紧接着你应该设置一个配置文件：

    $ ./node_modules/.bin/eslint --init

    //或

    npm install eslint --save-dev // 安装 eslint 依赖
    npx eslint --init // 初始化 eslint 配置

之后，你可以在任何文件或目录上运行ESLint如下：  

    $ ./node_modules/.bin/eslint yourfile.js

也可以在全局而不是本地安装 ESLint (使用 npm install eslint --global)。但是，你使用的任何插件或可共享配置都必须安装在本地。

### Configuration

注意：如果你之前使用的版本低于 1.0.0，请查看 迁移指南。

运行 eslint --init 之后，.eslintrc 文件会在你的文件夹中自动创建。你可以在 .eslintrc 文件中看到许多像这样的规则：

    {
        "rules": {
            "semi": ["error", "always"],
            "quotes": ["error", "double"]
        }
    }

"semi" 和 "quotes" 是 ESLint 中 规则 的名称。第一个值是错误级别，可以使下面的值之一：

    "off" or 0 - 关闭规则
    "warn" or 1 - 将规则视为一个警告（不会影响退出码）
    "error" or 2 - 将规则视为一个错误 (退出码为1)

这三个错误级别可以允许你细粒度的控制 ESLint 是如何应用规则（更多关于配置选项和细节的问题，请查看配置文件）

你的 .eslintrc 配置文件可以包含下面的一行：

    "extends": "eslint:recommended"

### Configuring ESLint
ESlint 被设计为完全可配置的，这意味着你可以关闭每一个规则而只运行基本语法验证，或混合和匹配 ESLint 默认绑定的规则和你的自定义规则，以让 ESLint 更适合你的项目。有两种主要的方式来配置 ESLint：

1、Configuration Comments - 使用 JavaScript 注释把配置信息直接嵌入到一个代码源文件中。

2、Configuration Files - 使用 JavaScript、JSON 或者 YAML 文件为整个目录（处理你的主目录）和它的子目录指定配置信息。可以配置一个独立的 ** .eslintrc.* **文件，或者直接在 ** package.json **文件里的 **eslintConfig **字段指定配置，ESLint 会查找和自动读取它们，再者，你可以在命令行运行时指定一个任意的配置文件。

如果你在你的主目录（通常 ~/）有一个配置文件，ESLint 只有在无法找到其他配置文件时才使用它。

有很多信息可以配置：

    Environments - 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。
    Globals - 脚本在执行期间访问的额外的全局变量。
    Rules - 启用的规则及其各自的错误级别。

所有这些选项让你可以细粒度地控制 ESLint 如何对待你的代码。



# ESLint 代码修复符合规范和错误提示；
# 使用 ESLint 规范构建脚本

## 使用 eslint-config-airbnb-base 

eslint --fix 可以自动处理空格

 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "eslint":"eslint ./lib --fix"
  },
  
## 配置：

### 安装依赖：

**cnpm i eslint babel-eslint eslint-config-airbnb-base -D**

### 增加配置：

    module.exports = {
        "parser": "babel-eslint", 
        "extends": "airbnb-base", 
        "env": {
            "browser": true,
            "node": true 
        }
    };


### 运行： yarn eslint 

* 自动修复空格换行相关报错；
* 提示其他的 语法错误


### 禁用某一行的检查：

//这行的检测会被跳过
console.log('23123)//eslint-disable-line