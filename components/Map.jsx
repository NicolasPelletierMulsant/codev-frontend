import * as React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Cookies from 'universal-cookie'
import * as L from "leaflet"

const getBatimentsData = async (batiments) => {
    const cookies = new Cookies();

    try {
        const response = await fetch("https://magous.fr/baptiste/codev/codev/public/api/batiments", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + cookies.get("token")
            },  
        })
        if (response.status == 200) {
            const data = await response.json();
            return data
        } else {
            console.log("Response status: ", response.status);
            return null;
        }
    } catch(error) {
        console.log("Error: ", error);
    }
};

const energyClassToColor = {
    A: "#008001",
    B: "#5dcf0c",
    C: "#80ff00",
    D: "#ffff00",
    E: "#ff9100",
    F: "#ff6824",
    G: "#ff0000",
    N: "#AAAAAA",
};

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

console.log(iconsColorMap);

export default function Map() {

    console.log("Rendering");

    const [batimentsData, setBatimentsData] = React.useState(null);

    React.useEffect(async () => {
        const data = await getBatimentsData();
        setBatimentsData(data);
    }, []);

    return (
        <MapContainer center={[48.52, 2.19]} zoom={5} style={{ height: "100%", width: "90%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {batimentsData && batimentsData.slice(0, 50).map((batiment, index) => (
                <Marker key={index} position={[batiment.latitude, batiment.longitude]} icon={iconsColorMap[batiment.classe_consommation_energie]}>
                    <Popup>
                        {batiment.classe_consommation_energie}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}