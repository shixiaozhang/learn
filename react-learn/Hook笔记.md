<!--
 * @Author: your name
 * @Date: 2020-12-24 17:14:31
 * @LastEditTime: 2020-12-24 17:40:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\Hook笔记.md
-->


# Hook 

## 可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性
## Hook 使你在非 class 的情况下可以使用更多的 React 特性。

## useState

### 使用：const [count, setCount] = useState(0);

        function Example() {
        // 声明一个新的叫做 “count” 的 state 变量
        const [count, setCount] = useState(0);

        return (
            <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            </div>
        );
        }

