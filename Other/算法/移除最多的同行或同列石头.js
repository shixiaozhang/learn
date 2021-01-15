/*
 * @Author: your name
 * @Date: 2021-01-15 11:11:36
 * @LastEditTime: 2021-01-15 15:12:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Other\算法\移除最多的同行或同列石头.js
 */
// 没做出来。不会并查集。妈蛋！
var removeStones = function (stones) {


    
    let num = 0;
    let start = 0;
    let arr = stones
    arr.sort()
    let A = sum(arr, num)
    arr.reverse()
    console.log(arr);
    let B = sum(arr, num)
    console.log(A,B);
    if (A > B) {
        return A
    }
    return B
    //     for (let index = 0; index < arr.length; index++) {
    //         if(arr[index][0]===arr[index][1] ){
    //             start=index;
    //             console.log(index);
    //             console.log(start);
    //             break
    //         }
    //     }
    //     console.log(start);
    //   let startVal=arr.splice(start,1);

    //   console.log(arr);
    //   console.log(startVal);
    //   arr.unshift(startVal[0])
    //   console.log(arr);



};
function sum(arr, num) {
    let x = [];
    let y = [];
    for (let index = 0; index < arr.length; index++) {
        x.push(arr[index][0])
        y.push(arr[index][1])
    }



    for (let index = 0; index < arr.length - 1; index++) {

        let resultX = x.pop();
        let resultY = y.pop();

        if (x.indexOf(resultX) > -1 || y.indexOf(resultY) > -1) {
            num++;
            console.log(resultX, 'x');
            console.log(resultY, 'y');
        }

    }
    return num
}

// let stones = [[0, 0], [0, 1], [1, 0], [1, 2], [2, 1], [2, 2]];

// let  stones = [[0,0],[0,2],[1,1],[2,0],[2,2]];
// let stones=[[0,1],[1,2],[1,3],[3,3],[2,3],[0,2]]
// let  stones =[[0,1],[0,2],[1,2],[1,3],[2,3],[3,3]]
// let  stones =[[0,1],[1,0],[1,1]];
// let stones = [[0, 1], [0, 2], [4, 3], [2, 4], [0, 3], [1, 1]]
let stones =[[3,3],[4,4],[1,4],[1,5],[2,3],[4,3],[2,4]]
console.log(removeStones(stones))

// console.log(delete stones[2]);
// console.log(stones);