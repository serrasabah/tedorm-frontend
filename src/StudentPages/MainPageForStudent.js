import AppBarForStudents from "./AppBarForStudent";
import TEDORMmap from "./TEDORMmap.png";
import { CardMedia, Paper, Box, Button } from "@mui/material";
import * as React from 'react';
import { UserApi } from "../api/UserApi";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PermissionFormForStudents from "./PermissionPage/PermissionFormForStudents"; 
function MainPageForStudent() {

  const [user, setUser] = useState(null); // Öğrenci verisi için state tanımlayın
  const userApi = new UserApi();

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // Component yüklendiğinde öğrenci verisini almak için useEffect kullanın
    async function fetchUser() {
      try {
        const response = await userApi.getUserById(id); // Spring Boot'tan öğrenci verisini alın
        setUser(response.data); // Veriyi state'e kaydedin
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            marginLeft: 20,
            marginTop: 5,
            width: 680,
            height: 861,
          },
        }}
      >
        <Paper elevation={3} />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              width: 680,
              height: 300,
            },
          }}
        >
          <Paper elevation={3} />
          <CardMedia
            image={TEDORMmap}
            component="img"
            style={{
              width: "100%",
              height: "55%",
            }}
            sm={2}
            md={3}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {},
            }}
          ></CardMedia>
          <Button variant="outlined" onClick={handleProfileClick}>
            Go to Profile
          </Button>
          <Button variant="outlined" onClick={handlePermissionClick}>
            Go to Permission
          </Button>
        </Box>
      </Box>
    </div>
  );
}
export default MainPageForStudent;
