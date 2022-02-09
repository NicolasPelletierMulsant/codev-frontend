import * as React from 'react';
import Layout from '../../components/Layout.jsx'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Cookies from 'universal-cookie';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useRouter } from 'next/router'

const getBatimentData = async (id) => {
    const cookies = new Cookies();

    try {
        const response = await fetch("https://magous.fr/baptiste/codev/codev/public/api/batiment/" + id, {
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

export default function Home() {
    
    const [batimentData, setBatimentData] = React.useState({});
    const [rows, setRows] = React.useState([]);
    const [columns, setColumns] = React.useState([]);

    const router = useRouter();

    React.useEffect(async () => {
        if (!router.isReady) return;

        const data = await getBatimentData(router.query.id);
        const filteredKeys = ["latitude", "longitude", "created_at", "updated_at", "id"];
        const filteredData = Object.fromEntries(Object.entries(data).filter(([key]) => !filteredKeys.includes(key)));
        setBatimentData(filteredData);
    }, [router.isReady]);
    
    React.useEffect(() => {
        const rows = Object.entries(batimentData).map(([field, value], id) => ({
            id: id,
            field: formatField(field),
            value: value,
        }));
        setRows(rows);

        const columns = [
            { field: 'field', headerName: 'Champ', width: 300 },
            { field: 'value', headerName: 'Valeur', width: 200 },
        ];
        setColumns(columns);
    }, [batimentData])

    const formatField = (field) => {
        field = field.split('_').join(' ');
        return field.charAt(0).toUpperCase() + field.slice(1);
    }

    return (
        <Layout pageName="Informations Bâtiment">
            <Box sx={{ 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center", 
                height: "105vh" 
            }}>
                <Card variant="outlined" sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center" ,
                    minWidth: "30rem",
                    height: "100%",
                }}>
                    <CardContent sx={{ 
                        height: "100%", 
                        width: "100%", 
                        paddingBlock: "50px",
                        backgroundColor: "white"
                    }}>
                        {rows && columns && 
                            <DataGrid rows={rows} columns={columns} sx={{
                                color: "black"
                            }} />
                        }
                    </CardContent>
                </Card>
            </Box>
        </Layout>
    );
}