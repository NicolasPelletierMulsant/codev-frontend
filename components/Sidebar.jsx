import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Temp import
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// import Link from '@mui/material/Link';
import Link from 'next/Link';

const linkList = [
    { text: "1 - Un", href: "/test" },
    { text: "2 - Deux", href: "#" },
    { text: "3 - Trois", href: "#" }
]; 

export const sidebarWidth = 180;

export function Sidebar(props) {
  return (
    <Drawer variant="permanent" anchor="left" sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
        },
      }}>
        <Link href="/">
            <Box sx={{
                display: "flex", 
                alignItems: "center",
                justifyContent: "center",
                padding: "10px"
                }}>
                <img src="./img/site_logo.png" alt="logo" width="42px" height="42px"/>
                <Typography variant="h5" sx={{ marginLeft: "10px" }}>Codev</Typography>
            </Box>
        </Link>
        
        <Divider />

        <List>
            {linkList.map((object, index) => (
                <Link href={object.href} key={index} sx={{ textDecoration: "none" }}>
                    <ListItem button>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={object.text} />
                    </ListItem>
                </Link>
            ))}
        </List>
    </Drawer>
  )
}
