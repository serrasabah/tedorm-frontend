import React, { useState, useEffect } from "react";
import AppBarForStudents from "./AppBarForStudent";
import { Container, Paper, Grid } from "@mui/material";
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

  return (
    <div>
      <AppBarForStudents {...id} />
      <Container maxWidth="lg">
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
    </div>
  );
}

export default MainPageForStudent;
