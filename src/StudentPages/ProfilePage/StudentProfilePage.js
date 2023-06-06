import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import AppBarForStudents from "../AppBarForStudent";
import { AccountProfile } from "./AccountProfile";
import ViewDocuments from "../ViewDocuments";
import UploadFileForStudent from "./UploadFileForStudent";
import { StudentApi } from "../../api/StudentApi";

function StudentProfilePage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const studentApi = new StudentApi();

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await studentApi.getStudentById(id);
      setStudent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBarForStudents />
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="lg">
          {student && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <AccountProfile />
                <Card>
                  <CardHeader title="Files" />
                  <Divider />
                  <CardContent>
                    <ViewDocuments id={id} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Student Information" />
                  <Divider />
                  <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Name:
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {student.name}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Surname:
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {student.surname}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Email:
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {student.email}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Student Number:
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {student.studentNumber}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Birth Date:
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {student.age}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Room Number:
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {student.roomNumber}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        University:
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {student.university}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Phone Number:
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {student.phoneNumber}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
}

export default StudentProfilePage;
