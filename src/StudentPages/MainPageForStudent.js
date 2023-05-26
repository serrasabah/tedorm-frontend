import AppBarForStudents from "./AppBarForStudent";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TEDORMmap from "./TEDORMmap.png";
import { CardMedia } from "@mui/material";
import * as React from 'react';

function MainPageForStudent() {
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
        </Box>
      </Box>
    </div>
  );
}
export default MainPageForStudent;
