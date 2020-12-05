/**
 * tsc --init 生成 tsconfig.json
 * 
 */
let n: string = "zhansan";
console.log(n);
console.log(n);

/**
 * 类型
 */
//数组定义：
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

//枚举------------------------------------------------------------------------------------------------------------------------
/*


*/
enum paytype {
    success = 1,
    err = 0
}


let f: paytype = paytype.err

console.log(f)//0

enum Color {//默认0  1  2 ...
    r,
    f,
    d
}
console.log(Color.d) //2
enum Color2 {
    r,//0
    f = 4,//4
    d //5
}

let uu: number;
// console.log(uu)
let us: number | undefined;
console.log(us) //undefined

us = 123
console.log(us) //123


//never 其他类型（从来不会出现的值）






//void 没有返回值的函数
// let ss=(a:string)=>{
//             return a
// }

// 函数

// function run(){
//     return 123
// }

function run(): string {
    return '123'
}







// let  run2=function(){

// }

let run2 = function (): void {

}
// 传参 
function get(name: string = 'qwe'): string {
    return name
}
var get2 = function (name: string): void {

}
// 可选参数 ?可选参数要放在最后一个参数

function getinfo(name: string, age?: number): void {
    console.log(name)
}
getinfo('zhansan')

// 剩余参数
/*
--------------------------------
--------------------------------
--------------------------------
--------------------------------

*/
function suu1(name: number, age: string, ...res: number[]) {
    console.log(arguments)
}
suu1(11, 'zhansan', 123, 123, 123)


//  函数的重载
/*
--------------------------------
--------------------------------
--------------------------------
--------------------------------

*/
function css1(str: string): string;//重载类型一
function css1(age: number): number;//重载类型二
function css1(confg: any): any {//接受参数，运行函数
    console.log(confg)
    if (typeof confg === 'number') {
        console.log('Number')
    } else if (typeof confg === 'string') {
        console.log("String")
    }
    return confg
}
css1(1)

function add (arg1: string, arg2: string): string
function add (arg1: number, arg2: number): number

// 实现
function add <T,U>(arg1: T, arg2: U) {
  // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 arg1 + arg2
  if (typeof arg1 === 'string' && typeof arg2 === 'string') {
    return arg1 + arg2
  } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    return arg1 + arg2
  }
}

add(1, 2) // 3
add('1','2') //'12'


//  类
/*
--------------------------------
--------------------------------
--------------------------------
--------------------------------

*/

class Person {

    public name: String;
    protected age: number;
    private sex: string;
    // 静态属性
    static jintai = 'eqwe'
    constructor(name: string) {
        this.name = name;
        this.age = 12;
        this.sex = 'man';
    }

    run(): void {
        console.log(this.name)
    }
    work(): void {
        console.log(this.name, this.age, this.sex)

    }
    duotai(): void {

    }
    // 静态方法    static    
    static print() {
        console.log('jingtai', this.jintai)
    }

}
const p = new Person('zhangsan')
p.run()
Person.print()

// 继承

class Student extends Person {
    public name: string
    constructor(name: string) {
        super(name)//初始化父类构造函数
        this.name = `${name} zi`
    }
    run(): void { //与父类相同方法、属性，优先使用子类本身的方法、属性
        console.log(this.name, this.age)
        // console.log(this.sex,'111')// private属性 无法访问
    }
    duotai(): void {
        console.log('student的多态')
    }
}
class Child extends Person {
    public name: string
    constructor(name: string) {
        super(name)//初始化父类构造函数
        this.name = `${name} zi`
    }
    run(): void { //与父类相同方法、属性，优先使用子类本身的方法、属性
        console.log(this.name, this.age)
        // console.log(this.sex,'111')// private属性 无法访问
    }
    duotai(): void {
        console.log('Child的多态')
    }
}


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
const pp = new Person("lisi")
const ss = new Student("zhangsan")
console.log(pp.name)
pp.run()
pp.work()
ss.run()

//  console.log(pp.age)//无法访问
//  console.log(pp.sex)//无法访问





// 扩展 ： 
// 类实质上就是一个函数。类自身指向的就是构造函数。
// 所以可以认为ES6中的类其实就是构造函数的另外一种写法！

console.log(typeof Person);//function
console.log(Person === Person.prototype.constructor);//true


// 多态   父类定义一个方法，让子类去实现，每个子类的实现不同

