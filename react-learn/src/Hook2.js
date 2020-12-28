/*
 * @Author: your name
 * @Date: 2020-12-28 16:11:03
 * @LastEditTime: 2020-12-28 18:03:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\Hook2.js
 */
import React, {useImperativeHandle, useRef,useEffect, useState, useCallback, useMemo } from 'react'

// 函数式组件在每次渲染的时候都会重新加载一遍 ，整个函数，
// 所以aa会一直被打印，每次都会生成一个新的aa函数；
// 为了解决函数被重复生成；useCallback
// useCallback返回一个函数
let set = new Set()
let call = new Set()
function Callback() {
    const [count, setCount] = useState(0)
    function aa() {
        console.log('aa');
    }
    console.log(aa);

    const callback = useCallback(() => {
        console.log('callback');
    }, [])
    set.add(aa)//每渲染一次就增加一个新的
    call.add(callback)//始终只有一个
    return (
        <>
            <p>{count}</p>
            <h1>{set.size}</h1>
            <h1>{call.size}</h1>
            <button onClick={() => {
                setCount(count + 1)
            }}>++++</button>
            <button onClick={callback}>callback</button>
        </>
    )
}

let mm = new Set()
// useMemo
function Memo() {

    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');

    function expensive() {
        // 无论是修改count还是val，由于组件的重新渲染，
        // 都会触发expensive的执行;造成性能浪费；
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }
    // 通过useMemo ，不让特定值没发生变化时expensive重复执行
    // useMemo返回一个值
    const exp = useMemo(() => {
        console.log('useMemo');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }, [count])
    mm.add(expensive)
    return <div>
        <h1>{mm.size}</h1>
        <h4>{count}-{val}-{expensive()}--{exp}</h4>
        <div>
            <button onClick={() => setCount(count + 1)}>+c1</button>
            <input value={val} onChange={event => setValue(event.target.value)} />
        </div>
    </div>;
}


// useImperativeHandle 
// 
const FancyInput = React.forwardRef((props, ref) => {
    const [ fresh, setFresh ] = useState(false)
    const attRef = useRef(0);//ref可以当变量使用,改变不会重新渲染
    useImperativeHandle(ref, () => ({
      attRef,
      fresh
    }), [ fresh ]);
  
    const handleClick = useCallback(() => {
      attRef.current++;
      console.log(attRef);
    }, [attRef]);
  
    return (
      <div>
        {attRef.current}
        <button onClick={handleClick}>Fancy+</button>
        <button onClick={() => setFresh(!fresh)}>刷新</button>
      </div>
    )
  });
  
  const App = props => {
    const fancyInputRef = useRef();
  
    return (
      <div>
        <FancyInput ref={fancyInputRef} />
        <button
          onClick={() => console.log(fancyInputRef.current)}
        >父组件访问子组件的实例属性</button>
      </div>
    )
  }

function All() {
    return <>
        <Callback></Callback>
        <Memo></Memo>
        
        <App></App>
    </>
}

export default All