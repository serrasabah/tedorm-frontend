import * as React from "react";
import {
  Box,
  Container, Card,
  CardContent,
  Stack,
  Typography, Divider,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { AccountProfileDetails } from "../StudentPages/ProfilePage/AccountProfileDetails";
import { AccountProfile } from "../StudentPages/ProfilePage/AccountProfile";
import AppBarForStudents from "../StudentPages/AppBarForStudent";
import { useState, useEffect } from "react";
import { StudentApi } from "../api/StudentApi";
import ViewDocuments from "../StudentPages/ViewDocuments";
import { useParams } from "react-router-dom";
import { DeleteStudent } from "../StudentPages/ProfilePage/DeleteStudent";
import { ChangePassword } from "../StudentPages/ProfilePage/ChangePassword";

function ProfilePageForStudent() {
  const [student, setStudent] = useState(null); // Öğrenci verisi için state tanımlayın
  const studentApi = new StudentApi();

  const { id } = useParams();

  useEffect(() => {
    // Component yüklendiğinde öğrenci verisini almak için useEffect kullanın
    async function fetchStudent() {
      try {
        const response = await studentApi.getStudentById(id); // Spring Boot'tan öğrenci verisini alın
        setStudent(response.data); // Veriyi state'e kaydedin
      } catch (error) {
        console.log(error);
      }
    }

    fetchStudent();
  }, [id]);

  return (
    <div>
      <AppBarForStudents />
      <title>Account</title>
      {student && ( // Eğer öğrenci verisi varsa, kullanabilirsiniz
        <Box component="main" sx={{ marginRight: 20, flexGrow: 1, py: 8 }}>
          <Container maxWidth="lg">
            <Stack spacing={3}>
              <div>
                <Typography variant="h4">{student.name}</Typography>{" "}
                {/* Öğrenci adını kullanın */}
              </div>
              <div>
                <Grid container spacing={3}>
                  <Grid xs={15} md={15} lg={4}>
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
                            <Box m={0.5}>
                              <Typography fontFamily="Arial" variant="h6">
                                Name: {student.name}
                              </Typography>
                            </Box>
                            <Divider />
                            <Box m={0.5}>
                              <Typography variant="h6">
                                Surname: {student.surname}
                              </Typography>
                            </Box>
                            <Divider />
                            <Box m={0.5}>
                              <Typography variant="h6">
                                Email: {student.email}
                              </Typography>
                            </Box>
                            <Divider />
                            <Box m={0.5}>
                              <Typography variant="h6">
                                Student Number: {student.studentNumber}
                              </Typography>
                            </Box>
                            <Divider />
                            <Box m={0.5}>
                              <Typography variant="h6">
                                Age: {student.age}
                              </Typography>
                            </Box>
                            <Divider />
                            <Box m={0.5}>
                              <Typography variant="h6">
                                Room Number: {student.roomNumber}
                              </Typography>
                            </Box>
                            <Divider />
                            <Box m={0.5}>
                              <Typography variant="h6">
                                University: {student.university}
                              </Typography>
                            </Box>
                            <Divider />
                            <Box m={0.5}>
                              <Typography variant="h6">
                                Phone Number: {student.phoneNumber}
                              </Typography>
                            </Box>
                          </div>
                        </Box>
                      </CardContent>
                    </Card>
                    <Divider />
                    <div style={{ display: "flex", padding: '10px' }}>
                      <DeleteStudent student={student} />
                    </div>
                  </Grid>
                  <Grid xs={12} md={6} lg={6}>
                    <div>
                      <Typography variant="h4">Files</Typography>{" "}
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

export default ProfilePageForStudent;
