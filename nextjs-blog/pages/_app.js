/*
 * @Author: your name
 * @Date: 2021-04-25 15:18:38
 * @LastEditTime: 2021-04-25 16:06:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nextjs-blog\pages\_app.js
 */
import '../styles/style.css'

// ? 新创建的 `pages/_app.js` 文件中必须有此默认的导出（export）函数
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
  }