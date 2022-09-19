import type {NextPage}
from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { SignInForm } from './components/SignInForm'



const Home: NextPage = () => {
  return (
    <div className={
      styles.container
    }>
      <Head>
        <title>Products Storage</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <SignInForm />

      <footer className={
        styles.footer
      }>


      </footer>
    </div>
  )
}

export default Home
