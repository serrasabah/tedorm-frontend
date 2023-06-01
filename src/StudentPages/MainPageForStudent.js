import React, { useState, useEffect } from "react";
import AppBarForStudents from "./AppBarForStudent";
import { Container, Grid, Box } from "@mui/material";
import { UserApi } from "../api/UserApi";
import { useParams, useNavigate } from "react-router-dom";
import WeatherWidget from "./Widgets/WeatherWidget";
import DormImagesCarousel from "./Widgets/DormImagesCarousel";
import SocialMediaLinks from "./Widgets/SocialMediaLinks.js";
import WelcomeMessage from "./Widgets/WelcomeMessage.js";
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

  return (
    <div>
      <AppBarForStudents {...id} />
      <Box sx={{ minHeight: "calc(100vh - 64px)", paddingTop: "10px" }}>
        <Container maxWidth="lg">
          <WelcomeMessage user={user} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DormImagesCarousel />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <WeatherWidget />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SocialMediaLinks />
                </Grid>
              </Grid>
              <Maps />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default MainPageForStudent;
