import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from "@mui/material";

const font =  "'Source Serif Pro', serif";

const WelcomeMessage = ({ user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4" fontFamily={font} sx={{ fontWeight: 'bold' }}>
            Welcome, {user && user.username}!
          </Typography>
        </Grid>
        <Grid item>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="subtitle1" fontFamily={font}>
              Date: {currentDate.toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1" fontFamily={font}>
              Time: {currentDate.toLocaleTimeString()}
            </Typography>
          </Box>
        </Grid>
      </Grid>
  );
};

export default WelcomeMessage;