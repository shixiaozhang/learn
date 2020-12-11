
// 函数执行会优先找词法环境，没有在找执行环境

let a=1;
 //aa 词法环境a=1
function aa(){
   
    console.log(a);
   
}

function bb(){
    let a=2
//    console.log(this)
    aa()
}

bb()//1
a=3
// 执行环境a=3
bb()//3  函数执行会优先找词法环境，没有在找执行环境



// // aa变量提升问题
// function as(){
//     console.log(1)
//     console.log(b())

// }
// as()

// //变量b会提升，但是会在此时才赋值function
// // TypeError: b is not a function



// var b=function (){
//     return 2
// }



// let的变量不会提升，所以b不存在
// ReferenceError: Cannot access 'b' before initialization


// let b=function (){
//     return 2
// }


// 优先寻找词法环境，之后才是运行环境
/**
 * 1和2不是同一个name；
 * cb函数中的name指向 1 ；
 * 即便有相同的 2 内存地址也是不同的；
 * 如果2 不存在定义变量的var 那么2 就指向1 或者全局的window，
 * 所以cd 的name就会打印 2的值；
 * 如果1 存在，cb 本身不存在key 为name的变量就从词法环境向外层层找name；
 * outf中如果存在 3 就指向 3；因为变量提升的问题；3 经过提升的值是undefined；
 * 重新定义的值，在cd 定义环境之后，所以 cd 的name 取值为undefined；
 * 
 */
// var name  1
function test(cb, val){
  var name = 'in' //2
  console.log(name);
  console.log(val)
  cb()
  return val
}
test(()=>{},1)//===>in 1   

function outf(){
    
    // function dd(){
    //     console.log(name)
    //     }
    //     console.log(1212);
        // dd()
  var time = test(function(){
    console.log(name)
    }, 100)
//   var name = 'out'; 3

}
outf()// 100 window