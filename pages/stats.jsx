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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "Répartition des classes d'énergie",
      },
    },
    maintainAspectRatio: false,
  };

export default function Home() {  

    const [batimentsData, setBatimentsData] = React.useState([]);
    const [energyPieData, setEnergyPieData] = React.useState(null);

    React.useEffect(async () => {
        const data = await getBatimentsData();
        setBatimentsData(data);
    }, []);

    React.useEffect(() => {
        if (batimentsData.length === 0) return;

        const validClassToColor = Object.fromEntries(Object.entries(energyClassToColor).filter(([key, value]) => key !== 'N'));
        const validClass = Object.keys(validClassToColor);
        const isValidKey = (key) => validClass.includes(key);
        
        let energyClassCount = batimentsData.reduce((acc, batiment) => {
            acc[batiment.classe_consommation_energie] = (acc[batiment.classe_consommation_energie] || 0) + 1;
            return acc;
        }, {});
        energyClassCount = Object.fromEntries(Object.entries(energyClassCount).filter(([key, val]) => isValidKey(key)));
        
        const pieData = {
            labels: validClass,
            datasets: [
                {
                    label: 'Bâtiments',
                    data: Object.values(energyClassCount),
                    backgroundColor: Object.values(validClassToColor),
                }
            ]
        };
        setEnergyPieData(pieData);
    }, [batimentsData]);

    return (
        <Layout pageName="Statistiques">
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                {/* {energyPieData &&
                    <Doughnut data={energyPieData} options={{ maintainAspectRatio: false }} height={300} width={300} />
                } */}
                {energyPieData &&
                    <Bar options={options} data={energyPieData} height={400} width={200} />
                }
            </Box>
        </Layout>
    );
};