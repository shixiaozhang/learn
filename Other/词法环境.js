
// 函数执行会优先找词法环境，没有在找执行环境

let a=1;
function aa(){
    //aa 词法环境a=1
    console.log(a);
   
}

function bb(){
    let a=2
   console.log(this)
    aa()
}

bb()//1
a=3
// 执行环境a=3
bb()//3  函数执行会优先找词法环境，没有在找执行环境



// aa变量提升问题
function as(){
    console.log(1)
    console.log(b())

}
// as()

//变量b会提升，但是会在此时才赋值function
// TypeError: b is not a function



// var b=function (){
//     return 2
// }



// let的变量不会提升，所以b不存在
// ReferenceError: Cannot access 'b' before initialization


// let b=function (){
//     return 2
// }