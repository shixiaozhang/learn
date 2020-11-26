
    // 其他，关于变量提升，和词法环境的题
    let a=1;
    function aa(){
        console.log(a);
       
    }
   
    function bb(){
        let a=2
     
       console.log(this)
        aa.apply(this)
    }
   
    bb()//1
    a=3
    bb()//3  函数执行会优先找词法环境，没有在找执行环境

    
    function as(){
        console.log(1)
        console.log(b())

    }
    as()

    var b=function (){
        return 2
    }
