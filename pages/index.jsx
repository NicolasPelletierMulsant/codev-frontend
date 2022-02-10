import Layout from '../components/Layout.jsx'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

export default function Home() {
  return (
    <Layout pageName="Accueil">
      <Paper elevation={0} sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "80vw",
        height: "80vh",
        color: "black",
        border: "none",
        backgroundColor: "white",
        backgroundImage: "url('/img/test.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "right",
        "@media (max-width: 1400px)": {
          backgroundPosition: "center",
        }
      }}>
        <Card sx={{
          display: "block",
          width: "fit-content",
          backgroundColor: "white",
          marginLeft: "10vw",
          border: "1px solid black",
          borderRadius: "10px",
          "@media (max-width: 1400px)": {
            marginLeft: "auto",
            marginRight: "auto"
          }
        }}>
          <CardContent sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "fit-content",
            height: "30vh",
            color: "black"
          }}>
            <Typography variant="h4">
              Application Codev
            </Typography>
            <br/>
            <Typography>
              Bienvenue sur le portail d'accueil de l'application.
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Layout>
  )
}
