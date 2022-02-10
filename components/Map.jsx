import * as React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import * as L from "leaflet"
import Legend from './Legend'
import Router from 'next/router'
import { getBatimentsData } from '../utils/api'
import { energyClassToColor } from '../utils/variables'
import ProgressCircle from './ProgressCircle'
import Box from '@mui/material/Box'

function getStyleFromEnergyClass(energyClass) {
    return `
        background-color: ${energyClassToColor[energyClass] || "#000000"};
        width: 1.5rem;
        height: 1.5rem;
        display: block;
        left: -1.5rem;
        top: -1.5rem;
        position: relative;
        border-radius: 3rem 3rem 0;
        transform: rotate(45deg);
        border: 1px solid #FFFFFF
        `
};

function iconFunction(energyClass) {
    return L.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span style="${getStyleFromEnergyClass(energyClass)}" />`
    })
};

const iconsColorMap = Object.keys(energyClassToColor).reduce((acc, energyClass) => {
    acc[energyClass] = iconFunction(energyClass)
    return acc;
}, {});

export default function Map(props) {

    const [batimentsData, setBatimentsData] = React.useState(null);
    const [map, setMap] = React.useState(null);

    React.useEffect(async () => {
        const data = await getBatimentsData();
        setBatimentsData(data);
    }, []);

    const onMarkerClick = (event, batimentId) => {
        Router.push({
            pathname: '/batiment/[id]',
            query: { id: batimentId }
        });
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
            {!batimentsData 
                ? <ProgressCircle />
                : <MapContainer center={[47, 2.19]} zoom={6} style={{ height: "100%", width: "90%" }} whenCreated={setMap}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {batimentsData.slice(1, 1000).map((batiment, index) => (
                        <Marker key={index} 
                            position={[batiment.latitude, batiment.longitude]} 
                            icon={props.showEnergy ? iconsColorMap[batiment.classe_consommation_energie] : iconsColorMap[batiment.classe_estimation_ges]}
                            eventHandlers={{
                                click: event => onMarkerClick(event, batiment.id)
                            }}>
                            <Tooltip>
                                {batiment.geo_adresse}
                            </Tooltip>
                        </Marker>
                    ))}
                    <Legend map={map} data={energyClassToColor} showEnergy={props.showEnergy} />
                </MapContainer>
            }
        </Box>
    );
}