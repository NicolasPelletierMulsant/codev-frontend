import AvatarMenu from './AvatarMenu.jsx';

import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const isConnected = true;

export default function Navbar(props) {
  return (
    <AppBar>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="#" sx={{ textDecoration: "none", color: "white" }}>
          <Box sx={{
              display: "flex", 
              alignItems: "center",
            }}>
            <img src="./img/ousama.png" alt="logo" width="70px" height="70px"/>
            <Typography variant="h6" sx={{ marginLeft: "10px" }}>Projet Codev</Typography>
          </Box>
        </Link>
        
        {isConnected
          ? <AvatarMenu>Test</AvatarMenu>
          : <Button>Se connecter</Button>
        }
        
      </Toolbar>
    </AppBar>
  )
}