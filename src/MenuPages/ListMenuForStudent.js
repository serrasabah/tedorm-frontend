import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { StudentApi } from "../api/StudentApi";
import AppBarForStudents from "../StudentPages/AppBarForStudent";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { MenuApi } from "../api/MenuApi";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

function ListMenuForStudent() {
  const columns = [
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
      width: 520,
      editable: true,
    },
    {
      field: "puan",
      headerName: "Rating",
      width: 80,
      editable: true,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 200,
      editable: true,
      renderCell: (params) => (
        <Rating
          name={`rating-${params.row.id}`}
          value={params.row.rating || 0}
          precision={0.5}
          onChange={(event, newValue) =>
            handleRatingChange(event, newValue, params)
          }
        />
      ),
    },
    //
  ];

  const navigate = useNavigate();
  const [value, setValue] = React.useState(2);
  const [menu, setMenus] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [ratedMenus, setRatedMenus] = useState([]);
  const menuApi = new MenuApi();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [student, setStudent] = useState(null);
  const studentApi = new StudentApi();
  const [ratingTrigger, setRatingTrigger] = useState(false);
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

  useEffect(() => {
    getMenus();
    loadRatedMenus();
  }, []);

  async function getMenus() {
    const response = await menuApi.getMenus();
    setMenus(response.data);
  }

  function loadRatedMenus() {
    const ratedMenusFromStorage = localStorage.getItem("ratedMenus");
    if (ratedMenusFromStorage) {
      setRatedMenus(JSON.parse(ratedMenusFromStorage));
    }
  }

  function saveRatedMenus() {
    localStorage.setItem("ratedMenus", JSON.stringify(ratedMenus));
  }

  const handleRatingChange = async (event, newValue, params) => {
    // Make an API call to update the rating value in the backend
    try {
      await axios.post(`/menus/rating/${params.row.id}`, {
        puan: newValue,
        studentId: id,
      });
      toast.success("Rating updated successfully");
      console.log("Rating updated successfully in the backend");
      setRatedMenus((prevRatedMenus) => [...prevRatedMenus, params.row.id]);
      saveRatedMenus();
      setRatingTrigger(true); // Tetikleyici state'i güncelle
    } catch (error) {
      toast.error("Student has already given a rating for this menu.");
    }
  };
  useEffect(() => {
    if (ratingTrigger) {
      window.location.reload(); // Sayfayı yenile
      setRatingTrigger(false); // Tetikleyici state'i sıfırla
    }
  }, [ratingTrigger]);
  return (
    <div>
      <AppBarForStudents />
      <Container>
        <Box sx={{ width: "100%", m: "2rem" }}>
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
