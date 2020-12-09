/**
 * 接雨水：
    输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
    输出：6
    解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
    输入：height = [4,2,0,3,2,5]
    输出：9
 * @param {数组} arr 
 */

function trap(arr) {
    let area = 0
    let max = Math.max(...arr)
    for (let k = 0; k < max; k++) {
        arr = del(arr)
        for (let i in arr) {
            arr[i] <= 0 && area++
        }
        arr = arr.map(item => {
            return item - 1
        })
    }
    return area
}
function del(arr) {
    let list = [...arr]
    let num = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= 0) {
            delete list[i]
            num.push(i)
        } else {
            break
        }
    }
    for (let i = arr.length - 1; 0 <= i; i--) {
        if (arr[i] <= 0) {
            delete list[i]
            num.push(i)
        } else {
            break
        }
    }
    for (let i = 0; i < list.length; i++) {
        if (typeof list[i] === 'undefined') {
            list.splice(i, 1)
            i = i - 1;
        }
    }
    return list
}
console.log(trap([4,2,0,3,2,5]));
