/*
 * @Author: your name
 * @Date: 2021-04-25 13:13:56
 * @LastEditTime: 2021-04-25 13:54:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nextjs-blog\pages\authors\me.js
 */
import Link from 'next/link'
export default function Me() {
    return (
        <>
            <h1>authors is me</h1>
            <h2>
                <Link href='/'>go home</Link>
            </h2>
        </>
    )
}