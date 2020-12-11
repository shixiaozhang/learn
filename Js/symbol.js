/**
 * symbol 是一种基本数据类型 :Symbol([description])
 *          不支持 new Symbol（）
 *           description 可选
 *           可选的，字符串类型。对symbol的描述，可用于调试但不是访问symbol本身。
 * 
 *          每个从Symbol()返回的symbol值都是唯一的。
 *          一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的
 */

const symbol1 = Symbol();
const symbol2 = Symbol(42);
const symbol3 = Symbol('foo');

console.log(typeof symbol1);
// expected output: "symbol"

console.log(symbol2 === 42);
// expected output: false

console.log(symbol3.toString());
// expected output: "Symbol(foo)"

console.log(Symbol('foo') === Symbol('foo'));
// expected output: false

// var sym = new Symbol(); // TypeError

/**
 * Symbol.for(key) 方法会根据给定的键 key，
 * 来从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，
 * 否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中。
 * 
 * Symbol.keyFor(sym) 方法用来获取全局symbol 注册表中与某个 symbol 关联的键。
 */


 // 创建一个全局 Symbol 
var globalSym = Symbol.for("foo"); 
Symbol.keyFor(globalSym); // "foo"


var localSym = Symbol(); 
Symbol.keyFor(localSym); // undefined，


// 以下Symbol不是保存在全局Symbol注册表中
Symbol.keyFor(Symbol.iterator) // undefined


/**
 * 和 Symbol() 不同的是:
 * 用 Symbol.for() 方法创建的的 symbol 会被放入一个全局 symbol 注册表中。
 * Symbol.for() 并不是每次都会创建一个新的 symbol，
 * 它会首先检查给定的 key 是否已经在注册表中了。
 * 假如是，则会直接返回上次存储的那个。否则，它会再新建一个。
 */
// Symbol.isConcatSpreadable


// 默认情况下，Array.prototype.concat()展开其元素连接到结果中：

var alpha = ['a', 'b', 'c'], 
    numeric = [1, 2, 3]; 

var alphaNumeric = alpha.concat(numeric); 

console.log(alphaNumeric); // Result: ['a', 'b', 'c', 1, 2, 3]

// 设置Symbol.isConcatSpreadable为false：

var alpha = ['a', 'b', 'c'], 
    numeric = [1, 2, 3]; 

numeric[Symbol.isConcatSpreadable] = false;
var alphaNumeric = alpha.concat(numeric); 

console.log(alphaNumeric); // Result: ['a', 'b', 'c', [1, 2, 3] ]


// Array-like 对象
// 对于类数组 (array-like)对象，默认不展开。期望展开其元素用于连接，需要设置 Symbol.isConcatSpreadable 为true：

var x = [1, 2, 3];

var fakeArray = { 
  [Symbol.isConcatSpreadable]: true, 
  length: 2, 
  0: 'hello', 
  1: 'world' 
}

x.concat(fakeArray); // [1, 2, 3, "hello", "world"]