"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * tsc --init 生成 tsconfig.json
 *
 */
var n = "zhansan";
console.log(n);
console.log(n);
/**
 * 类型
 */
//数组定义：
var a = [123, 4324, 123];
console.log(a);
var arr = [123, 132];
var arr2 = [['1']];
console.log(arr2);
var are = [123, {}, []];
function sun(a, b, c) {
    return a + b + c;
    // IArguments 是arguments的专用接口
    // 常见的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等
    var arg = arguments;
}
var um = sun(1, 2, 3);
console.log(um);
//枚举------------------------------------------------------------------------------------------------------------------------
/*


*/
var paytype;
(function (paytype) {
    paytype[paytype["success"] = 1] = "success";
    paytype[paytype["err"] = 0] = "err";
})(paytype || (paytype = {}));
var f = paytype.err;
console.log(f); //0
var Color;
(function (Color) {
    Color[Color["r"] = 0] = "r";
    Color[Color["f"] = 1] = "f";
    Color[Color["d"] = 2] = "d";
})(Color || (Color = {}));
console.log(Color.d); //2
var Color2;
(function (Color2) {
    Color2[Color2["r"] = 0] = "r";
    Color2[Color2["f"] = 4] = "f";
    Color2[Color2["d"] = 5] = "d"; //5
})(Color2 || (Color2 = {}));
var uu;
// console.log(uu)
var us;
console.log(us); //undefined
us = 123;
console.log(us); //123
//never 其他类型（从来不会出现的值）
//void 没有返回值的函数
// let ss=(a:string)=>{
//             return a
// }
// 函数
// function run(){
//     return 123
// }
function run() {
    return '123';
}
// let  run2=function(){
// }
var run2 = function () {
};
// 传参 
function get(name) {
    if (name === void 0) { name = 'qwe'; }
    return name;
}
var get2 = function (name) {
};
// 可选参数 ?可选参数要放在最后一个参数
function getinfo(name, age) {
    console.log(name);
}
getinfo('zhansan');
// 剩余参数
/*
--------------------------------
--------------------------------
--------------------------------
--------------------------------

*/
function suu1(name, age) {
    var res = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        res[_i - 2] = arguments[_i];
    }
    console.log(arguments);
}
suu1(11, 'zhansan', 123, 123, 123);
function css1(confg) {
    console.log(confg);
    if (typeof confg === 'number') {
        console.log('Number');
    }
    else if (typeof confg === 'string') {
        console.log("String");
    }
    return confg;
}
css1(1);
// 实现
function add(arg1, arg2) {
    // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 arg1 + arg2
    if (typeof arg1 === 'string' && typeof arg2 === 'string') {
        return arg1 + arg2;
    }
    else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
        return arg1 + arg2;
    }
}
add(1, 2); // 3
add('1', '2'); //'12'
//  类
/*
--------------------------------
--------------------------------
--------------------------------
--------------------------------

*/
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
        this.age = 12;
        this.sex = 'man';
    }
    Person.prototype.run = function () {
        console.log(this.name);
    };
    Person.prototype.work = function () {
        console.log(this.name, this.age, this.sex);
    };
    Person.prototype.duotai = function () {
    };
    // 静态方法    static    
    Person.print = function () {
        console.log('jingtai', this.jintai);
    };
    // 静态属性
    Person.jintai = 'eqwe';
    return Person;
}());
var p = new Person('zhangsan');
p.run();
Person.print();
// 继承
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name) {
        var _this = _super.call(this, name) //初始化父类构造函数
         || this;
        _this.name = name + " zi";
        return _this;
    }
    Student.prototype.run = function () {
        console.log(this.name, this.age);
        // console.log(this.sex,'111')// private属性 无法访问
    };
    Student.prototype.duotai = function () {
        console.log('student的多态');
    };
    return Student;
}(Person));
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child(name) {
        var _this = _super.call(this, name) //初始化父类构造函数
         || this;
        _this.name = name + " zi";
        return _this;
    }
    Child.prototype.run = function () {
        console.log(this.name, this.age);
        // console.log(this.sex,'111')// private属性 无法访问
    };
    Child.prototype.duotai = function () {
        console.log('Child的多态');
    };
    return Child;
}(Person));
//类修饰符
/**
 * public:公有属性，在类里面 、类外边和子类都可以访问；
 * protected：保护属性， 在类里面和子类都可以访问；类外边无法访问；
 * private：私有属性，在类里面可以访问，子类和类外无法访问；
 * 属性不加修饰符，默认为公有public
 * static：静态属性; 只能被静态方法调用
 * 方法修饰符：
 *   static 静态方法  ：无法直接调用类里面的属性；只能访问静态属性；无法被子类调用
 *
 */
