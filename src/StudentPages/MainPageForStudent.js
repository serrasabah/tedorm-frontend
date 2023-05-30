import React, { useState, useEffect } from "react";
import AppBarForStudents from "./AppBarForStudent";
import { CardMedia, Paper, Box, Button, Typography, Grid } from "@mui/material";
import { UserApi } from "../api/UserApi";
import { useParams, useNavigate } from "react-router-dom";
import WeatherWidget from "./Widgets/WeatherWidget";
import DormImagesCarousel from "./Widgets/DormImagesCarousel";
//import SocialMediaLinks from "./SocialMediaLinks";
import Maps from "./Widgets/Maps";

function MainPageForStudent() {
  const [user, setUser] = useState(null);
  const userApi = new UserApi();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await userApi.getUserById(id);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [id]);

  const handleProfileClick = () => {
    navigate(`/StudentProfilePage/${id}`);
  };

  const handlePermissionClick = () => {
    navigate(`/PermissionFormForStudents/${id}`);
  };

  return (
    <div>
      <AppBarForStudents />
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Hoş Geldiniz, {user && user.name}!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Tarih: {new Date().toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Saat: {new Date().toLocaleTimeString()}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <WeatherWidget />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Maps />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DormImagesCarousel />
          </Grid>
          <Grid item xs={12}>
            {/* <SocialMediaLinks /> */}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button variant="outlined" onClick={handleProfileClick}>
          Profil Sayfasına Git
        </Button>
        <Button variant="outlined" onClick={handlePermissionClick}>
          İzin Formuna Git
        </Button>
      </Box>
    </div>
  );
}

export default MainPageForStudent;
