# react 源码 学习笔记

防抖：一段时间的输入，只会触发一次

节流：限制触发更新的频率



# 架构



- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入**Reconciler**
- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

# jsx

## export function createElement(type, config, children) {}

```
<div title='11'>1</div>

React.createElement("div", {title: "11"}, "1");
```

```
<div title='11'><p>123</p></div>

React.createElement("div", {
  title: "11"
}, React.createElement("p", null, "123"));
```

```
class A extends React.Component{
  render(){
	return "A"
	}
}

<div title='11'>
	<p>123</p>
	<A/>
</div>

/*#__PURE__*/
React.createElement("div", {
  title: "11"
  }, /*#__PURE__*/React.createElement("p", null, "123"), 					/*#__PURE__*/React.createElement(A, null));
```

**什么是react-element ：就是react.createElement方法调用的结果**

## createElement函数；做了什么；

**定义一些常用字段：**

```
const* props = {};

 *let* key = null;

 *let* ref = null;

 *let* self = null;

 *let* source = null;
 
 let定义的为保留属性；
```



* config如果不为null==》检查ref的合法性以及key的合法性；并一些定义好的字段赋值；

* 遍历 config 将除了保留属性的其他的属性，赋值给props；

* 处理defaultProps (来自type的属性)；相当于一个类组件的，默认属性；

* 最后返回一个ReactElement函数的结果

  ```
    return ReactElement(
      type,
      key,
      ref,
      self,
      source,
      ReactCurrentOwner.current,
      props,
    );
  ```

  

# ReactElement函数

## *const* ReactElement = function(type, key, ref, self, source, owner, props) {}  ；返回一个element 对象

```
 const element = {
    // This tag allows us to uniquely identify this as a React Element
    
    $$typeof: REACT_ELEMENT_TYPE,
    
	//REACT_ELEMENT_TYPE 这个常量就是标识是否是一个正常的element 对象；
	
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner,
  };
```

### 判断是否是一个合法的element 对象的函数；

```
export function isValidElement(object) {
  return (
    typeof object === 'object' &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
```



# 首屏渲染的情况下：



# “递”阶段mount时流程



![image-20210403183045898](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210403183045898.png)

**export *const* HostRoot = 3;**//常量

** 当前应用的根节点；tag：3**

## tag：3（current;begin）--》func App() (work-begin)-->div(work-begin) -->header(work-begin) -->img(work-begin)-->img(work-complete)-->p(work-begin)-->edit(work-begin)-->edit(work-complete)-->code(work-begin)-->and(work-begin)-->p(work-complete)-->a(work-begin)-->a(work-complete)-->header(work-complete)-->div(work-complete)-->func App()(work-complete)-->tag：3(current===work-complete)----->render

### 执行：第一次执行

![image-20210403180306437](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210403180306437.png)

断点继续执行：

![image-20210403180422724](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210403180422724.png)

![image-20210403180455744](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210403180455744.png)

再次执行：

![image-20210403180540111](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210403180540111.png)

下面依次执行，elementType为接下来子节点；只有在第一次执行的时候会有current；

fiber为双缓存结构：分别是current-fiber树和workInProgress-fiber 两个树；

第一次进入的时候，currentfiber树为空；react加载workInProgress-fiber 树；最后把workInProgress-fiber 赋值给current-fiber树

当进入beginwork的节点没有子节点；就会执行他的completeWork寻找他的兄弟节点；

![image-20210403181142800](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210403181142800.png)

![image-20210403181157249](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210403181157249.png)

然后img的兄弟节点p就会执行beginWork ；---这就是深度优先便利原则；

![image-20210403181328125](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210403181328125.png)

因为p标签有三个子节点；所以p的第一个“Edit” 会执行beginWork 在执行completeWork寻找他的兄弟节点；

然后他的兄弟节点”code“ 就会执行beginWork但是他不会继续执行beginWork；而是去执行completeWork去寻找他的兄弟节点；因为react对仅有一个文本子节点的，节点进行了优化；不会把该节点的文本子节点当做fiber节点；