const aa = new Student("zhangsan")
const bb = new Child("zhangsan")
aa.duotai()
bb.duotai()

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

abstract class Aminal {

    name: string;
    age?: string
    constructor(name: string, age?: string) {
        this.name = name
        this.age = age
    }
    // 抽象方法
    abstract eat(): void;

}
// new Aminal() 无法被实例化，只能作为子类的基类
class Dog extends Aminal {
    constructor(name: string, age?: string) {
        super(name, age) //调用父类的构造函数，创建属性
        this.name = 'dog' //当子类重新定义某一属性，那构造函数传入的值则被子类重新定义的值覆盖


    }
    eat(): void {
        console.log('抽象方法实现' + this.name)
    }
}
let dog = new Dog('小黄狗')
dog.eat()// ==> 抽象方法实现dog

//接口 定义类属性方法的标准

// 属性接口 对json的约束


function label(label: { lab: string }, ...oth: number[]): void {
    console.log(label, oth)
}
label({ lab: 'eqwe' }, 123, 4324)

//对方方法约束

// interface 

//例：必须有first 和end 必须为字符串

interface Full {//定义接口
    first: string;//用 ； 结尾不是 ，
    end: string;
    but?: string; //可选参数
    abt?: '312';
}


function paaa(name: Full) {
    console.log(name)
    // console.log(name.age)//报错,虽然可以传入age但是调用会提示错误
}

// paaa({first:'123',end:'qwe',age:123})//age无法传入
const obj = { first: '123', end: 'qwe', age: 123 }
paaa(obj)//age 可以传入

//封装ajax



// interface config{
//     type:string;
//     url:string;
//     data?:string;
//     dataType:string;

// }


// function ajax(config:config){
//     var xhr=new XMLHttpRequest();
//     xhr.open(config.type,config.url,true);
//     xhr.send(config.data);
//     xhr.onreadystatechange=function(){
//         if(xhr.readyState==4 && xhr.status==200){
//             console.log('success');
//             if(config.dataType==='json'){
//                 console.log(JSON.parse(xhr.responseText));
//         }else{
//             console.log(xhr.responseText)
//         }
//         }
//     }

// }

// ajax({
//     type:'get',
//     url:'http://www.baidu.com',
//     data:'id=111',
//     dataType:'json'
// })

//函数类型接口
//对传入参数 返回值进行约束

//加密函数类型接口
interface jiami {
    (key: string, val: string): string
}
var md5: jiami = function (key: string, val: string): string {
    console.log(key + val)
    return key
}
md5('name', 'dadada')

// 可索引接口 ：对数组 对象的接口 



//数组
interface usArr {
    [index: number]: string
}
var aA: usArr = ['aa', 'bb']
// 对象
interface usObj {
    [index: string]: string
}
var uob: usObj = { key: '222' }



//类类型接口 ： 对类的约束 ====常用

interface leilei {//必须拥有 name属性 和 eat 方法
    name: string;
    eat(str: string): void;
}

class Lei implements leilei {
    name: string
    constructor(name: string) {
        this.name = name
    }
    eat(str: string) {
        console.log(str)
    }
}

var leiD = new Lei('gou')
leiD.eat('shi')

// 接口的扩展 ： 接口继承接口

interface Jcheng extends leilei {
    age: number;
    work(): void;
}


class WW implements Jcheng {
    name: string;
    age: number;
    constructor(name: string) {
        this.name = name;
        this.age = 12
    }
    eat(str: string) {
        console.log(str)
    }
    work() {
        console.log(this.age)
    }
}
var leiD2 = new WW('gou')
leiD2.eat('shi')
leiD2.work()

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
class Ws extends Lei implements Jcheng {
    age: number
    constructor(name: string, age: number) {
        super(name)
        this.age = age
    }
    work() {
        console.log(this.name, this.age, '33333333333333333333')
    }
}
var ceshi = new Ws('zhansan', 12)
ceshi.work()

// 泛型 ： 解决 类 接口 方法  的复用性、
//         以及对不特定数据类型的支持



// 泛型函数

// 让一个函数同时返回 number和string
// 让一个函数传入什么类型返回什么类型
function fanxin<T>(val: T): T {
    return val
}

fanxin<number>(123)


// 泛型类


