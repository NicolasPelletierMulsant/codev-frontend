import { DataGrid } from "@mui/x-data-grid";
import Layout from "../components/Layout";
import Box from "@mui/material/Box";
import * as React from 'react';
import { getBatimentsData } from "../utils/api";


export default function Home() {

    const [batimentsData, setBatimentsData] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    
    React.useEffect(async () => {
        const data = await getBatimentsData();
        setBatimentsData(data);
    }, []);

    React.useEffect(() => {
        const rows = batimentsData.map((batiment, index) => ({
            id: batiment.id,
            geo_adresse: batiment.geo_adresse,
            geo_score: batiment.geo_score,
            classe_consommation_energie: batiment.classe_consommation_energie,
            consommation_energie: batiment.consommation_energie,
            classe_estimation_ges: batiment.classe_estimation_ges,
            estimation_ges: batiment.estimation_ges,
            annee_construction: batiment.annee_construction,
            tr001_modele_dpe_type_libelle: batiment.tr001_modele_dpe_type_libelle,
            tr002_type_batiment_description: batiment.tr002_type_batiment_description,
            surface_thermique_lot: batiment.surface_thermique_lot,
            nom_methode_dpe: batiment.nom_methode_dpe,
            version_methode_dpe: batiment.version_methode_dpe,
            date_etablissement_dpe: batiment.date_etablissement_dpe,
            tv016_departement_code: batiment.tv016_departement_code,
            code_insee_commune_actualise: batiment.code_insee_commune_actualise,
        }));
        setRows(rows);

        const columns = [
            { field: 'geo_adresse', headerName: 'Géo adresse', width: 200 },
            { field: 'geo_score', headerName: 'Géo score', width: 120 },
            { field: 'classe_consommation_energie', headerName: 'Classe énergie', width: 170 },
            { field: 'consommation_energie', headerName: 'Consommation énergie', width: 200 },
            { field: 'classe_estimation_ges', headerName: 'Classe GES', width: 130 },
            { field: 'estimation_ges', headerName: 'Estimation GES', width: 150 },
            { field: 'annee_construction', headerName: 'Année construction', width: 170 },
            { field: 'tr001_modele_dpe_type_libelle', headerName: 'DPE libellé', width: 120 },
            { field: 'tr002_type_batiment_description', headerName: 'Description', width: 120 },
            { field: 'surface_thermique_lot', headerName: 'Surface thermique', width: 170 },
            { field: 'nom_methode_dpe', headerName: 'Méthode DPE', width: 140 },
            { field: 'version_methode_dpe', headerName: 'Version DPE', width: 130 },
            { field: 'date_etablissement_dpe', headerName: 'Date DPE', width: 120 },
            { field: 'tv016_departement_code', headerName: 'Code département', width: 180 },
            { field: 'code_insee_commune_actualise', headerName: 'Code INSEE', width: 130 },
        ];
        setColumns(columns);
    }, [batimentsData]);

    return (
        <Layout pageName="Bâtiments" sx={{
            paddingInline: "1rem",
        }}>
            <Box sx={{
                display: "flex",
                height: "90vh",
            }}>
                {(rows && columns && 
                    <DataGrid rows={rows} columns={columns} sx={{
                        color: "black",
                    }}/>
                )}
            </Box>
        </Layout>
    )
}