// let p = new Proxy(target, handler);
// target ：需要使用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
// handler: 一个对象，其属性是当执行一个操作时定义代理的行为的函数(可以理解为某种触发器)
/*
代理陷阱（handler{}中）           覆写的特性（重写api）                                        默认特性
    get	                           读写一个属性值               	                                                                         Reflect.get()
    set	                           写入一个属性	                                                                                     Reflect.set()
    has	                           in操作	                                                                                            Reflect.has()
    deleteProperty	               delete操作符	                                                                                    Reflect.deleteProperty()
    getAPrototypeof	               Object.getAPrototypeof ()	  获取指定对象的原型                                               Reflect.getAPrototypeof ()
    setAPrototypeof	               Object.setAPrototypeof ()	  修改指定对象的原型                                                  Reflect.setAPrototypeof ()
    isExtensible	               Object.isExtensible()	           判断一个对象是否可扩展                                                             Reflect.isExtensible()
    preventExtensions	           Object.preventExtensions()	       让一个对象变的不可扩展                                                                  Reflect.preventExtensions()
    getOwnPropertyDescriptor	   Object.getOwnPropertyDescriptor()	返回指定对象上一个自有属性对应的属性描述符                           Reflect.getOwnPropertyDescriptor()
    defineaProperty	               Object.defineaProperty()	       在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象      Reflect.defineaProperty()
    ownKeys	                       Object.keys() 、Object.getOwnPropertyNames()   返回一个由指定对象的所有自身属性的属性名
                                   Object.getOwnPropertySysmbols()	 返回一个给定对象自身的所有 Symbol 属性的数组。                                                               Reflect.ownKeys()
    apply	                       调用一个函数，就是当代理对象被当做函数执行时	   （target，this，value）                                                                                      Reflect.apply()
    construct	                   用new调用一个函数的代理对象	                                                                                    Reflect.construct()
  
 */
// trapTarget 被读取属性源对象（代理的目标）
// key 要读取的属性键（字符串或Symbol类型）
// receiver 操作发生的对象（通常是代理）

// const { bind } = require("core-js/fn/function");

// 添加一个属性，】】
let target = {};
let proxy = new Proxy(target, {
    get(trapTarget, key, receiver) {
        //忽略不希望受到影响的已有属性
        console.log(arguments)
        if (!(key in receiver)) {
            throw new TypeError("sorry 亲！ 你找的 " + key + " 属性不存在。！")
        }
        // 添加属性
        return Reflect.get(...arguments);
    },
    set(trapTarget, key, value, receiver) {
        //忽略不希望受到影响的已有属性
        console.log(arguments)

        // 添加属性
        return Reflect.set(...arguments);
    }
});

proxy.name = "proxy";
console.log(proxy.name); // proxy

// 读取一个不存在的属性  直接会抛出异常
// console.log(proxy.nme);



// for (var i = 0; i < 10; i++) {
//     console.log(i);
//     setTimeout(() => { console.log(i); }, 100 * i);
// }



// var trap = function (height) {
//     let area = 0
//     let max = Math.max(...height)



//     return area
// }

const numLivesForCat = 9;
const kitty = {
    name: "Aurora",
    numLives: numLivesForCat,
}

// // Error
// kitty = {
//     name: "Danielle",
//     numLives: numLivesForCat
// };

// all "okay"
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;
console.log(kitty);
// 使用特殊的方法去避免，实际上const变量的内部状态是可修改的


// 对象解构重命名
let o = {
    a: "foo",
    b: 12,
    c: "bar",
    d:undefined
};
let {a:newName,b:newName2} =o
console.log(newName);//foo
// 解构属性缺失-设置默值
let {c,d=1001}=o

console.log(d);//1001
let cccc={}
cccc.a=cccc
console.log(cccc);



