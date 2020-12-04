// Set、Map、WeakSet、WeakMap
// Set是一种叫做集合的数据结构，Map是一种叫做字典的数据结构


/**
 * 定义: Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用，
 *          Set对象是值的集合，你可以按照插入的顺序迭代它的元素。
 *          Set中的元素只会出现一次，即 Set 中的元素是唯一的
 *          Set本身是一个构造函数，用来生成 Set 数据结构
 * 用法：    new Set([])
 * 属性：    size ：返回集合中所包含的元素数量
 * 操作方法： 
 *          add(value):向集合中添加一个新的值
 *          delete(value):从集合中删除一个值
 *          has(value):存在返回true，不存在返回false
 *          clear():清空集合
 * 
 * 遍历方法:
 *          keys():返回所有键名
 *          values():返回所有键值
 *          entries():返回键值对
 *          forEach():使用回调函数遍历每个成员
 * 
 */
let set=new Set([1,2,1,2])
set.add([1,2])//[1,2]作为一个参数
console.log(set);//Set { 1, 2, [ 1, 2 ] }
console.log(set.size);
// set.add({'name':'小张'})
set.has(2)//true

set.delete(2)

// set.clear()

console.log(set.keys());//[Set Iterator] { 1, [ 1, 2 ] }
console.log(Array.from(set.keys()));//[ 1, [ 1, 2 ] ]
console.log(set.values());
console.log(set.entries());