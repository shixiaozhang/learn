/*
 * @Author: your name
 * @Date: 2021-01-15 17:10:33
 * @LastEditTime: 2021-01-15 17:34:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Other\算法\移除元素.js
 */
// 0-9版本：
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement1 = function(nums, val) {
    // /([0-9])\1*/g
    let str='';
    let len=0;
        for (let index = 0; index < nums.length; index++) {
            str+=nums[index]
        }
        let reg=new RegExp(val,'g')
        str=str.replace(reg,'')
        len=str.length;
            nums.length=len
        for (let index = 0; index < nums.length; index++) {
                nums[index]=str[index]
            
        }
        return str.length

};
console.log(removeElement1([3,2,2,3,2,3,4],3));



var removeElement = function(nums, val) {
let list=[]
list=nums.filter(item=>{
        if(item!==val ) return true
    })
    
    nums.length=list.length;
    for (let index = 0; index < list.length; index++) {
            nums[index]=list[index]        
    }
    console.log(nums);
    return list.length
  };
  console.log(removeElement([32,23,24,3,2,3,4],3));