import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Router from 'next/router';
import Cookies from 'universal-cookie';

const theme = createTheme();

export default function Home() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    if (!(email && password)) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    // Handle connection
  
    // TODO: Util files to handle api requests?
    fetch(process.env.NEXT_PUBLIC_API_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          const token = data.access_token;
          const cookies = new Cookies();
          cookies.set("token", token);
          Router.push('/');
        });
      } else {
        console.log("Response status: ", response.status);
        alert("L'utilisateur n'existe pas");
      }
    })
    .catch(error => console.log('Error: ', error));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Se connecter
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Link href="register" variant="body2">
                  Créer un compte
                </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}