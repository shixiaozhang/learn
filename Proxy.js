// let p = new Proxy(target, handler);
// target ：需要使用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
// handler: 一个对象，其属性是当执行一个操作时定义代理的行为的函数(可以理解为某种触发器)
/*
代理陷阱（handler{}中）           覆写的特性（重写api）                                        默认特性
    get	                           读写一个属性值               	                 Reflect.get()
    set	                           写入一个属性	                                     Reflect.set()
    has	                           in操作	                                        Reflect.has()
    deleteProperty	               delete操作符	                                    Reflect.deleteProperty()
    getAPrototypeof	               Object.getAPrototypeof ()	                    Reflect.getAPrototypeof ()
    setAPrototypeof	               Object.setAPrototypeof ()	                    Reflect.setAPrototypeof ()
    isExtensible	               Object.isExtensible()	                        Reflect.isExtensible()
    preventExtensions	           Object.preventExtensions()	                    Reflect.preventExtensions()
    getOwnPropertyDescriptor	   Object.getOwnPropertyDescriptor()	            Reflect.getOwnPropertyDescriptor()
    defineaProperty	               Object.defineaProperty()	                        Reflect.defineaProperty()
    ownKeys	                       Object.keys() 、Object.getOwnPropertyNames()
                                   Object.getOwnPropertySysmbols()	                Reflect.ownKeys()
    apply	                       调用一个函数	                                     Reflect.apply()
    construct	                   用new调用一个函数	                              Reflect.construct()
  
 */ 
    // trapTarget 被读取属性源对象（代理的目标）
    // key 要读取的属性键（字符串或Symbol类型）
    // receiver 操作发生的对象（通常是代理）

const { bind } = require("core-js/fn/function");

	// 添加一个属性，
let target = {};
	let proxy = new Proxy(target,{
		get(trapTarget,key,receiver){
            //忽略不希望受到影响的已有属性
            console.log(arguments)
			if(!(key in receiver)){
				throw new TypeError("sorry 亲！ 你找的 "+key+" 属性不存在。！")
			}
			// 添加属性
			return Reflect.get(...arguments);
        },
        set(trapTarget,key,value,receiver){
            //忽略不希望受到影响的已有属性
            console.log(arguments)
			
			// 添加属性
			return Reflect.set(...arguments);
        }
    });

	proxy.name= "proxy";
	console.log(proxy.name); // proxy

	// 读取一个不存在的属性  直接会抛出异常
    // console.log(proxy.nme);
 
  