// 例： 传入一系列参数 返回该系列中最小值
class MInclass<T>{
    list: T[] = [];
    constructor() {

    }
    add(num: T) {
        this.list.push(num)
    }
    min(): T {
        let min = this.list[0]
        for (let i = 0; i < this.list.length; i++) {

            if (min > this.list[i]) {
                min = this.list[i]
            }
        }
        console.log(min)
        return min
    }
}
// 传入 number 类型
var m1 = new MInclass<number>();
m1.add(1);
m1.add(2);
m1.add(3);
m1.min()
// 传入 string 类型
var m2 = new MInclass<string>();
m2.add('a');
m2.add('c');
m2.add('b');
m2.min()





// 把类作为参数来约束传入值的类型
class User {
    username: string | undefined;
    password: string | undefined;
    constructor(params: {
        username: string | undefined;
        password: string | undefined;
    }) {
        this.username = params.username;
        this.password = params.password;
    }

}
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
class Mysql<T>{//不用每次传入不同格式数据修改该函数
    add(user: T): boolean {
        console.log(user)
        return true
    }
}
// var userInfo={
//     username: '张三',
//     password:'123123'
// };

var userInfo = new User({
    username: '张三',
    password: '123123'
});



var sql = new Mysql<User>()
sql.add(userInfo)






















//泛型 接口：

// 函数类型接口
// interface Fjk{
//     (val1:string,val2:string):void;
// }

// var setjk:Fjk=function(val1:string,val2:string){
//     console.log(val1+val2)
// }
// 函数 泛型接口
// 写法1
// interface Fjk{
//     <T>(val1:T,val2:T):T;
// }

// var setjk:Fjk=function<T>(val1:T,val2:T):T{
//     console.log(val1,val2)
//     return val2
// }
// setjk<string>('12','32')
// 写法2
interface Fjk<T> {
    (val1: T, val2: T): T;
}
function fjf<T>(val1: T, val2: T): T {
    console.log(val1, val2)
    return val2
}
var setjk: Fjk<string> = fjf

setjk('2222', '32')




// 通过-接口 生成控制数据库类； 通过-泛型 规定传入的值的类型



interface DBI<T> {
    add(info: T): boolean;
    update(info: T): boolean;
    delate(id: number): boolean;
    get(id: number): any[];

}

class MySqlDb<T> implements DBI<T>{
    add(info: T): boolean {
        console.log(info)
        return true
    }
    update(info: T): boolean {
        console.log(info)
        return true
    }
    delate(id: number): boolean {
        console.log(id)
        return true

    }
    get(id: number): any[] {
        console.log(id)
        let list = [{
            id: 1,
            name: 'q23qweq'
        }]
        return list
    }

}

class MgDb<T> implements DBI<T>{
    add(info: T): boolean {
        console.log(info)
        return true
    }
    update(info: T): boolean {
        console.log(info)
        return true
    }
    delate(id: number): boolean {
        console.log(id)
        return true

    }
    get(id: number): any[] {
        console.log(id)
        let list = [{
            id: 1,
            name: 'q23qweq'
        }]
        return list
    }

}


class UserInfo {
    username: string | undefined;
    password: string | undefined;
    id?: number;
    constructor(params: {
        username: string | undefined;
        password: string | undefined;
        id?: number;
    }) {
        this.username = params.username;
        this.password = params.password;
        this.id = params.id
    }
}



var UI = new UserInfo({
    username: 'zhansssss',
    password: '123123124214',
    id: 1
})

var msq = new MySqlDb<User>();
msq.add(UI)
msq.get(1)

var mDB = new MgDb<User>();
mDB.add(UI)
mDB.get(1)

// 模块 modTest modules model 


// 命名空间 避免命名冲突 私有的，外界使用需暴露
namespace AA {
    //和外界命名不相干
    export var ZZZZZZZZ = 'ZZZZZZZZZZZZZZ';
    export function cat() {
        console.log(ZZZZZZZZ)
    }
    export class Dog {
        name: string;
        constructor(name: string) {
            this.name = name
        }
        setName() {
            console.log(this.name)
            console.log(ZZZZZZZZ)
        }
    }
}

// 调用te
var CCCC = AA.ZZZZZZZZ
console.log(CCCC)
AA.cat();
var dogZZ = new AA.Dog('gouA');
dogZZ.setName()

