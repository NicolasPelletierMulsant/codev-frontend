import AvatarMenu from './AvatarMenu.jsx';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar(props) {
  return (
    <AppBar position="fixed" sx={ props.sx }>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography variant="h6" noWrap component="div">{ props.pageName }</Typography>
        
        <AvatarMenu />
        
      </Toolbar>
    </AppBar>
  )
}