当这些子节点执行完毕，并且没有自己的子节点和兄弟节点后会执行 父节点的completeWork；然后依次向上；当到了component节点也同样会执行completeWork寻找他的父节点也是当前tag：3的fiber节点；然后完成render阶段进入commit阶段进行渲染；

![image-20210403182552653](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210403182552653.png)

![image-20210403182614624](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210403182614624.png)



## beginWork函数-内部：再div进入beginWork时看：



![image-20210406210322542](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210406210322542.png)

根据workInProgress不同的tag进入不同case

![image-20210406210627653](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210406210627653.png)

div是个HostComponent 进入updataHostComponent的逻辑：

![image-20210406210925783](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210406210925783.png)

updataHostComponent中会对一些变量进行赋值，同时判断该节点时候只有一个文本子节点；

最后再通过reconcileChildren 对该节点的child进行赋值；

![image-20210406211130693](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210406211130693.png)

在reconcileChildren 中对current进行判断；执行mountChildFibers（不标记副作用）或者reconcileChildFibers（标记副作用）创建节点；

![image-20210406211332033](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210406211332033.png)

这两个函数都是通过一个相同的函数实现的，传不同的值该值的意思是：是否追踪副作用，副作用就为需要执行dom操作的fiber节点打上标记；

进入mountChildFibers也就是给reconcileChildFibers传入false；在其中先判断child的类型进入不同的处理逻辑；



![image-20210406212747901](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210406212747901.png)



判断子节点是不是reactElement对象，或string|number（文本节点） 或者array（多个子节点）；

然后进入多个函数创建成为fiber节点；

![image-20210406211428933](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210406211428933.png)

最后updataHostComponent返回该节点的子fiber节点

**总结：**当一个节点进入beginWork的，她的目的是为了创建他的第一个子fiber节点；

流程为：

![image-20210406213529882](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210406213529882.png)

先判断当前节点的类型进入不同的update逻辑在update中会判断workInProgress是否存在对应的current fiber来决定是否进行effectTarget副作用标记，接着进入reconcile逻辑，在reconcile中判断当前fiber节点的children是什么类型，来执行不同的创建fiber节点的操作；最后返回 该节点的 第一个子节点；

每次调用beginWork时只会创建一个子fiber节点，不管有多少个子节点

![image-20210406214259455](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210406214259455.png)

![image-20210406214309429](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210406214309429.png)



# **workInProgress上的tag是什么：tag是react中对不同类型节点的常量；**



# 归”阶段mount时流程：

## completeWork函数：

![image-20210406214643675](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210406214643675.png)

**第一个进入completeWork的是 img 节点；**根据不同的tag进入不同的case；判断current 存不存在；在首屏渲染是curren fiber节点是不存在的；

然后为img fiber节点创建相应的 dom节点，在createInstance中创建，在createInstance调用createElement创建dom元素；当创建好dom节点会通过appendAllChildren插入以前创建好的dom树中，由于img是我们创建的第一个dom节点，所以本次插入操作会跳过；然后会把img的dom节点保存在img对应的fiber节点的workInProgress.**stateNode** 属性上，然后为dom节点设置原生属性在 finalizeInitialChildren 函数中；至此一个节点的completeWork完成，进入下一个节点的completeWork



![image-20210406220706273](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210406220706273.png)

![image-20210406220808892](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210406220808892.png)

![image-20210406221301466](C:\Users\DaFu\AppData\Roaming\Typora\typora-user-images\image-20210406221301466.png)



**appendAllChildren方法：会把已经创建好的dom节点挂在到当前的dom节点下**，当我们在归节点，从每一个子节点一路向上，归到根节点时我们创建的每一个子节点的dom元素都会挂载在他的父级dom节点下；当我们执行到app的时候我们就拥有了一颗完成的dom树



