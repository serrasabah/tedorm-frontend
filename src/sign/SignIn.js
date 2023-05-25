import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoginApi } from "../api/LoginApi";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ApplicantPage from "../AplicantPage/ApplicantPage";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {ApplicantApi }from "../api/ApplicantApi";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const applicantApi = new ApplicantApi();
  const loginApi = new LoginApi();
  const [formState, setFormState] = useState({});
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [isAddApplicantModalOpen, setAddApplicantModalOpen] = useState(false);
  
  async function addApplicant(formState) {
    const response = (await applicantApi.addApplicant(formState)).data;
    if (response.responseType === "SUCCESS") {
      toast.success(response.message);
      setAddApplicantModalOpen(false);
    }
  }

  function onUserInputChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    const newState = { ...formState };
    newState[field] = value;
    setUsername(value);
    setFormState(newState);
  }

  function onPasswordInputChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    const newState = { ...formState };
    newState[field] = value;
    setPassword(value);
    setFormState(newState);
  }

  async function login(event) {
    console.log("formstate" + formState);
    event.preventDefault();
    if (!formState.username || !formState.password) {
      toast.warning("Boş geçilemez");
    } else {
      const response = await loginApi.login(formState);
      const messageResponse = response.data;
      console.log(formState);

      if (messageResponse.responseType === "SUCCESS") {
        toast.success(messageResponse.message);
        window.localStorage.setItem("username", username);
        const name = username.toUpperCase();
        console.log(name);
        navigate("/MainPageForStudent", { state: { name: name } });
      } else {
        toast.error(messageResponse.message);
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={onUserInputChange}
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onPasswordInputChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={login}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Button sx={{ m: 1 }} variant="outlined" onClick={() => setAddApplicantModalOpen(true)}>Add Applicant <AddBoxIcon /></Button>
              <ApplicantPage isOpen={isAddApplicantModalOpen} close={() => setAddApplicantModalOpen(false)} submit={addApplicant} />

              <Grid item>
                <Link href="" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>



          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
