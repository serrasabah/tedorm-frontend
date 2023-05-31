import React from 'react';
import { Box, Button, Grid } from "@mui/material";
import { Email, Instagram, OpenInNew, WhatsApp } from "@mui/icons-material";

const SocialMediaLinks = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <Button
                startIcon={<OpenInNew />}
                variant="contained"
                color="primary"
                href="https://yurtlar.tedu.edu.tr"
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                Internet Sitesi
              </Button>
            </Grid>
            <Grid item>
              <Button
                startIcon={<Instagram />}
                variant="contained"
                color="primary"
                href="https://www.instagram.com/teduyurtlar/"
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                Instagram
              </Button>
            </Grid>
            <Grid item>
              <Button
                startIcon={<WhatsApp />}
                variant="contained"
                color="primary"
                href="https://api.whatsapp.com/send?phone=+903125850200"
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                WhatsApp
              </Button>
            </Grid>
            <Grid item>
              <Button
                startIcon={<Email />}
                variant="contained"
                color="primary"
                href="mailto:yurt@tedu.edu.tr"
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                E-mail
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SocialMediaLinks;