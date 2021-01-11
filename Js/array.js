/*
 * @Author: your name
 * @Date: 2020-12-11 11:55:01
 * @LastEditTime: 2021-01-11 17:30:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edita
 * @FilePath: \learn\Js\array.js
 */



// shift()	删除并返回数组的第一个元素
// pop()	删除并返回数组的最后一个元素

// unshift()	向数组的开头添加一个或更多元素，并返回新的长度。
// push()	向数组的末尾添加一个或更多元素，并返回新的长度。

// concat()	连接两个或更多的数组，并返回结果。
// join()	把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。

// reverse()	颠倒数组中元素的顺序。该方法会改变原来的数组，而不会创建新的数组

// slice(start,end)	从某个已有的数组返回选定的元素

// sort(sortby)	对数组的元素进行排序可选。规定排序顺序。必须是函数。

// splice(位置,要删除的项目数量, ?向数组添加的新项目,.....,新项目)
	// 删除元素，并向数组添加新元素。

// toSource()	返回该对象的源代码。

// toString()	把数组转换为字符串，并返回结果。

// toLocaleString()	把数组转换为本地数组，并返回结果。

// valueOf()	返回数组对象的原始值


array.sort((a,b)=>{
	return a-b
})
// 若 a 小于 b，即 a - b 小于零，则返回一个小于零的值，数组将按照升序排列。
// 若 a 等于 b，则返回 0。
// 若 a 大于 b, 即 a - b 大于零，则返回一个大于零的值，数组将按照降序排列。
// array.sort() 按照降序排列