import { BB } from './modules/BB'
// 调用
var CCCCB = BB.ZZZZZZZZ
console.log(CCCCB)
BB.cat();
var dogZZB = new BB.Dog('gouB');
dogZZB.setName()


// 装饰器  就是一个方法，可以注入到 类 方法 属性 参数 上来扩展
// 属性 方法 参数的功能
// 装饰器写法:普通装饰器(无法传参) 、装饰器工厂(可传参)


// 1、类装饰器

// 类装饰器声明在类之前（紧靠着类）。一个类可以有多个同类装饰
// 类装饰器作用与构造函数，可以用监视 修改 替换 类的定义。
function logClass(params: any) {
    console.log(params)
    params.prototype.apiUrl = '动态加载属性'
    params.prototype.run = function () {
        console.log("run方法");
        console.log(params.toString(), '--------', this);


    }
}

// 普通装饰器
@logClass
class Zhuangshi {
    name: string
    constructor(name: string) {
        this.name = name
    }
    getdata() {

    }
}
var zhuangshiqi: any = new Zhuangshi('张三')
console.log(zhuangshiqi.apiUrl)
zhuangshiqi.run()

// 装饰器工厂
// 装饰器工厂： 装饰器本质是未运行的一个函数，
//             装饰器工厂通过一个运行的函数接受参数，
//             传到return出来的真正的装饰器函数中，就可以达到传值的目的。



// 类装饰器
function logClass1(params: any) {
    return function (target: any) {
        console.log(target, 11111)//构造函数
        console.log(params, 22222222)//传入的值
        target.prototype.apiUrl = params    //通过原型链prototype 修改类的原型
        target.prototype.run = function () {
            console.log("run方法");
            console.log(target.toString(), '--------', this);
        }
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
    }
}
// 属性装饰器 只能修改一个值
// 当构造函数里面为该属性重新赋值后该属性装饰器无法修改该属性值
// 重构时会覆盖属性装饰器修改的值
function shuxing(params:any){
    return function(target:any,attr:any){
        console.log("属性装饰器");
        console.log(target);//==target.prototype
        console.log(attr);//name
        target[attr]=params
        console.log("属性装饰器");
    }
}
// 方法装饰器
function fangfazhuangshiqi(params:any){
    return function(target:any,method:any,desc:any){
        console.log(params);
        console.log(target);//方法为静态方法，target为构造函数; 实例方法target就是原型对象 类.prototype
        console.log(method);// 方法名
        console.log(desc);//    方法描述 {} value是方法本身 修改方法的地方
        //修改装饰的方法（重构过的类无法修改）
        var om=desc.value
        desc.value=function(){//替换原方法
            console.log('方法装饰器修改过后的方法')
            om.apply(this)//继承原方法
        }

        // 可以扩展当前类的属性和方法; 通过 类的原型对象
        target.apiTT='xxxx';
        target.runnnnnn=function(){
            console.log("方法装饰器，增加的方法和属性")
            console.log(this.apiTT);
            
        }
        
        
    }
}




@logClass1('zhi')
class Zhuangshi1 {
    @shuxing('属性装饰器1')
    name: string
    @shuxing('属性装饰器2')
    name2?: string|undefined
    age?:number
    static date:string='jingyaio'
    constructor(name: string,age?:number) {
        this.name = name
        this.age = age
    }
    @fangfazhuangshiqi('方法装饰器')
    getdata() {
        console.log(this.name)
        console.log(this.name2,"name20--")
    }
    @fangfazhuangshiqi('方法装饰器2')
    static get(){
        console.log(this.date)
    }
}

var zhuangshiqi1: any = new Zhuangshi1('xiao张')
console.log(zhuangshiqi1.apiUrl)
zhuangshiqi1.run()
zhuangshiqi1.getdata()
// zhuangshiqi1.runnnnnn()
Zhuangshi1.get()




// 方法参数装饰器
function fangfacanshuzhuangshi(params:any){
    return function(target:any,method:any,index:any){
        console.log(params);
        console.log(target);//方法为静态方法，target为构造函数; 实例方法target就是原型对象 类.prototype
        console.log(method);// 方法名
        console.log(index);//   参数的索引
    }
}
class Fanfashuxin{
    constructor(){

    }
    get(@fangfacanshuzhuangshi('方法参数装饰器') uu:string){
console.log(uu)
    }
}
new Fanfashuxin().get("aa")

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

