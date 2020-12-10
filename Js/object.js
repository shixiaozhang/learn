
// 所有的 JavaScript 对象都会从一个 prototype（原型对象）中继承属性和方法：

function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
}
Person.nationality = "English";
console.log(Person.nationality)

var myFather = new Person("John", "Doe", 50, "blue");
console.log(myFather.nationality)//undefined

Person.prototype.nationality = "English2222";
// myFather.prototype.na= "tionality";
//   console.log(Person.prototype.nationality)
console.log(myFather.nationality)//English2222
console.log(myFather.__proto__ == Person.prototype)//true
console.log({});



// instanceof 运算符用于检测构造函数的 prototype 
// 属性是否出现在某个实例对象的原型链

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
// expected output: true

console.log(auto instanceof Object);
// expected output: true



// sendRequest是一个同步方法，每次调用随机返回true或者false
/*
1.执行了poll函数之后，每隔一段时间都必须执行一次sendRequest函数。
2.sendRequest必须按照这样的频率执行，第一次执行后隔1s再次调用，第二次执行
之后隔1.5s再次执行，第三次执行之后隔2.25s再执行，每次执行之后需要间隔前一次间
隔的1.5倍。
3.如果sendRequest函数返回了true，则停止继续调用这个方法。
4.函数无需返回，你可以自由设计poll函数接受的参数，但必须满足上面提到的三个
条件
*/ 
function sendReq() {
    var random = Math.random(0, 1);
    var status = !!(random >= 0.5);
    return status;
  
}
async function poll(time) {
    let  status= await sendReq()
    console.log(time);
    let timer;
    if(!status){
        timer= setTimeout(()=>{
        poll(time*1.5)
        },time)
              
    }else{
        clearTimeout(timer)
    }
}
poll(1000)


Object.defineProperty() //方法也可用于添加 Getter 和 Setter：
// 定义对象defineproperty
var obj = {counter : 0};

//get(params)
Object.defineProperty(obj, "reset", {
  get : function () {this.counter = 0;}
});
Object.defineProperty(obj, "increment", {
  get : function () {this.counter++;}
});
Object.defineProperty(obj, "decrement", {
  get : function () {this.counter--;}
});
//set(params)
Object.defineProperty(obj, "add", {
  set : function (value) {this.counter += value;}
});
Object.defineProperty(obj, "subtract", {
  set : function (value) {this.counter -= value;}
});


/*
Object api
   
        writable : true      // 属性值可修改
        enumerable : true    // 属性可枚举
        configurable : true  // 属性可重新配置
        writable : false     // 属性值不可修改
        enumerable : false   // 属性不可枚举
        configurable : false // 属性不可重新配置

    例：    Object.defineProperty(person, "language", {enumerable:false});

*/  


var expObj = {
    firstName: "Bill",
    lastName : "Gates",
    language : "EN" 
  };
// 添加或更改对象属性
Object.defineProperty(object, property, descriptor)

Object.defineProperty(expObj,'language',{value:'zhansan'})
// 添加或更改多个对象属性
Object.defineProperties(object, descriptors)

Object.defineProperties(expObj,{
    language:{
        value:'zhansan',
        writable : true
    }
})
// 访问属性
Object.getOwnPropertyDescriptor(object, property)

// 以数组返回所有属性
Object.getOwnPropertyNames(object)

// 以数组返回所有可枚举的属性
Object.keys(object)

// 访问原型
Object.getPrototypeOf(object)

// 阻止向对象添加属性
Object.preventExtensions(object)

// 如果可将属性添加到对象，则返回 true
Object.isExtensible(object)

// 防止更改对象属性（而不是值）
Object.seal(object)

// 如果对象被密封，则返回 true
Object.isSealed(object)

// 防止对对象进行任何更改
Object.freeze(object)

// 如果对象被冻结，则返回 true
Object.isFrozen(object)

// 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null
Object.setPrototypeOf(obj,prototype)
 //obj 要设置其原型的对象  prototype 该对象的新原型(一个对象 或 null).



// Object.assign()第一个参数是目标对象，后面的都是源对象
// Object.assign (target, source1,source2, source3);
/**
 如果源对像与目标对象有相同的属性名，或源对象中有相同的属性名，后面的会覆盖前边的值 。
如果参数传入的不是Object，会转成Object
null和undefined 不能作为参数传入，因为null和undefined 不能转成Object
如果发生的值是一个对象，Object.assign的处理方法是直接替换，而不是添加。 如下面的 a 和 b
可以为类添加方法
 */


const obj1  = {name:'小明', age:'18',education:'undergraduate'}
const obj2 = {height:'180cm',hobby:'painting'}
let  obj = Object.assign({},obj1, obj2)
console.log('合并后的类：');
console.log(JSON.stringify(obj));
//{"name":"小明","age":"18","education":"undergraduate","height":"180cm","hobby":"painting"}
Object.assign( obj, {height:'170cm'});
console.log('修改过height后的类：');
console.log(JSON.stringify(obj));
//{"name":"小明","age":"18","education":"undergraduate","height":"170cm","hobby":"painting"}
Object.assign(obj, {arr:{index:1, name:'类'}}, {name:'加了一个类进去'})
console.log(JSON.stringify(obj));
//{"name":"加了一个类进去","age":"18","education":"undergraduate","height":"170cm","hobby":"painting","arr":{"index":1,"name":"类"}}
console.log("加一个类进去后："+obj.arr.index);//1


 // f. Object.assign() 为类添加方法
 Object.assign(UserInfo.prototype, {
  getUserName (){
    return this.name;
  },
  getUserGender (){
    return this.gender ;
  }
})
let user  = new UserInfo("笑笑", '女');
console.log("userinfo中的信息为： "+ user.getUserName() +", "+user.getUserGender()); // 输出的结果为：笑笑，女
