// sendRequest是一个同步方法，每次调用随机返回true或者false
/*
1.执行了poll函数之后，每隔一段时间都必须执行一次sendRequest函数。
2.sendRequest必须按照这样的频率执行，第一次执行后隔1s再次调用，第二次执行
之后隔1.5s再次执行，第三次执行之后隔2.25s再执行，每次执行之后需要间隔前一次间
隔的1.5倍。
3.如果sendRequest函数返回了true，则停止继续调用这个方法。
4.函数无需返回，你可以自由设计poll函数接受的参数，但必须满足上面提到的三个
条件
*/ 
function sendReq() {
    var random = Math.random(0, 1);
    var status = !!(random >= 0.5);
    return status;
  
}
async function poll(time) {
    let  status= await sendReq()
    console.log(time);
    let timer;
    if(!status){
        timer= setTimeout(()=>{
        poll(time*1.5)
        },time)
              
    }else{
        clearTimeout(timer)
    }
}
poll(1000)

