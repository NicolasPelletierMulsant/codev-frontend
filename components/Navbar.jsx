import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export default function Navbar(props) {
  return (
    <AppBar sx={{ backgroundColor: "gray" }}>
      <Toolbar>
      <a href="#">
        <Box sx={{
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center"
          }}>
          <img src="ousama.png" alt="logo" width="70px" height="70px"/>
          <span>Test</span>
        </Box>
      </a>

      </Toolbar>
    </AppBar>
  )
}