import * as React from 'react';
import Layout from '../components/Layout.jsx'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { getUserInfo } from '../utils/api.js';

export default function Home() {

    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");

    React.useEffect(async () => {
        const data = await getUserInfo();
        setUsername(data.name);
        setEmail(data.email);
    }, []);

    return (
        <Layout pageName="Profile">
            <Box sx={{ 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center", 
                height: "60vh" 
            }}>
                <Card variant="outlined" sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center" ,
                    minWidth: "18rem",
                }}>
                    <CardContent>
                        <Box
                            component="form"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                                '& *': { m: 1 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Avatar src="./img/avatar_test.jpg" sx={{ width: "80px", height: "80px" }} />
                            </Box>
                            <TextField
                                className="outlined-read-only-input"
                                label="Nom d'utilisateur"
                                value={username}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                className="outlined-read-only-input"
                                label="Adresse email"
                                value={email}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Layout>
    );
}