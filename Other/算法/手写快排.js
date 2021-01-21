/*
 * @Author: your name
 * @Date: 2021-01-21 10:48:12
 * @LastEditTime: 2021-01-21 12:20:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Other\算法\手写快排.js
 */

// 通过一趟排序将要排序的数据分割成独立的两部分，
// 其中一部分的所有数据都比另外一部分的所有数据都要小，
// 然后再按此方法对这两部分数据分别进行快速排序，
// 整个排序过程可以递归进行，以此达到整个数据变成有序序列。

// 取整 Math
Math.floor() //向下取整 舍去小数
Math.ceil() //向上取整  有效数加一
Math.round() //四舍五入
// 转数字
parseInt()//转为整数，null 和 undefined 不能转化
parseFloat() //返回浮点数，就是带小数的数字
Number() //都可使用

let arr = [5, 11, 23, 54, 0, 22, 12, 43, 9];

function quickSort(arr) {
    // 当arr 只有一个值或者为空时 直接返回本身
    if (arr.length <= 1) return arr
    // 去一个中间值把数组分成三部分；把大于 和 小于中间值的分开;
    //在通过递归,把数组继续分割 直到数组 长度 <= 1 时;返回本身;
    // 最后整合在一起;完成排序
    let pivotNumber = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotNumber, 1)[0]
    let left = []
    let right = []
    for (let i = 0; i < arr.length; i++) {
        if (pivot <= arr[i]) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    //递归处理每个left 和 right 直到 left 和 righ 中只有一个值 ；
    // 最后把 他们整合到一起；
    return quickSort(left).concat(pivot,quickSort(right))
    // es6 解构
    // return [...quickSort(left),pivot,...quickSort(right)]


}

console.log(quickSort(arr));