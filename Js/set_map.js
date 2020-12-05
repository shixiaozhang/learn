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
//  由于set只有键值，没有键名，所以keys() values()行为完全一致
console.log(set.keys());//[Set Iterator] { 1, [ 1, 2 ] }
console.log(Array.from(set.keys()));//[ 1, [ 1, 2 ] ]
console.log(set.values());//{ 1, [ 1, 2 ] }
console.log(set.entries());//{ [ 1, 1 ], [ [ 1, 2 ], [ 1, 2 ] ] }

// 应用场景
// 去重
let  arr=[1,1,2,2]
let unique=[...new Set(arr)]
// 合并
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
let union = [...new Set([...a, ...b])];
// 交集
let intersect = [...new Set([...a].filter(x => b.has(x)))];// [2,3]
// 差集
let difference = Array.from(new Set([...a].filter(x => !b.has(x))));// [1]




//  WeakSet
/**
 * WeakSet 的出现主要解决弱引用对象存储的场景, 其结构与Set类似
 * 与Set相比，WeakSet 只能是对象的集合，而不能是任何类型的任意值
 * WeakSet集合中对象的引用为弱引用。 
 * 如果没有其他的对WeakSet中对象的引用，那么这些对象会被当成垃圾回收掉。
 *  这也意味着WeakSet中没有存储当前对象的列表。
 *  正因为这样，WeakSet 是不可枚举的
 * 
 *  WeakSet 的属性跟操作方法与 Set 一致，不同的是 WeakSet 没有遍历方法，
 * 
 */

/*
    弱引用
    弱引用是指不能确保其引用的对象不会被垃圾回收器回收的引用，
    换句话说就是可能在任意时间被回收

*/ 

// Map
/**
 * Map:用法：
 *      new Map([iterable]) ：
 *          iterable可以是数组或者其他iterable对象，元素要以键值对存在；
 *          [['1','one'],['2','two']]
 * 
 * 属性及方法:
 *          基本跟 Set 类似，同样具有如下方法 属性
 * 操作方法:
 *          set(key, value): 向 Map 中加入或更新键值对
 *          get(key): 读取 key 对用的值，如果没有，返回 undefined
 *          has(key): 某个键是否在 Map 对象中，在返回 true 否则返回 false
 *          delete(key): 删除某个键，返回 true, 如果删除失败返回 false
 *          clear(): 删除所有元素
 * 
 * 遍历方法:
            keys()：返回键名的遍历器
            values()：返回键值的遍历器
            entries()：返回所有成员的遍历器
            forEach()：遍历 Map 的所有成员
 * 
 * 
 * 
 */
// Map创建
let map=new Map()
map.set('name','小张')
console.log(map.get('name'));

console.log(map.has('name'));//true

map.delete('name')
console.log(map.delete('name'));//false

map.has('name')
console.log(map.has('name'));//false
map.clear()
console.log(map);//Map {}

// 应用场景
/**
 * Map 会保留所有元素的顺序, 是在基于可迭代的基础上构建的，
 * 如果考虑到元素迭代或顺序保留或键值类型丰富的情况下都可以使用，
 * 下面摘抄自 vue3 源码中依赖收集的核心实现
 * 
        let depsMap = targetMap.get(target)
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()))
        }
        let dep = depsMap.get(key)
        if (!dep) {
            depsMap.set(key, (dep = new Set()))
        }
        if (!dep.has(activeEffect)) {
            dep.add(activeEffect)
            activeEffect.deps.push(dep)
            ...
        }
 * 
 * 
 */

 /**
  * weakMap
  * WeakMap 的属性跟操作方法与 Map 一致，同 WeakSet 一样，
  * 因为是弱引用，所以 WeakSet 也没有遍历方法
  * Map 的键可以是任意类型，WeakMap 的键只能是对象类型
    WeakMap 键名所指向的对象，不计入垃圾回收机制
  */
//  类型的转换

// Map 转为 Array

const map2 = new Map([[1, 1], [2, 2], [3, 3]])

console.log(map2);//{ 1 => 1, 2 => 2, 3 => 3 }.
// 解构
console.log(...map2);//[ 1, 1 ] [ 2, 2 ] [ 3, 3 ]
// Array.from()
console.log(Array.from(map2))//[ [ 1, 1 ], [ 2, 2 ], [ 3, 3 ] ]


// Array 转为 Map
const map3 = new Map([[1, 1], [2, 2], [3, 3]])
console.log(map3)//Map { 1 => 1, 2 => 2, 3 => 3 }


// Map 转为 Object
function mapToObj(map){
let obj=Object.create(null)
for(let [key,value] of map){
    obj[key]=value
}
return obj
}
const map4=new Map().set('name','小张').set('age','18')
console.log(mapToObj(map4));//[Object: null prototype] { name: '小张', age: '18' }

/**
    Set、Map、WeakSet、WeakMap、都是一种集合的数据结构
    Set、WeakSet 是[值,值]的集合，且具有唯一性
    Map 和 WeakMap 是一种[键,值]的集合，Map 的键可以是任意类型，WeakMap 的键只能是对象类型
    Set 和 Map 有遍历方法，WeakSet 和 WeakMap 属于弱引用不可遍历
 * 
 * 
 * 
 * 
 */