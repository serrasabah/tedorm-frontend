import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import DialogContentText from "@mui/material/DialogContentText";
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
import { AdminApi } from "../api/AdminApi";

function ListAdmin() {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      editable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 220,
      editable: false,
    },
    {
      field: "surname",
      headerName: "Surname",
      width: 220,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
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
  const [admin, setAdmin] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const adminApi = new AdminApi();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [textFieldValues, setTextFieldValues] = useState({});
  const [updatetextFieldValues, setUpdateTextFieldValues] = useState({});

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

  async function addAdmin(textFieldValues) {
    console.log(textFieldValues);
    const response = await adminApi.addAdmin(textFieldValues);
    const messageResponse = response.data;
    if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
      setOpen(false);
      getAdmin();
    } else {
      toast.error(messageResponse.message);
    }
  }
  const handleSaveMenu = async () => {
    if (isAnyTextFieldEmpty) {
      toast.error("Please fill in all fields");
      return;
    }

    await addAdmin(textFieldValues);
  };

  async function updateAdmin(updatetextFieldValues) {
    const response = await adminApi.updateAdmin(
      selectedId,
      updatetextFieldValues
    );
    const messageResponse = response.data;
    if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
      setOpenUpdate(false);
      getAdmin();
    } else {
      toast.error(messageResponse.message);
    }
  }

  const handleUpdateAdmin = async () => {
    if (isAnyUpdateTextFieldEmpty) {
      toast.error("Please fill in all fields");
      return;
    }
    await updateAdmin(updatetextFieldValues);
  };

  async function deleteAdmin(selectedId) {
    try {
      const response = await adminApi.deleteAdmin(selectedId);
      if (response.data.responseType === "SUCCESS") {
        toast.success(response.data.message);
        getAdmin();
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
    getAdmin();
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

  async function getAdmin() {
    const response = await adminApi.getAdmin();
    console.log(response.data);
    setAdmin(response.data);
  }

  const handleDeleteMenu = (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  return (
    <div>
      <AppBarForAdmin />
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
              rows={admin}
              columns={columns}
              disableSelectionOnClick
              selectionModel={selectionModel}
              hideFooterSelectedRowCount
              onSelectionModelChange={(selection) => {
                if (selection.length > 1) {
                  const selectionSet = new Set(selectionModel);
                  const result = selection.filter((s) => !selectionSet.has(s));

                  setSelectionModel(result);
                  console.log(selectionModel);
                } else {
                  setSelectionModel(selection);
                  console.log(selectionModel);
                }
              }}
            />
          </Box>
          <Button sx={{ mt: 3 }} variant="outlined" onClick={handleClickOpen}>
            Add an Admin
          </Button>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Add Admin Information"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
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
                    error={textFieldValues.name === ""}
                    id="outlined-error"
                    label="Name"
                    value={textFieldValues.name}
                    onChange={(event) => handleTextFieldChange(event, "name")}
                  />
                  <TextField
                    error={textFieldValues.surname === ""}
                    id="outlined-error-helper-text"
                    label="Surname"
                    value={textFieldValues.surname}
                    onChange={(event) =>
                      handleTextFieldChange(event, "surname")
                    }
                  />
                  <TextField
                    error={textFieldValues.email === ""}
                    id="outlined-error-helper-text"
                    label="Email"
                    value={textFieldValues.email}
                    onChange={(event) => handleTextFieldChange(event, "email")}
                  />
                  <TextField
                    error={textFieldValues.password === ""}
                    id="outlined-error-helper-text"
                    label="Password"
                    value={textFieldValues.password}
                    onChange={(event) =>
                      handleTextFieldChange(event, "password")
                    }
                  />
                </Box>
              </DialogContentText>
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
            <DialogTitle>Delete Admin</DialogTitle>
            <DialogContent>
              Are you sure you want to delete the admin?
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => deleteAdmin(selectedId)}
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
                  label="email"
                  value={updatetextFieldValues.email}
                  onChange={(event) =>
                    handleUpdateTextFieldChange(event, "email")
                  }
                />
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
                onClick={handleUpdateAdmin}
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

export default ListAdmin;
