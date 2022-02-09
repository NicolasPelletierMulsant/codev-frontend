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
import BarChartIcon from '@mui/icons-material/BarChart';
import MapIcon from '@mui/icons-material/Map';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

// import Link from '@mui/material/Link';
import Link from 'next/Link';

const linkList = [
    { icon: MapIcon, text: "Carte Energie", href: "/map" },
    { icon: MapsHomeWorkIcon, text: "Bâtiments", href: "/batiments" },
    { icon: BarChartIcon, text: "Statistiques", href: "/stats" }
]; 

export const sidebarWidth = 210;

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
        <Box sx={{
            cursor: "pointer",
            '&:hover': {
                boxShadow: "inset 0 0 20px 20px rgba(255, 255, 255, 0.1)",
                transition: "box-shadow 0.2s ease-in-out",
            }
        }}>
            <Link href="/">
                <Box sx={{
                    display: "flex", 
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px"
                    }}>
                    <img src="/img/site_logo.png" alt="logo" width="42px" height="42px"/>
                    <Typography variant="h5" sx={{ marginLeft: "10px" }}>Codev</Typography>
                </Box>
            </Link>
        </Box>
        
        <Divider />

        <List>
            {linkList.map((object, index) => (
                <Link href={object.href} key={index} sx={{ textDecoration: "none" }}>
                    <ListItem button>
                        <ListItemIcon>
                            {React.createElement(object.icon)}
                        </ListItemIcon>
                        <ListItemText primary={object.text} />
                    </ListItem>
                </Link>
            ))}
        </List>
    </Drawer>
  )
}
