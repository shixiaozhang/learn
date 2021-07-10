# 编写单元测试用例

## 技术选型:Mocha + Chai or assert

* chai 和 assert：断言库


//add.test.js

    const expect=require('chai').expect
    const add=require('../src/add')

    describe('************************',()=>{
        it('add(1,2) === 3',()=>{
        expect(add(1,2).to.equal(3));
        })
    })

## 测试代码:describe, it, except 

* describe  : 关于测试文件的描述，
* it        : 一个it代表一个测试用例
* except    : 断言


## 测试用例运行的命令: 

    mocha add.test.js   


# 单元测试接入项目：

1. 安装 mocha + chai 
   npm i mocha chai -D

2. 新建 test 目录，并增加 xxx.test.js 测试文件
   
3. 在 package.json 中的 scripts 字段增加 test 命令
   
    "scripts": {
        "test": "node_modules/mocha/bin/_mocha” //或者： "test": "mocha”
    },

4. 执行测试命令
   
    npm run test

### 测试覆盖率：

cnpm i istanbul -D

"scripts": {
        "test": "istanbul cover node_modules/mocha/bin/_mocha” //或者： "test": "istanbul cover mocha”
    },

   npm run test