import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Marketowns</title>
        <meta name="description" content="Your Go To Marketplace in Vancouver" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h3>Homepage</h3>
        <Link href="/register-page">Register</Link>
      </main>
    </>
  )
}
