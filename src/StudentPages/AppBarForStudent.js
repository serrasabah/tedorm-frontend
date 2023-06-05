import * as React from 'react';
import { AppBar, Toolbar, Typography, Tooltip, Avatar, Menu, MenuItem, Box } from '@mui/material';
import RoomIcon from "@mui/icons-material/Room";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AppBarForStudents() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    navigate(`/StudentProfilePage/${id}`);
    handleCloseUserMenu();
  };

  const handleLogOutClick = () => {
    window.localStorage.clear();
    navigate("/");
    handleCloseUserMenu();
  };

  const pages = ["Home Page", "Menu", "Announcement","Add Request", "Take Permission"];
  const links = [`/MainPageForStudent/${id}`, `/ListMenuForStudent/${id}`, `/ListAnnouncement/${id}`,`/AddRequest/${id}` ,`/PermissionFormForStudents/${id}`];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#012169' }}>
        <Toolbar>
          <RoomIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, userSelect: 'none', fontWeight: 'bold', }}>
            TEDORM
          </Typography>
          <Box sx={{ flexGrow: 50, display: 'flex', justifyContent: 'center' }}>
            {pages.map((page, index) => (
              <Typography
                variant="h6"
                component="div"
                sx={{
                  marginLeft: 0.5,
                  marginRight: 0.5,
                  color: 'white',
                  backgroundColor: selectedItem === index ? '#011950' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#011950',
                  },
                  padding: 3,
                  borderRadius: 0,
                  userSelect: 'none',
                  opacity: 0.8,
                }}
                onMouseEnter={() => setSelectedItem(index)}
                onMouseLeave={() => setSelectedItem(null)}
                onClick={() => navigate(links[index])}
              >
                {page}
              </Typography>
            ))}
          </Box>
          <Tooltip title="Open settings">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/2.jpg"
              onClick={handleOpenUserMenu}
              sx={{
                cursor: 'pointer',
                marginLeft: 2,
              }}
            />
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            sx={{ marginTop: '25px' }}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleLogOutClick}>Log Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

export default AppBarForStudents;