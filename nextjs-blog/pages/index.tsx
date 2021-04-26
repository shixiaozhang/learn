import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Date from '../components/date'
import { GetStaticProps } from 'next'

interface HomeProps {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}


export default function Home({ allPostsData }:HomeProps) {
  const [home, setHome] = useState(true)
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">
          Learn <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <p className="description">
          Get started by editing <Link href='/posts/first-post'>pages/first-post.js</Link>
        </p>
        <p className="description">
          Get started by editing <Link href='/authors/me'>authors/me.js</Link>
        </p>
        <p className="description">
          Get started by editing <Link href="/posts/[id]" as="/posts/ssg-ssr">
            <a>...</a>
          </Link>
        </p>

      </main>
      <h1>---------------------------------------------------------</h1>
      <Layout home={home}>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>[111Your Self Introduction]</p>
          <p onClick={() => setHome(prevCount => !prevCount)}>change</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{' '}
            <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
        </p>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href="/posts/[id]" as={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </Layout>


    </div>
  )
}

export  const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}