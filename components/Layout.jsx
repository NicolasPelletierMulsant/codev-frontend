import Head from 'next/head'
import Box from '@mui/material/Box'
import Navbar from "../components/Navbar.jsx"
import { Sidebar, sidebarWidth } from '../components/Sidebar.jsx'
import Typography from '@mui/material/Typography'

export default function Layout(props) {
    return (
        <Box display={{ display: "flex" }}>
            <Head>
                <title>Projet Codev</title>
                <link rel="icon" href="./img/site_logo.png" />
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                    crossorigin=""/>
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                    crossorigin=""></script>
            </Head>

            <Navbar pageName={props.pageName} sx={{ width: `calc(100% - ${sidebarWidth}px)`, ml: `${sidebarWidth}px` }}>
            </Navbar>

            <Sidebar>
            </Sidebar>

            <Box component="main" sx={{ flexGrow: 1, paddingTop: "5rem", paddingLeft: "1rem", height: "80vh" }}>
                {props.children}
            </Box>
        </Box>
    );
}