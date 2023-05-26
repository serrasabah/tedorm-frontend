

import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { AccountProfile } from './AccountProfile';
import { AccountProfileDetails } from './AccountProfileDetails';
import AppBarForStudents from '../AppBarForStudent';
import {  useState } from "react";
import { StudentApi } from "../../api/StudentApi";
import ViewDocuments from '../ViewDocuments';

import * as React from "react";
function StudentProfilePages() {

  const [student, setStudent] = useState([]);
  const studentApi = new StudentApi();

  async function getUser() {
    const response = await studentApi.getStudent();
    setStudent(response.data);
}

  return (
    <div>
      <AppBarForStudents />
      <title>
        Account
      </title>
      <Box
        component="main"
        sx={{ marginRight: 40, flexGrow: 1, py: 8 }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Account
              </Typography>
            </div>
            <div>
              <Grid
                container
                spacing={3}
              >
                <Grid xs={12} md={6} lg={4} >
                  <AccountProfile />
                </Grid>
                <Grid xs={12} md={6} lg={4} >
                  <ViewDocuments />
                </Grid>
                <Grid xs={12} md={6} lg={8} >
                  <AccountProfileDetails />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </div>
  );
}

export default StudentProfilePages;