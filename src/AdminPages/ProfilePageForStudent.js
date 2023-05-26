import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { AccountProfileDetails } from "../StudentPages/ProfilePage/AccountProfileDetails";
import { AccountProfile } from "../StudentPages/ProfilePage/AccountProfile";
import AppBarForStudents from "../StudentPages/AppBarForStudent";
import { useState, useEffect } from "react";
import { StudentApi } from "../api/StudentApi";
import ViewDocuments from "../StudentPages/ViewDocuments";
import { useParams } from "react-router-dom";

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
                  <Grid xs={12} md={6} lg={4}>
                    <AccountProfile />
                  </Grid>
                  <Grid xs={12} md={6} lg={8}>
                    <div>
                      <Typography
                        variant="h6"
                        style={{
                          border: "0.5px solid 	#dcdcdc",
                          padding: "4px",
                          marginLeft: "50px",
                        }}
                      >
                        Name: {student.name}
                      </Typography>{" "}
                      <Typography
                        variant="h6"
                        style={{
                          border: "0.5px solid 	#dcdcdc",
                          padding: "4px",
                          marginLeft: "50px",
                        }}
                      >
                        Surname: {student.surname}
                      </Typography>{" "}
                      <Typography
                        variant="h6"
                        style={{
                          border: "0.5px solid 	#dcdcdc",
                          padding: "4px",
                          marginLeft: "50px",
                        }}
                      >
                        Email: {student.email}
                      </Typography>{" "}
                      <Typography
                        variant="h6"
                        style={{
                          border: "0.5px solid 	#dcdcdc",
                          padding: "4px",
                          marginLeft: "50px",
                        }}
                      >
                        Student Number: {student.studentNumber}
                      </Typography>{" "}
                      <Typography
                        variant="h6"
                        style={{
                          border: "0.5px solid 	#dcdcdc",
                          padding: "4px",
                          marginLeft: "50px",
                        }}
                      >
                        Age: {student.age}
                      </Typography>{" "}
                      <Typography
                        variant="h6"
                        style={{
                          border: "0.5px solid 	#dcdcdc",
                          padding: "4px",
                          marginLeft: "50px",
                        }}
                      >
                        Room Number: {student.roomNumber}
                      </Typography>{" "}
                      <Typography
                        variant="h6"
                        style={{
                          border: "0.5px solid 	#dcdcdc",
                          padding: "4px",
                          marginLeft: "50px",
                        }}
                      >
                        University: {student.university}
                      </Typography>{" "}
                      <Typography
                        variant="h6"
                        style={{
                          border: "0.5px solid 	#dcdcdc",
                          padding: "4px",
                          marginLeft: "50px",
                        }}
                      >
                        Phone Number: {student.phoneNumber}
                      </Typography>{" "}
                    </div>
                  </Grid>

                  <Grid xs={12} md={6} lg={6}>
                    <div>
                      <Typography variant="h4">Files</Typography>{" "}
                    </div>
                    <ViewDocuments id={id} />{" "}
                    {/* id prop'unu ViewDocuments bileşenine geçirin */}
                  </Grid>
                  <Grid xs={12} md={6} lg={8}>
                    <AccountProfileDetails />
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
