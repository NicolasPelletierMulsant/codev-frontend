import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Router from 'next/router';
import Cookies from 'universal-cookie';

const theme = createTheme();

export default function Home() {
  
  const emailRegex = /^.+@\w+\.\w+$/g

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [emailValid, setEmailValid] = React.useState(true);
  
  const handleEmailChange = (event) => {
    if (!event.currentTarget.value.match(emailRegex)) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  }

  React.useEffect(() => {
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  }, [password, confirmPassword]);

  const handlePasswordChange = (event) => {
    setPassword(event.currentTarget.value);
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const username = data.get("username");
    const password = data.get("password");
    const confirmPassword = data.get("confirm-password");

    if (!(email && username && password && confirmPassword)) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    if (!email.match(emailRegex)) {
      alert("Format d'email invalide");
      return;
    }

    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas");
        return;
    }

    // Handle registration

    // TODO: Util files to handle api requests?
    fetch(process.env.API_URL + "/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: username,
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
        alert("!");
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
            Créer un compte
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
              onChange={handleEmailChange}
              error={!emailValid}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nom d'utilisateur"
              name="username"
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
              onChange={handlePasswordChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirmer mot de passe"
              type="password"
              id="confirm-password"
              autoComplete="current-password"
              onChange={handleConfirmPasswordChange}
              error={confirmPasswordError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirmer
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}