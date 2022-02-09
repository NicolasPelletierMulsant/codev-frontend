import Layout from '../components/Layout.jsx'
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Layout pageName="Accueil">
      <Typography>
      Welcome to Codev!
      </Typography>

      <h1 className="title">
      Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className="description">
      Get started by editing <code>pages/index.js</code>
      </p>
    </Layout>
  )
}