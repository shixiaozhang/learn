/*
 * @Author: your name
 * @Date: 2020-12-24 17:17:22
 * @LastEditTime: 2020-12-24 17:24:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\Hook.js
 */
import React,{useState} from 'react'

function Example(){
    const [count,setCount]=useState(0)
    return(
        <div>
            <p>click{count} times</p>
            <button onClick={()=>{
                setCount(count+1)
            }}>dianwo</button>
            
        </div>
    )
}




export default Example