/*
 * @Author: your name
 * @Date: 2020-12-30 16:37:06
 * @LastEditTime: 2020-12-30 19:46:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\redux\Link.js
 */
import React from 'react'

const Link=({active,children,onClick})=>{
    if (active) {
        return <span>{children}</span>
    }
    return(
        <a href="#" onClick={e=>{
            e.preventDefault()
            onClick()
        }}>
            {children}
        </a>
    )
}



export default Link