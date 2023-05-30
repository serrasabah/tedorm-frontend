import * as React from 'react';
import { Button, CardMedia, CssBaseline, FormControl, TextField, Grid, Box, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppBarForAdmin from '../AppBarForAdmin';
import { UserApi } from '../../api/UserApi';
import { AnnouncementApi } from '../../api/AnnouncementApi';
import AnnouncementIcon from "./AnnouncementIcon.png";
export default function AddAnnouncement() {

    const announcementApi = new AnnouncementApi();
    const adminApi = new UserApi();
    const [admin, setAdmin] = useState(null); 
    const { id } = useParams();
    /*
        useEffect(() => {
            // Component yüklendiğinde öğrenci verisini almak için useEffect kullanın
            async function fetchStudent() {
                try {
                    const response = await adminApi.getUserById(id); // Spring Boot'tan öğrenci verisini alın
                    setAdmin(response.data); // Veriyi state'e kaydedin
                } catch (error) {
                    console.log(error);
                }
            }
            fetchStudent();
        }, [id]);
    */
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };

    const [formState, setFormState] = useState({});

    function onInputChange(event) {
        const field = event.target.name;
        const value = event.target.value;
        const newState = { ...formState };
        newState[field] = value;
        setFormState(newState);
    }

    async function addAnnouncement(formState) {
        const response = await announcementApi.addAnnouncement(formState);
        if (response.data.responseType === "SUCCESS") {
            toast.success(response.data.message);
        }
    }
    const theme = createTheme();

    return (
        <div>
            <AppBarForAdmin />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }} >
                        <Typography component="h1" variant="h5" sx={{ mr: 108 }}>
                            Announcement
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }} >
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '500px',
                                    height: '600px',
                                    mt: 5,
                                }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth xs={15}>
                                            <TextField onChange={onInputChange} name="announcement" id="outlined-multiline-static" label="Add Announcement" multiline rows={12} defaultValue="" />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Button onClick={() => addAnnouncement(formState)} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={formState.address === null}>
                                    Send to Students
                                </Button>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{
                                    width: 'auto',
                                    height: '100%',
                                    marginLeft: 2,
                                }}
                                image={AnnouncementIcon}
                                alt="Announcement Icon" />
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}