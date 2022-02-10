import * as React from 'react'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout.jsx'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Home() {

    const [showEnergy, setShowEnergy] = React.useState(true);
    const [showGes, setShowGes] = React.useState(false);

    const toggleEnergyData = () => {
        setShowEnergy(true);
        setShowGes(false);
    }

    const toggleGesData = () => {
        setShowGes(true);
        setShowEnergy(false);
    }

    // Dynamic import to use client side rendering
    const Map = dynamic(
        () => import('../components/Map.jsx'),
        { ssr: false }
    );

    return (
        <Layout pageName="Carte" leaflet>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: "5px",
                "& > *": {
                    margin: "0px 5px 5px 5px",
                    color: "black",
                    border: "1px solid gray"
                }
            }}>
                <Button onClick={toggleEnergyData} variant={showEnergy ? "contained" : "outlined"}>Energy</Button>
                <Button onClick={toggleGesData} variant={showGes ? "contained": "outlined"}>Ges</Button>
            </Box>
            <Box sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
            }}>
                <Map showEnergy={showEnergy} />
            </Box>
        </Layout>
    );
}