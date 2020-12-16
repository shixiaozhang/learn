
//  一般写法（es5 与es6）

 
 //一.ES5写法：
 function Animate(name){
     this.name = name;
 }
 Animate.prototype.getname = function(){
     console.log(this.name)
 }
 var  p =new Animate("lity");
 p.getname();
 
 //二.ES6,面向对象的写法,calss,
 class Person{
     //constructor()：构造方法是默认方法，new的时候回自动调用，如果没有显式定义，会自动添加
     //1.适合做初始化数据
     //2.constructor可以指定返回的对象
     constructor(name,age){
    　　 this.name = name;
    　　 this.age = age;
 　　}
     getval(){
         console.log(`你是${this.name},${this.age}岁`);
     }
 }            
 var c1 = new Person("lity",20);  
 c1.getval()









// :super关键字：在子类中不同情况用法不同,既可以当作函数使用，也可以当作对象使用。
//     (1)：super作为函数，只能在constructor中使用:代表父类，返回子类的this
//    (2)：super作为对象，在普通函数中，cuper指向父类的原型对象，可以访问原型对象的属性和方法,注意，父类的实例的属性和方法是访问不了的
//    (3)：super作为对象，在静态方法中，cuper指向的是父类，不是父类的原型对象
// 示例分析如下：
// 复制代码
//父类
class Aniamte{
    constructor(){
        if(new.target == Aniamte){
            throw new Error("本类不能实例化，只能有子类继承");
        }
    }
    //静态方法
    static getval(mgs){
        console.log("父类的static",mgs)
    }
    //普通方法            
    setname(){
        console.log("该方法有子类重写")
    }            
}





//子类
class Dog extends Aniamte{
    constructor(){
        super();//调用此方法,this才用可以用,代表父类的构造函数，返回的却是子类
        //super() ==父类.prototype.constructor.call(子类/this)
        console.log(this)//Dog {}
        this.age = 20;
        }
    //静态方法,super在静态方法中作为对象使用，指向父类；
    static getval(mgs){
        super.getval(mgs)//父类的static niceday
        console.log("子类的static",mgs)//子类的static niceday
    }
    setname(name){
       //普通方法，super作为对象使用，指向父类的原型对象，父类.prototype;
       super.setname();//该方法有子类重写
       this.name = name;
       return this.name
    }
};
Dog.getval("niceday");//静态方法，直接调用
//var parAni = new Aniamte();//报错

var dogs = new Dog();//new 一个示例对象
dogs.setname("DOYS");////DOYS
            
  





// 继承
//es5 的继承

//父类
function Person(name,sex){
    this.name = name;//属性
    this.sex = sex;//属性             
}
//定义一个原型方法
Person.prototype.show = function(){
    console.log("我的姓名是"+this.name+"==="+"我的性别是"+this.sex)
}

//子类
function Worker(name,sex,job){            
    //构成函数伪装：使用call()方法绑定this，伪装继承父级的属性
    Person.call(this,name,sex);
    this.job = job;
}
//继承父类的原型方法：（介绍三种方法）
//写法一：通过遍历父级的原型一个个赋给子级的原型(es5 的原型是可枚举的，es6的不可以枚举)
for(var i in Person.prototype){
    Worker.prototype[i] = Person.prototype[i];
}

//写法：重新new一个父级对象赋给子级的原型
Worker.prototype = new Person();
Worker.prototype.constructor = Worker;

//写法三：创建一个原型对象赋给子级的原型；(es5 推荐)
Worker.prototype = Object.create(Person.prototype);
Worker.prototype.constructor = Worker;

var workers = new Worker("小明","男","job")



//es6 的继承

class Person{
    constructor(name,sex){
        this.name = name;//属性
   　　  this.sex = sex;//属性
     }
}

class Worker extends Person{
     constructor(name,sex,job){
          super();
          this.job =job;
     }
}

var workers = new Worker("小明","男","job")
    





// class 的get() 和set() 方法 

// 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

class MyClass {
  constructor() {
    // ...
  }
  get prop() {// 使用 get 拦截了该方法的返回值
    return 'getter';
  }
  set prop(value) {//当对该方法赋值时能获取到该赋值
    console.log('setter: '+value);
  }
}

let obj = new MyClass();

obj.prop = 123;
// setter: 123

inst.prop
// 'getter'



// ES6规定Class类没有静态属性,只有静态方法：static

//      所谓静态，不需要实例化对象，直接调用
class Foo {
      static classMethod() {
            return 'lity';
       }
 }
 console.log(Foo.classMethod()) // 'hello'




// new.target属性

// new是在构造函数生成实例的命令，ES6为new提供了一个属性.target,
//  返回通过new 命令实例对象的class(构造函数)，一般用于类的内部

//ES5：原始写法对象
function objtarge(name){
    if(new.target==undefined){
        throw new Error("必须实例化对象");
    }else{
        this.name = name
    }
}
var targets = new objtarge("litys");
console.log(targets.name);//litys

//es6写法:class内部使用new.target，返回当前的calss
class caltartget{
    constructor(name){
        console.log(new.target==caltartget);//true
        if(new.target!==caltartget){
            throw new Error("实例化对象不是caltrget");
        }else{
            this.name = name;
        }
    }
}
var caltart = new caltartget("lity");
console.log(caltart.name);//lity