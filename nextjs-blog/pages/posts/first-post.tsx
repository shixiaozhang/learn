/*
 * @Author: your name
 * @Date: 2021-04-23 17:40:14
 * @LastEditTime: 2021-04-25 16:03:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nextjs-blog\pages\posts\first-post.js
 */
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'
export default function FirstPost() {
    return (
        <>
            <Layout>
                <Head>
                    <title>First Post</title>
                </Head>
                <h1>First Post</h1>
                <h2>
                    <Link href='/authors/me'>go me</Link>
                </h2>
                <h2>
                    <Link href='/'>go home</Link>
                </h2>
            </Layout>
        </>
    )
}