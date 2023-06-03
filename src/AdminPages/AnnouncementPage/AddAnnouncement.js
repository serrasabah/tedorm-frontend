import * as React from "react";
import { useRef } from "react";
import {
  Button,
  CardMedia,
  CssBaseline,
  FormControl,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AppBarForAdmin from "../AppBarForAdmin";
import { UserApi } from "../../api/UserApi";
import { AnnouncementApi } from "../../api/AnnouncementApi";
import AnnouncementIcon from "./AnnouncementIcon.png";

export default function AddAnnouncement() {
  const announcementApi = new AnnouncementApi();
  const adminApi = new UserApi();
  const [admin, setAdmin] = useState(null);
  const { id } = useParams();

  const textFieldRef = useRef();

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
      setFormState({});
      textFieldRef.current.value = "";
    }
  }

  const theme = createTheme();

  return (
    <div>
      <AppBarForAdmin />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ mb: 3, fontFamily: "Arial", fontWeight: "bold", fontSize: "2rem" }}
            >
              Create Announcement
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Grid item xs={12} md={7}>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    mt: 5,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          inputRef={textFieldRef}
                          onChange={onInputChange}
                          name="announcement"
                          id="outlined-multiline-static"
                          label="Enter Announcement"
                          multiline
                          rows={10}
                          maxRows={15}
                          variant="outlined"
                          inputProps={{ maxLength: 500 }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                          {formState.announcement ? formState.announcement.length : 0}/500 characters
                        </Typography>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Button
                    onClick={() => addAnnouncement(formState)}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!formState.announcement}
                  >
                    Publish Announcement
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: "auto",
                  }}
                  image={AnnouncementIcon}
                  alt="Announcement Icon"
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
