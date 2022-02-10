import Layout from '../components/Layout';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import { energyClassToColor } from '../utils/variables';
import { getBatimentsData } from "../utils/api";
import * as React from 'react';
import Button from '@mui/material/Button';
import ProgressCircle from '../components/ProgressCircle';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

const generateOptions = (title) => {
    return {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: title,
          },
        },
        maintainAspectRatio: false,
    };
}

export default function Home() {  

    const [batimentsData, setBatimentsData] = React.useState([]);
    const [energyData, setEnergyData] = React.useState(null);
    const [gesData, setGesData] = React.useState(null);
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

    React.useEffect(async () => {
        const data = await getBatimentsData();
        setBatimentsData(data);
    }, []);

    React.useEffect(() => {
        if (batimentsData.length === 0) return;

        const validClassToColor = Object.fromEntries(Object.entries(energyClassToColor).filter(([key, value]) => key !== 'N'));
        const validClass = Object.keys(validClassToColor);
        const isValidKey = (key) => validClass.includes(key);
        
        // Handle energy data
        let energyClassCount = batimentsData.reduce((acc, batiment) => {
            acc[batiment.classe_consommation_energie] = (acc[batiment.classe_consommation_energie] || 0) + 1;
            return acc;
        }, {});
        energyClassCount = Object.fromEntries(Object.entries(energyClassCount).filter(([key, val]) => isValidKey(key)));
        
        const energyData = {
            labels: validClass,
            datasets: [
                {
                    label: 'Bâtiments',
                    data: Object.values(energyClassCount),
                    backgroundColor: Object.values(validClassToColor),
                }
            ]
        };
        setEnergyData(energyData);

        // Handle GES data
        let gesClassCount = batimentsData.reduce((acc, batiment) => {
            acc[batiment.classe_estimation_ges] = (acc[batiment.classe_estimation_ges] || 0) + 1;
            return acc;
        }, {});
        gesClassCount = Object.fromEntries(Object.entries(gesClassCount).filter(([key, val]) => isValidKey(key)));

        const gesData = {
            labels: validClass,
            datasets: [
                {
                    label: 'Bâtiments',
                    data: Object.values(gesClassCount),
                    backgroundColor: Object.values(validClassToColor),
                }
            ]
        };
        setGesData(gesData);
    }, [batimentsData]);

    return (
        <Layout pageName="Statistiques">
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: "30px",
                "& > *": {
                    margin: "10px",
                    color: "black",
                    border: "1px solid gray"
                }
            }}>
                <Button onClick={toggleEnergyData} variant={showEnergy ? "contained" : "outlined"}>Energy</Button>
                <Button onClick={toggleGesData} variant={showGes ? "contained": "outlined"}>Ges</Button>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                {!energyData && !gesData && <ProgressCircle sx={{ height: "200px" }} />}
                {showEnergy && energyData && <Bar options={generateOptions("Répartition des classes d'énergie")} data={energyData} height={450} width={200} />}
                {showGes && gesData && <Bar options={generateOptions("Répartition des classes GES")} data={gesData} height={450} width={200} />}
            </Box>
        </Layout>
    );
};