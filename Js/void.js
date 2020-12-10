/**
 * void 运算符：
 *      语法： void expression
*       void 运算符通常只用于获取 undefined的原始值，一般使用void(0)（等同于void 0）。
*       在上述情况中，也可以使用全局变量undefined 来代替（假定其仍是默认值）
 */


// 立即调用的函数表达式
void function(){

}()

// void 可以同 - + ` （）等运算符一样 
// 让 JavaScript 引擎把一个function关键字识别成函数表达式而不是函数声明

// 让a href无效：

{/* <a href="javascript:void(0);"></a> */}

/**
 *  void 任意表达式；===》会返回undefined；
 *      一般用来 void 0 表示 undefined
 */
// void 0 与 undefined 区别:


// 1、undefined可以被重写

(function() {
    var undefined = 10;
    // 10 -- chrome
    alert(undefined);
  })();
   
  (function() {
    undefined = 10;
    // undefined -- chrome
    alert(undefined);
  })();

  /**
   * void 运算符能对给定的表达式进行求值，然后返回 undefined。
   * 也就是说，void 后面你随便跟上一个表达式，
   * 返回的都是 undefined，如 void (2), void (‘hello’)。
   * 并且void是不能被重写的。
   * 但为什么是void 0 呢，void 0 是表达式中最短的。
   * 用 void 0 代替 undefined 能节省字节。
   * 不少 JavaScript 压缩工具在压缩过程中，
   * 正是将 undefined 用 void 0 代替掉了。
   */