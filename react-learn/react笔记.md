##  setState()

###  state(状态) 更新可能是异步的
        React 为了优化性能，有可能会将多个 setState() 调用合并为一次更新。
        因为this.props和this.state 可能是异步更新的，你不能依赖他们的值计算下一个state(状态)。
        以下面的代码为例:

        this.setState({
             counter: this.state.counter + this.props.increment,
        });
        我们并不能通过上述代码得到想要的值，为了弥补这个问题，
        使用另一种 setState() 的形式，接受一个函数。这个函数将接收前一个状态作为第一个参数，
        应用更新时的 props 作为第二个参数，
        代码如下：

        this.setState((prevState, props) => ({
             counter: prevState.counter + props.increment
        }));    


###  state(状态)更新会被合并

        当你调用 setState()， React 将合并你提供的对象到当前的状态中。
        所以当State是一个多键值的结构时，可以单独更新其中的一个，此时会进行“差分”更新，不会影响其他的属性值。

  ####  1.执行setState()之后干了什么？      

  setState()方法通过一个队列机制实现state更新，当执行setState()的时候，
  会将需要更新的state合并之后放入状态队列，而不会立即更新this.state(可以和浏览器的事件队列类比)。
  如果我们不使用setState而是使用this.state.key来修改，将不会触发组件的re-render。如果将this.state赋值给一个新的对象引用，
  那么其他不在对象上的state将不会被放入状态队列中，当下次调用setState()并对状态队列进行合并时，直接造成了state丢失。

####  2.setState()可以接受一个函数作为参数？
        setState() 不仅能够接受一个对象作为参数，还能够接受一个函数作为参数。
        函数的参数即为 state 的前一个状态以及 props。.

        void setState (
                function|object nextState,
                [function callback]
            )

        上述代码的第二个参数是一个回调函数，在setState() 的异步操作结束并且组件已经重新渲染的时候执行。
        换句话说，我们可以通过这个回调来拿到更新的state的值。
     
#### 3.执行setState()后能拿到最新的state值吗？

        以前在写代码时候，总是遇到明明执行过setState()，
        但是state的值却不是最新的，那么如何解决这个问题呢？

        因为setState()函数接受两个参数，一个是一个对象，就是设置的状态，还有一个是一个回调函数，
        是在设置状态成功之后执行的，所以我们可以通过回掉拿到最新的state值。
        代码如下：
        updateData = (newData) => {
            this.setState(
                { data: newData },
                () => {
                    //这里打印的是最新的state值
                    console.log(this.state.data);
                }
            );
        }

#### 4.setState()一定是异步更新吗？ 

        function incrementMultiple() {
            this.setState({count: this.state.count + 1});
            this.setState({count: this.state.count + 1});
            this.setState({count: this.state.count + 1});
        }

        直观上来看，当上面的 incrementMultiple 函数被调用时，组件状态的 count 值被增加了3次，
        每次增加1，那最后 count 被增加了3。但是，实际上的结果只给 state 增加了1。

        事实上，setState 方法与包含在其中的执行是一个很复杂的过程，从 React 最初的版本到现在，
        也有无数次的修改。它的工作除了要更动 this.state 之外，还要负责触发重新渲染，
        这里面要经过 React 核心 diff 算法，最终才能决定是否要进行重渲染，以及如何渲染。
        而且为了批次与效能的理由，多个 setState 呼叫有可能在执行过程中还需要被合并，
        所以它被设计以延时的来进行执行是相当合理的。

        在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，
        而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，
        但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，
        而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果，
        就是由 React 控制的事件处理过程 setState 不会同步更新 this.state。


## 总结： setState() 在react 控制下是异步，多个set会取最后一个实现；像在setTimeout 中set 就是同步的；想在set之后直接获取 state 最新值可在set 第二个参数回调函数中调用；

## 第一个参数可以写为函数 ，传入两个参 一个是state 之前的值 ， 第二个自定义 ；可以传入props 之类的值；
