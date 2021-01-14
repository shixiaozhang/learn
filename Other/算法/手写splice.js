/*
 * @Author: your name
 * @Date: 2021-01-14 10:44:19
 * @LastEditTime: 2021-01-14 17:29:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Other\算法\手写splice.js
 */
Array.prototype._splice = function (start, delCont, ...item) {
    let arr = this;//原数组
    let Front = [];//删除剩余前部分
    let after = [];//删除剩余后部分
    let delList = [];//删除部分
    let saveCont = delCont;//保存要删除 的个数
    let delInd = 0;//保存删除数组的下标
    let afterInd = 0;//剩余后半部分的下标
    let allLength;//新数组的总长度

    if (start < 0) {//小于零，修改为正数，统一从前开始
        start = arr.length + start
    }
    start = Math.abs(start);//取绝对值防止下标大于数组总长

    if (start > arr.length - 1 || !delCont || delCont < 0) return [];//排除意外情况
    
    for (let index = 0; index < arr.length; index++) { //删除数组，同时保存删除的部分
        if (Number(start) <= index && delCont > 0) {
            delCont--;
            delList[delInd] = arr[index];
            delInd++;
            delete arr[index];
        }

        if (index < Number(start)) {
            Front[index] = arr[index]
           
        }
        if (Number(saveCont + start) <= index) {
            after[afterInd] = arr[index]
            afterInd++
        }
    }
    allLength = Front.length + after.length + item.length;//获取总长

    arr.length = allLength//重设数组长度

    for (let index = 0; index < allLength; index++) {//为数组填充内容
        if (index < Front.length) {//3 0 2
            arr[index] = Front[index]
        }
        if (Front.length - 1 < index && index < Front.length + item.length) {//4 3
            arr[index] = item[index - Front.length]
        }
        if (index > Front.length + item.length - 1) {
            arr[index] = after[index - (Front.length + item.length)]

        }

    }
    return delList //返回删除部分
}
// 测试======
let arr = [0, 1, 2, 3]

console.log(arr);
console.log(arr._splice(-10, 3, '2', '2'));
console.log(arr);
// console.log(arr.splice(-1, 1, '2', '2'));
console.log(arr);

var x=1;
function func(x,y=function(){x=2}){
   var x=3
   var y=function(){x=4}
    y();
    console.log(x,'1');
}
func(5)
console.log(x,'2');