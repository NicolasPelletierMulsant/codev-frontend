import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./styles.css"

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
        <Component {...pageProps} />
    </ThemeProvider>
  );
}