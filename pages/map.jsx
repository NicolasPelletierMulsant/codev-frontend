import * as React from 'react'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout.jsx'
import Box from '@mui/material/Box';

export default function Home() {

    // Dynamic import to use client side rendering
    const Map = dynamic(
        () => import('../components/Map.jsx'),
        { ssr: false }
    );

    return (
        <Layout pageName="Carte" leaflet>
            <Box sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
            }}>
                <Map />
            </Box>
        </Layout>
    );
}