// 事件模块

const Event=require('events')


const door=new Event()
/**
 * 当监听器被添加时返回 newListener。
    当监听器被移除时返回 removeListener
 */


// emitter.addListener() 添加监听事件 简写emitter.on()
door.on('test',(val)=>{
    console.log('我是测试'+val);
})

// emitter.emit() 触发事件。 按照事件被注册的顺序同步地调用每个事件监听器。

door.emit('test','hh')


// emitter.eventNames()  返回字符串（表示在当前 EventEmitter 对象上注册的事件）数组

console.log(door.eventNames());//['test']

// emitter.getMaxListeners() 获取可以添加到 EventEmitter 对象的监听器的最大数量
                            // （默认为 10，但可以使用 setMaxListeners() 进行增加或减少）

console.log(door.getMaxListeners());//10

door.setMaxListeners(20)

console.log(door.getMaxListeners());//20.

// 获取作为参数传入的事件监听器数量

console.log(door.listenerCount('test'));

// 获取作为参数传入的事件监听器具体数组
console.log(door.listeners('test'));


//emitter.removeListener()  移除事件emitter.off()
door.off('test',()=>{
    console.log('删除');
})

// emitter.once()  只触发一次


door.once('open',()=>{
    console.log('我只触发一次');
})

door.emit('open')


// emitter.prependListener()
/**
 * 当使用 on 或 addListener 添加监听器时，
 * 监听器会被添加到监听器队列中的最后一个，并且最后一个被调用。 
 * 使用 prependListener 则可以在其他监听器之前添加并调用
 * 
 * 
 */
// emitter.prependOnceListener() 与emitter.prependListener() 相同，针对once事件

// emitter.removeAllListeners([]) 移除所有事件监听
door.removeAllListeners('open')
// console.log(door.listenerCount());
// console.log(door.eventNames());