//类外部访问公有属性
var pp = new Person("lisi");
var ss = new Student("zhangsan");
console.log(pp.name);
pp.run();
pp.work();
ss.run();
//  console.log(pp.age)//无法访问
//  console.log(pp.sex)//无法访问
// 扩展 ： 
// 类实质上就是一个函数。类自身指向的就是构造函数。
// 所以可以认为ES6中的类其实就是构造函数的另外一种写法！
console.log(typeof Person); //function
console.log(Person === Person.prototype.constructor); //true
// 多态   父类定义一个方法，让子类去实现，每个子类的实现不同
var aa = new Student("zhangsan");
var bb = new Child("zhangsan");
aa.duotai();
bb.duotai();
//  ES6中 Object.assign方法来为对象动态增加方法
// Object.assign(Person.prototype,{
//     getName:function(){
//         return this.name;
//     },
//     getAge:function(){
//         return this.age;
//     }
// })
// var obj=new Person("laotie",88);
// console.log(obj.getName());//laotie
// console.log(obj.getAge());//88
// console.log(pp.__proto__===ss.__proto__);//  ES6 中true
// pp.__proto__.sub=function(){
//     return this.num2-this.num1;
// }
// 可以为所有的子类和父类原型 添加sub方法 ES6
// 抽象方法  abstract 抽象方法只能放在抽象类里面
//抽象类和抽象方法，用来定义标准；比如让某个类的子类必须包含某个方法或属性
/*
--------------------------------
--------------------------------
--------------------------------
--------------------------------

*/
var Aminal = /** @class */ (function () {
    function Aminal(name, age) {
        this.name = name;
        this.age = age;
    }
    return Aminal;
}());
// new Aminal() 无法被实例化，只能作为子类的基类
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name, age) {
        var _this = _super.call(this, name, age) //调用父类的构造函数，创建属性
         || this;
        _this.name = 'dog'; //当子类重新定义某一属性，那构造函数传入的值则被子类重新定义的值覆盖
        return _this;
    }
    Dog.prototype.eat = function () {
        console.log('抽象方法实现' + this.name);
    };
    return Dog;
}(Aminal));
var dog = new Dog('小黄狗');
dog.eat(); // ==> 抽象方法实现dog
//接口 定义类属性方法的标准
// 属性接口 对json的约束
function label(label) {
    var oth = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        oth[_i - 1] = arguments[_i];
    }
    console.log(label, oth);
}
label({ lab: 'eqwe' }, 123, 4324);
function paaa(name) {
    console.log(name);
    // console.log(name.age)//报错,虽然可以传入age但是调用会提示错误
}
// paaa({first:'123',end:'qwe',age:123})//age无法传入
var obj = { first: '123', end: 'qwe', age: 123 };
paaa(obj); //age 可以传入
var md5 = function (key, val) {
    console.log(key + val);
    return key;
};
md5('name', 'dadada');
var aA = ['aa', 'bb'];
var uob = { key: '222' };
var Lei = /** @class */ (function () {
    function Lei(name) {
        this.name = name;
    }
    Lei.prototype.eat = function (str) {
        console.log(str);
    };
    return Lei;
}());
var leiD = new Lei('gou');
leiD.eat('shi');
var WW = /** @class */ (function () {
    function WW(name) {
        this.name = name;
        this.age = 12;
    }
    WW.prototype.eat = function (str) {
        console.log(str);
    };
    WW.prototype.work = function () {
        console.log(this.age);
    };
    return WW;
}());
var leiD2 = new WW('gou');
leiD2.eat('shi');
leiD2.work();
//子类ws继承父类Lei 接口限制为 Jcheng
/*
ws 要具有的几个必要条件：
属性：
    1、name --》父类lei 拥有
    2、age ---》自身定义age
方法：
    1、eat ---》父类lei 拥有
    2、work --》 自身定义



*/
var Ws = /** @class */ (function (_super) {
    __extends(Ws, _super);
    function Ws(name, age) {
        var _this = _super.call(this, name) || this;
        _this.age = age;
        return _this;
    }
    Ws.prototype.work = function () {
        console.log(this.name, this.age, '33333333333333333333');
    };
    return Ws;
}(Lei));
var ceshi = new Ws('zhansan', 12);
ceshi.work();
// 泛型 ： 解决 类 接口 方法  的复用性、
//         以及对不特定数据类型的支持
// 泛型函数
// 让一个函数同时返回 number和string
// 让一个函数传入什么类型返回什么类型
function fanxin(val) {
    return val;
}
fanxin(123);
// 泛型类
// 例： 传入一系列参数 返回该系列中最小值
var MInclass = /** @class */ (function () {
    function MInclass() {
        this.list = [];
    }
    MInclass.prototype.add = function (num) {
        this.list.push(num);
    };
    MInclass.prototype.min = function () {
        var min = this.list[0];
        for (var i = 0; i < this.list.length; i++) {
            if (min > this.list[i]) {
                min = this.list[i];
            }
        }
        console.log(min);
        return min;
    };
    return MInclass;
}());
// 传入 number 类型
var m1 = new MInclass();
m1.add(1);
m1.add(2);
m1.add(3);
m1.min();
// 传入 string 类型
var m2 = new MInclass();
m2.add('a');
m2.add('c');
m2.add('b');
m2.min();
// 把类作为参数来约束传入值的类型
var User = /** @class */ (function () {
    function User(params) {
        this.username = params.username;
        this.password = params.password;
    }
    return User;
}());
// class Mysql {
//     add(user: User): boolean {
//         console.log(user)
//         return true
//     }
// }
// var userInfo = new User();
// userInfo.username = '张三';
// userInfo.password = '123123';
// var sql = new Mysql()
// sql.add(userInfo)
// 使用 泛型 重写
var Mysql = /** @class */ (function () {
    function Mysql() {
    }
    Mysql.prototype.add = function (user) {
        console.log(user);
        return true;
    };
    return Mysql;
}());
// var userInfo={
//     username: '张三',
//     password:'123123'
// };
var userInfo = new User({
    username: '张三',
    password: '123123'
});
var sql = new Mysql();
sql.add(userInfo);
function fjf(val1, val2) {
    console.log(val1, val2);
    return val2;
}
var setjk = fjf;
setjk('2222', '32');
var MySqlDb = /** @class */ (function () {
    function MySqlDb() {
    }
    MySqlDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MySqlDb.prototype.update = function (info) {
        console.log(info);
        return true;
    };
    MySqlDb.prototype.delate = function (id) {
        console.log(id);
        return true;
    };
    MySqlDb.prototype.get = function (id) {
        console.log(id);
        var list = [{
                id: 1,
                name: 'q23qweq'
            }];
        return list;
    };
    return MySqlDb;
}());
var MgDb = /** @class */ (function () {
    function MgDb() {
    }
    MgDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MgDb.prototype.update = function (info) {
        console.log(info);
        return true;
    };
    MgDb.prototype.delate = function (id) {
        console.log(id);
        return true;
    };
    MgDb.prototype.get = function (id) {
        console.log(id);
        var list = [{
                id: 1,
                name: 'q23qweq'
            }];
        return list;
    };
    return MgDb;
}());
var UserInfo = /** @class */ (function () {
    function UserInfo(params) {
        this.username = params.username;
        this.password = params.password;
        this.id = params.id;
    }
    return UserInfo;
}());
var UI = new UserInfo({
    username: 'zhansssss',
    password: '123123124214',
    id: 1
});
var msq = new MySqlDb();
msq.add(UI);
msq.get(1);
var mDB = new MgDb();
mDB.add(UI);
mDB.get(1);
// 模块 modTest modules model 
// 命名空间 避免命名冲突 私有的，外界使用需暴露
var AA;
(function (AA) {
    //和外界命名不相干
    AA.ZZZZZZZZ = 'ZZZZZZZZZZZZZZ';
    function cat() {
        console.log(AA.ZZZZZZZZ);
    }
    AA.cat = cat;
    var Dog = /** @class */ (function () {
        function Dog(name) {
            this.name = name;
        }
        Dog.prototype.setName = function () {
            console.log(this.name);
            console.log(AA.ZZZZZZZZ);
        };
        return Dog;
    }());
    AA.Dog = Dog;
})(AA || (AA = {}));
// 调用te
var CCCC = AA.ZZZZZZZZ;
console.log(CCCC);
AA.cat();
var dogZZ = new AA.Dog('gouA');
dogZZ.setName();
var BB_1 = require("./modules/BB");
// 调用
var CCCCB = BB_1.BB.ZZZZZZZZ;
console.log(CCCCB);
BB_1.BB.cat();
var dogZZB = new BB_1.BB.Dog('gouB');
dogZZB.setName();
// 装饰器  就是一个方法，可以注入到 类 方法 属性 参数 上来扩展
// 属性 方法 参数的功能
// 装饰器写法:普通装饰器(无法传参) 、装饰器工厂(可传参)
// 1、类装饰器
// 类装饰器声明在类之前（紧靠着类）。一个类可以有多个同类装饰
// 类装饰器作用与构造函数，可以用监视 修改 替换 类的定义。
function logClass(params) {
    console.log(params);
    params.prototype.apiUrl = '动态加载属性';
    params.prototype.run = function () {
        console.log("run方法");
        console.log(params.toString(), '--------', this);
    };
}
// 普通装饰器
var Zhuangshi = /** @class */ (function () {
    function Zhuangshi(name) {
        this.name = name;
    }
    Zhuangshi.prototype.getdata = function () {
    };
    Zhuangshi = __decorate([
        logClass
    ], Zhuangshi);
    return Zhuangshi;
}());
var zhuangshiqi = new Zhuangshi('张三');
console.log(zhuangshiqi.apiUrl);
zhuangshiqi.run();
// 装饰器工厂
// 装饰器工厂： 装饰器本质是未运行的一个函数，
//             装饰器工厂通过一个运行的函数接受参数，
//             传到return出来的真正的装饰器函数中，就可以达到传值的目的。
// 类装饰器
function logClass1(params) {
    return function (target) {
        console.log(target, 11111); //构造函数
        console.log(params, 22222222); //传入的值
        target.prototype.apiUrl = params; //通过原型链prototype 修改类的原型
        target.prototype.run = function () {
            console.log("run方法");
            console.log(target.toString(), '--------', this);
        };
        // 重载构造函数(相当于把类当基类，返回一个集成该类属性方法的子类)
        //  return class extends target{
        //     name:any='重载'
        //     static date:string='jiqweqwengyaio'
        //     // name2: string|undefined
        //     getdata(){
        //         console.log(this.name,"123123131242")
        //         console.log(this.name2,"name20--")
        //     }
        //     static get(){
        //         console.log(this.date,"name20--123123")
        //     }
        // }
    };
}
// 属性装饰器 只能修改一个值
// 当构造函数里面为该属性重新赋值后该属性装饰器无法修改该属性值
// 重构时会覆盖属性装饰器修改的值
function shuxing(params) {
    return function (target, attr) {
        console.log("属性装饰器");
        console.log(target); //==target.prototype
        console.log(attr); //name
        target[attr] = params;
        console.log("属性装饰器");
    };
}
// 方法装饰器
function fangfazhuangshiqi(params) {
    return function (target, method, desc) {
        console.log(params);
        console.log(target); //方法为静态方法，target为构造函数; 实例方法target就是原型对象 类.prototype
        console.log(method); // 方法名
        console.log(desc); //    方法描述 {} value是方法本身 修改方法的地方
        //修改装饰的方法（重构过的类无法修改）
        var om = desc.value;
        desc.value = function () {
            console.log('方法装饰器修改过后的方法');
            om.apply(this); //继承原方法
        };
        // 可以扩展当前类的属性和方法; 通过 类的原型对象
        target.apiTT = 'xxxx';
        target.runnnnnn = function () {
            console.log("方法装饰器，增加的方法和属性");
            console.log(this.apiTT);
        };
    };
}
var Zhuangshi1 = /** @class */ (function () {
    function Zhuangshi1(name, age) {
        this.name = name;
        this.age = age;
    }
    Zhuangshi1.prototype.getdata = function () {
        console.log(this.name);
        console.log(this.name2, "name20--");
    };
    Zhuangshi1.get = function () {
        console.log(this.date);
    };
    Zhuangshi1.date = 'jingyaio';
    __decorate([
        shuxing('属性装饰器1')
    ], Zhuangshi1.prototype, "name", void 0);
    __decorate([
        shuxing('属性装饰器2')
    ], Zhuangshi1.prototype, "name2", void 0);
    __decorate([
        fangfazhuangshiqi('方法装饰器')
    ], Zhuangshi1.prototype, "getdata", null);
    __decorate([
        fangfazhuangshiqi('方法装饰器2')
    ], Zhuangshi1, "get", null);
    Zhuangshi1 = __decorate([
        logClass1('zhi')
    ], Zhuangshi1);
    return Zhuangshi1;
}());
var zhuangshiqi1 = new Zhuangshi1('xiao张');
console.log(zhuangshiqi1.apiUrl);
zhuangshiqi1.run();
zhuangshiqi1.getdata();
// zhuangshiqi1.runnnnnn()
Zhuangshi1.get();
// 方法参数装饰器
function fangfacanshuzhuangshi(params) {
    return function (target, method, index) {
        console.log(params);
        console.log(target); //方法为静态方法，target为构造函数; 实例方法target就是原型对象 类.prototype
        console.log(method); // 方法名
        console.log(index); //   参数的索引
    };
}
var Fanfashuxin = /** @class */ (function () {
    function Fanfashuxin() {
    }
    Fanfashuxin.prototype.get = function (uu) {
        console.log(uu);
    };
    __decorate([
        __param(0, fangfacanshuzhuangshi('方法参数装饰器'))
    ], Fanfashuxin.prototype, "get", null);
    return Fanfashuxin;
}());
new Fanfashuxin().get("aa");
// 装饰器执行顺序
/*
@类装饰器1
@类装饰器2
class 类{
    @属性装饰器
    name:string |undefined
    constructor(){

    }
    @方法装饰器
    get(){

    }
                            
    set(@方法参数装饰器1 参数1:string, @方法参数装饰器2 参数2:string,){

    }
}

顺序：属性 -> 方法 -> 方法参数 -> 类
    1、属性装饰器
    2、方法装饰器
    3、方法参数装饰器2
    4、方法参数装饰器1
    5、类装饰器2
    6、类装饰器1
*/
