# WebComponent
WebComponent 是一套技术的组合，具体涉及到了 Custom elements（自定义元素）、Shadow DOM（影子 DOM）和HTML templates（HTML 模板），详细内容你可以参考 MDN 上的


    <!DOCTYPE html>
    <html>


    <body>
        <!--
                一：定义模板
                二：定义内部CSS样式
                三：定义JavaScript行为
        -->
        <template id="geekbang-t">
            <style>
                p {
                    background-color: brown;
                    color: cornsilk
                }


                div {
                    width: 200px;
                    background-color: bisque;
                    border: 3px solid chocolate;
                    border-radius: 10px;
                }
            </style>
            <div>
                <p>time.geekbang.org</p>
                <p>time1.geekbang.org</p>
            </div>
            <script>
                function foo() {
                    console.log('inner log')
                }
            </script>
        </template>
        <script>
            class GeekBang extends HTMLElement {
                constructor() {
                    super()
                    //获取组件模板
                    const content = document.querySelector('#geekbang-t').content
                    //创建影子DOM节点
                    const shadowDOM = this.attachShadow({ mode: 'open' })
                    //将模板添加到影子DOM上
                    shadowDOM.appendChild(content.cloneNode(true))
                }
            }
            customElements.define('geek-bang', GeekBang)
        </script>


        <geek-bang></geek-bang>
        <div>
            <p>time.geekbang.org</p>
            <p>time1.geekbang.org</p>
        </div>
        <geek-bang></geek-bang>
    </body>


    </html>

### 要使用 WebComponent，通常要实现下面三个步骤。
**首先，使用 template 属性来创建模板。**利用 DOM 可以查找到模板的内容，但是模板元素是不会被渲染到页面上的，也就是说 DOM 树中的 template 节点不会出现在布局树中，所以我们可以使用 template 来自定义一些基础的元素结构，这些基础的元素结构是可以被重复使用的。一般模板定义好之后，我们还需要在模板的内部定义样式信息。
其次，我们需要创建一个 GeekBang 的类。在该类的构造函数中要完成三件事：
  * 查找模板内容；
  * 创建影子 DOM；
  * 再将模板添加到影子 DOM 上。
  
上面最难理解的是影子 DOM，其实影子 DOM 的作用是将模板中的内容与全局 DOM 和 CSS 进行隔离，这样我们就可以实现元素和样式的私有化了。你可以把影子 DOM 看成是一个作用域，其内部的样式和元素是不会影响到全局的样式和元素的，而在全局环境下，要访问影子 DOM 内部的样式或者元素也是需要通过约定好的接口的。

总之，通过影子 DOM，我们就实现了 CSS 和元素的封装，在创建好封装影子 DOM 的类之后，我们就可以使用 customElements.define 来自定义元素了（可参考上述代码定义元素的方式）。最后，就很简单了，可以像正常使用 HTML 元素一样使用该元素，如上述代码中的。

另外，使用 DOM 接口也是无法直接查询到影子 DOM 内部元素的，比如你可以使用document.getElementsByTagName('div')来查找所有 div 元素，这时候你会发现影子 DOM 内部的元素都是无法查找的，因为要想查找影子 DOM 内部的元素需要专门的接口，所以通过这种方式又将影子内部的 DOM 和外部的 DOM 进行了隔离。

通过影子 DOM 可以隔离 CSS 和 DOM，不过需要注意一点，影子 DOM 的 JavaScript 脚本是不会被隔离的，比如在影子 DOM 定义的 JavaScript 函数依然可以被外部访问，这是因为 JavaScript 语言本身已经可以很好地实现组件化了