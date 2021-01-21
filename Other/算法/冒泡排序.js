/*
 * @Author: your name
 * @Date: 2021-01-21 11:04:23
 * @LastEditTime: 2021-01-21 11:31:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Other\算法\冒泡排序.js
 */
let arr = [5, 11, 23, 54, 0, 22, 12, 43, 9];

// 比较相邻的元素。如果第一个比第二个大，就交换他们两个
function babbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) { 
        // i 循环只是为了提供 循环 次数； 
        // 为 arr 中的每一个 值进行一次 比对； 
        // 当 只剩最后一个值时 ；i 就不用循环了，因为这个值必定是最小的；
        for (let j = 0; j < len - i - 1; j++) {// i 没循环一次，j 就完成一位的排序； 所以每次 i 循环完 j 需要遍历的长度就 减  一 。
            if (arr[j] > arr[j + 1]) {
                //这样会把最大的不停的与比他小的换位置，最后把最大的换到最后
                // 在每次 i 循环结束
                //es6解构赋值中的数组解构用法 互换两个变量的值
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr;

}

console.log(babbleSort(arr));