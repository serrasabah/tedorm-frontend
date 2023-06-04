import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
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
import AppBarForAdmin from "../AdminPages/AppBarForAdmin";

function ListMenu() {
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
      width: 600,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon style={{ color: "red" }} />}
            label="Show"
            onClick={() => handleDeleteMenu(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon style={{ color: "purple" }} />}
            label="Accept"
            onClick={() => handleUpdateMenu(id)}
            // showInMenu
          />,
        ];
      },
    },
  ];

  const navigate = useNavigate();
  const [menu, setMenus] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const menuApi = new MenuApi();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [textFieldValues, setTextFieldValues] = useState({
    date: "",
    meal: 0, // Default value for meal
    food: "",
  });
  const [updatetextFieldValues, setUpdateTextFieldValues] = useState({
    meal: 0, // Default value for meal
    food: "",
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleUpdateMenu = (id) => {
    setSelectedId(id);
    setOpenUpdate(true);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setTextFieldValues((prevValues) => ({
      ...prevValues,
      meal: value,
    }));
  };

  const handleChangeUpdate = (event) => {
    const value = event.target.value;
    setUpdateTextFieldValues((prevValues) => ({
      ...prevValues,
      meal: value,
    }));
  };

  const handleTextFieldChange = (event, fieldName) => {
    let value = event.target.value;

    setTextFieldValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleUpdateTextFieldChange = (event, fieldName) => {
    let value = event.target.value;

    setUpdateTextFieldValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  async function addMenus(textFieldValues) {
    console.log(textFieldValues);
    const response = await menuApi.addMenu(textFieldValues);
    const messageResponse = response.data;
    if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
      setOpen(false);
      getMenus(); // Menü ekledikten sonra güncel listeyi almak için getMenus işlevini çağırın
    } else {
      toast.error(messageResponse.message);
    }
  }

  const handleSaveMenu = async () => {
    if (isAnyTextFieldEmpty) {
      toast.error("Please fill in all fields");
      return;
    }

    await addMenus(textFieldValues);
  };

  async function updateMenus(updatetextFieldValues) {
    console.log(updatetextFieldValues);
    console.log(selectedId);
    const response = await menuApi.updateMenu(
      selectedId,
      updatetextFieldValues
    );
    const messageResponse = response.data;
    if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
      setOpenUpdate(false);
      getMenus(); // Menü ekledikten sonra güncel listeyi almak için getMenus işlevini çağırın
    } else {
      toast.error(messageResponse.message);
    }
  }

  const handleUpdateMenus = async () => {
    if (isAnyUpdateTextFieldEmpty) {
      toast.error("Please fill in all fields");
      return;
    }

    await updateMenus(updatetextFieldValues);
  };

  async function deleteMenu(selectedId) {
    try {
      const response = await menuApi.deleteMenu(selectedId);
      console.log(response.data.responseType); // Assuming the responseType is within response.data
      if (response.data.responseType === "SUCCESS") {
        toast.success(response.data.message);
        getMenus(); // Menüyü sildikten sonra güncel listeyi almak için getMenus işlevini çağırın
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
    setOpenDelete(false);
  }

  useEffect(() => {
    getMenus();
  }, []);

  const isAnyTextFieldEmpty = Object.values(textFieldValues).some(
    (value) => value === ""
  );

  const isAnyUpdateTextFieldEmpty = Object.values(updatetextFieldValues).some(
    (value) => value === ""
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setOpenUpdate(false);
  };

  async function getMenus() {
    const response = await menuApi.getAllMenus();
    setMenus(response.data);
  }

  const handleDeleteMenu = (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  return (
    <div>
      <AppBarForAdmin />
      <Container>
        <Box sx={{ width: "105%", margin: "2rem auto 0"}}>
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
          <Button    sx={{ m: 4, }} variant="outlined" onClick={handleClickOpen}>
            Add Menu
          </Button>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Add Menu Information"}
            </DialogTitle>
            <DialogContent>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    width: "59ch",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  error={textFieldValues.food === ""}
                  id="outlined-error"
                  label="food"
                  value={textFieldValues.food}
                  onChange={(event) => handleTextFieldChange(event, "food")}
                />
                <TextField
                  error={textFieldValues.date === ""}
                  id="outlined-error"
                  label="date"
                  value={textFieldValues.date}
                  type="date"
                  onChange={(event) => handleTextFieldChange(event, "date")}
                />
                <Box>
                  <FormControl fullWidth sx={{ m: 0.5 }}>
                    <InputLabel id="demo-simple-select-label">Meal</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={textFieldValues.meal}
                      label="Meal"
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>Breakfast</MenuItem>
                      <MenuItem value={1}>Dinner</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={isAnyTextFieldEmpty}
                onClick={handleSaveMenu}
                autoFocus
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openDelete} onClose={handleClose}>
            <DialogTitle>Delete Menu</DialogTitle>
            <DialogContent>
              Are you sure you want to delete the menu?
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => deleteMenu(selectedId)}
              >
                Delete
              </Button>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            fullScreen={fullScreen}
            open={openUpdate}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Update Menu Information"}
            </DialogTitle>
            <DialogContent>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    width: "59ch",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-error"
                  label="food"
                  value={updatetextFieldValues.food}
                  onChange={(event) =>
                    handleUpdateTextFieldChange(event, "food")
                  }
                />
                <Box>
                  <FormControl fullWidth sx={{ m: 0.5 }}>
                    <InputLabel id="demo-simple-select-label">Meal</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={updatetextFieldValues.meal}
                      label="Meal"
                      onChange={handleChangeUpdate}
                    >
                      <MenuItem value={0}>Breakfast</MenuItem>
                      <MenuItem value={1}>Dinner</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={isAnyUpdateTextFieldEmpty}
                onClick={handleUpdateMenus}
                autoFocus
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </div>
  );
}

export default ListMenu;
