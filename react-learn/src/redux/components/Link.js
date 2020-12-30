/*
 * @Author: your name
 * @Date: 2020-12-30 16:37:06
 * @LastEditTime: 2020-12-30 16:52:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\redux\Link.js
 */
import React from 'react'
import PropTypes  from 'prop-types'

const Link=({active,children,onClick})=>{
    if (active) {
        return <span>{children}</span>
    }
    return(
        <a href="" onClick={e=>{
            e.preventDefault()
            onClick()
        }}>
            {children}
        </a>
    )
}


Link.PropTypes={
    active:PropTypes.bool.isRequired,
    children:PropTypes.node.isRequired,
    onClick:PropTypes.func.isRequired
}
export default Link