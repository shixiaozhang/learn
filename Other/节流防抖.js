// 节流：如果短时间内大量触发同一事件，那么在函数执行一次之后，该函数在指定的时间期限内不再工作，直至过了这段时间才重新生效。
// 一定时间内只执行一次
// 时间戳：等会请求
var throttle = function(func, delay) {            
    　　var prev = Date.now();            
    　　return function() {                
    　　　　var context = this;                
    　　　　var args = arguments;                
    　　　　var now = Date.now();                
    　　　　if (now - prev >= delay) {                    
    　　　　　　func.apply(context, args);                    
    　　　　　　prev = Date.now();                
    　　　　}            
    　　}        
    }        
    function handle() {            
    　　console.log(Math.random());        
    }        
    window.addEventListener('scroll', throttle(handle, 1000));
    // 定时器：请求了等会
    var throttle = function(func, delay) {            
        var timer = null;            
        return function() {                
            var context = this;               
            var args = arguments;                
            if (!timer) {                    
                timer = setTimeout(function() {                        
                    func.apply(context, args);                        
                    timer = null;                    
                }, delay);                
            }
        }        
    }        
    
    function throttle(fn,delay){
        let valid = true
        return function() {
           if(!valid){
               //休息时间 暂不接客
               return false 
           }
           // 工作时间，执行函数并且在间隔期内把状态位设为无效
            valid = false
            setTimeout(() => {
                fn()
                valid = true;
            }, delay)
        }
    }

    function handle() {            
        console.log(Math.random());        
    }        
    window.addEventListener('scroll', throttle(handle, 1000));

// 防抖的含义就是让某个时间期限（如上面的1000毫秒）内，事件处理函数只执行一次。
// 持续触发不执行，不触发的一段时间之后再执行


// 防抖：请求了等会
function debounce(fn, wait) {    
    var timeout = null;    
    return function() {        
        if(timeout !== null)   clearTimeout(timeout);    
        timeout = setTimeout(fn, wait);    
    }
}
// 处理函数
function handle() {    
    console.log(Math.random()); 
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 1000));