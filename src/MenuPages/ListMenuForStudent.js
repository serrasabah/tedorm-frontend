import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { StudentApi } from "../api/StudentApi";
import AppBarForStudents from "../StudentPages/AppBarForStudent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box,} from "@mui/material";
import { MenuApi } from "../api/MenuApi";
import { useParams } from "react-router-dom";

function ListMenuForStudent() {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      editable: false,
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
      editable: true,
    },
    {
      field: "day",
      headerName: "Day",
      width: 110,
      editable: true,
    },
    {
      field: "meal",
      headerName: "Meal",
      width: 120,
      editable: false,
    },
    {
      field: "food",
      headerName: "Food",
      width: 200,
      editable: true,
    },
  ];

  const navigate = useNavigate();
  const [menu, setMenus] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const menuApi = new MenuApi();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [student, setStudent] = useState(null);
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
      } fetchStudent();
    }, [id]);

  useEffect(() => {
    getMenus();
  }, []);

  async function getMenus() {
    const response = await menuApi.getMenus();
    setMenus(response.data);
  }

  return (
    <div>
      <AppBarForStudents />
      <Container>
        <Box sx={{ width: "100%", m: "2rem", margin: "2rem auto 0"}}>
          <Stack direction="row" spacing={1}></Stack>
          <Box sx={{ height: 600, mt: 1 }}>
            <DataGrid
              sx={{
                ".MuiDataGrid-columnSeparator": {
                  display: "none",
                },
              }}
              orientation="vertical"
              slots={{ toolbar: GridToolbar }}
              rows={menu}
              columns={columns}
              disableSelectionOnClick
              selectionModel={selectionModel}
              hideFooterSelectedRowCount
              onSelectionModelChange={(selection) => {
                if (selection.length > 1) {
                  const selectionSet = new Set(selectionModel);
                  const result = selection.filter((s) => !selectionSet.has(s));

                  setSelectionModel(result);
                } else {
                  setSelectionModel(selection);
                }
              }}
            />
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default ListMenuForStudent;
