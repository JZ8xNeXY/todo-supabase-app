import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Layout } from '../components/layout'

const Home: NextPage = () => {
  return (
    <Layout title='Home'>{'hello'}</Layout>
  )
}

export default Home
