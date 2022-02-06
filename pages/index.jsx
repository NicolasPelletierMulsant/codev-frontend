import Head from 'next/head'
import Navbar from "../components/Navbar.jsx"

export default function Home() {
  return (

    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="index.css" />
      </Head>

      <Navbar>
      </Navbar>

      <main>
        
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

      </main>
    </div>
  )
}
