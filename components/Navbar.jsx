import AvatarMenu from './AvatarMenu.jsx';

import * as React from 'react';
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
    <AppBar position="fixed" sx={ props.sx }>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography variant="h6" noWrap component="div">{ props.pageName }</Typography>
        
        {isConnected
          ? <AvatarMenu>Test</AvatarMenu>
          : <Button>Se connecter</Button>
        }
        
      </Toolbar>
    </AppBar>
  )
}