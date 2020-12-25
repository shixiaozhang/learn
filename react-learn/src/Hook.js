/*
 * @Author: your name
 * @Date: 2020-12-24 17:17:22
 * @LastEditTime: 2020-12-25 11:15:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\Hook.js
 */
import React,{useState,useEffect} from 'react'

function Example(){
    const [count,setCount]=useState(0)
    
    useEffect(()=>{
        document.title=`${count}`
    })
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