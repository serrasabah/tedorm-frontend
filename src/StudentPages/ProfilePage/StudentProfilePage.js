import {
  Box, Card, CardContent, Divider,
  Container, Stack, Typography, Unstable_Grid2 as Grid
} from '@mui/material';
import { AccountProfile } from './AccountProfile';
import AppBarForStudents from '../AppBarForStudent';
import { useState, useEffect } from "react";
import { StudentApi } from "../../api/StudentApi";
import ViewDocuments from '../ViewDocuments';
import { useParams } from "react-router-dom";
import * as React from "react";
function StudentProfilePage() {

  const [student, setStudent] = useState(null);
  const studentApi = new StudentApi();

  async function getUser() {
    const response = await studentApi.getStudent();
    setStudent(response.data);
  }
  const { id } = useParams();

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await studentApi.getStudentById(id); 
        setStudent(response.data); 
      } catch (error) {
        console.log(error);
      }
    } fetchStudent();
  }, [id]);

  return (
    <div>
      <AppBarForStudents />
      <title>
        Account
      </title>
      {student && (
        <Box component="main" sx={{ marginRight: 20, flexGrow: 1, py: 8 }}>
          <Container maxWidth="lg">
            <Stack spacing={3}>
              <div>
                <Typography   variant="h4">{student.name}</Typography>
              </div>
              <div>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6} lg={4}>
                    <AccountProfile />
                  </Grid>
                  <Grid xs={12} md={6} lg={5}>
                    <Card>
                      <CardContent>
                        <Box
                          sx={{
                          
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div>
                            <Typography fontFamily= "Arial" variant="h6" >
                              Name: {student.name}
                            </Typography>
                            <Divider />
                            <Typography variant="h6" >
                              Surname: {student.surname}
                            </Typography>
                            <Divider />
                            <Typography variant="h6" >
                              Email: {student.email}
                            </Typography>
                            <Divider />
                            <Typography variant="h6" >
                              Student Number: {student.studentNumber}
                            </Typography>
                            <Divider />
                            <Typography variant="h6" >
                              Age: {student.age}
                            </Typography>
                            <Divider />
                            <Typography variant="h6" >
                              Room Number: {student.roomNumber}
                            </Typography>
                            <Divider />
                            <Typography variant="h6" >
                              University: {student.university}
                            </Typography>
                            <Divider />
                            <Typography variant="h6" >
                              Phone Number: {student.phoneNumber}
                            </Typography>
                          </div>
                        </Box>
                      </CardContent>
                      <Divider />
                    </Card>
                  </Grid>

                  <Grid xs={12} md={6} lg={6}>
                    <div>
                      <Typography variant="h4">Files</Typography>
                    </div>
                    <ViewDocuments id={id} />
                  </Grid>
                  
                </Grid>
              </div>
            </Stack>
          </Container>
        </Box>
      )}
    </div>
  );
}

export default StudentProfilePage;