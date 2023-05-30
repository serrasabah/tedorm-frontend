
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import RoomIcon from "@mui/icons-material/Room";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import StudentProfilePages from "./ProfilePage/StudentProfilePage";

import { UserApi } from "../api/UserApi";

function AppBarForStudents() {
  
const [user, setUser] = useState(null); // Öğrenci verisi için state tanımlayın
const userApi = new UserApi();

const { id } = useParams();
const pages = ["Home Page", "Menu", "Request", "Announcement"];
const settings = ["Profile", "Logout"];
const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fff",
    },
  },
});

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
  const navigate = useNavigate();
  const handleProfileClick = (setting) => {
    if (setting === "Logout") {
      navigate(`/`); // Redirect to the sign-in page
    } else {
      navigate(`/StudentProfilePage/${id}`);
    }
    handleCloseUserMenu();
  };
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <RoomIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 900,
                  letterSpacing: ".3rem",
                  color: "grey",
                  textDecoration: "none",
                }}
              >
                TEDORM
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/MainPageForStudent"
                sx={{
                  mr: 3,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "arial",
                  fontWeight: 100,
                  letterSpacing: ".1rem",
                  color: "grey",
                  textDecoration: "none",
                }}
              >
                Home Page
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/ListMenuForStudent"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "arial",
                  fontWeight: 100,
                  letterSpacing: ".1rem",
                  color: "grey",
                  textDecoration: "none",
                }}
              >
                Menu
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/ListAnnouncement"
                sx={{
                  mr: 3,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "arial",
                  fontWeight: 100,
                  letterSpacing: ".1rem",
                  color: "grey",
                  textDecoration: "none",
                }}
              >
                Announcement
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/PermissionFormForStudents"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "arial",
                  fontWeight: 100,
                  letterSpacing: ".1rem",
                  color: "grey",
                  textDecoration: "none",
                }}
              >
                Take Permission
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="black"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" href="/Pre-registration">
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <RoomIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "grey",
                  textDecoration: "none",
                }}
              >
                TEDORM
              </Typography>

              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              ></Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleProfileClick}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
}
export default AppBarForStudents;
