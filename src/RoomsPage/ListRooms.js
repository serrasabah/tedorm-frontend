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
import { RoomApi } from "../api/RoomApi";
import AppBarForAdmin from "../AdminPages/AppBarForAdmin";

function ListRooms() {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      editable: false,
    },
    {
      field: "roomType",
      headerName: "Room Type",
      width: 120,
      editable: true,
    },
    {
      field: "availableSlots",
      headerName: "Suitability of the room",
      width: 110,
      editable: true,
    },
    {
      field: "roomNumber",
      headerName: "Room Number",
      width: 120,
      editable: false,
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
            onClick={() => handleDeleteRooms(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon style={{ color: "purple" }} />}
            label="Accept"
            onClick={() => handleUpdateRooms(id)}
            // showInMenu
          />,
        ];
      },
    },
  ];

  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const roomApi = new RoomApi();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [textFieldValues, setTextFieldValues] = useState({
    roomType: 0,
    availableSlots: 0, // Default value for meal
    roomNumber: "",
  });
  const [updatetextFieldValues, setUpdateTextFieldValues] = useState({
    availableSlots: 0, // Default value for meal
    roomNumber: "",
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleUpdateRooms = (id) => {
    setSelectedId(id);
    setOpenUpdate(true);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setTextFieldValues((prevValues) => ({
      ...prevValues,
      roomType: value,
    }));
  };

  const handleChangeUpdate = (event) => {
    const value = event.target.value;
    setUpdateTextFieldValues((prevValues) => ({
      ...prevValues,
      roomType: value,
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

  async function addRooms(textFieldValues) {
    console.log(textFieldValues);
    const response = await roomApi.addRooms(textFieldValues);
    const messageResponse = response.data;
    if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
      setOpen(false);
      getRooms();
    } else {
      toast.error(messageResponse.message);
    }
  }

  const handleSaveRooms = async () => {
    if (isAnyTextFieldEmpty) {
      toast.error("Please fill in all fields");
      return;
    }

    await addRooms(textFieldValues);
  };

  async function updateRooms(updatetextFieldValues) {
    console.log(updatetextFieldValues);
    console.log(selectedId);
    const response = await roomApi.updateRooms(
      selectedId,
      updatetextFieldValues
    );
    const messageResponse = response.data;
    if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
      setOpenUpdate(false);
      getRooms(); // Menü ekledikten sonra güncel listeyi almak için getMenus işlevini çağırın
    } else {
      toast.error(messageResponse.message);
    }
  }

  const handleUpdateRoom = async () => {
    if (isAnyUpdateTextFieldEmpty) {
      toast.error("Please fill in all fields");
      return;
    }

    await updateRooms(updatetextFieldValues);
  };

  async function deleteRooms(selectedId) {
    try {
      const response = await roomApi.deleteRooms(selectedId);
      console.log(response.data.responseType); // Assuming the responseType is within response.data
      if (response.data.responseType === "SUCCESS") {
        toast.success(response.data.message);
        getRooms(); // Menüyü sildikten sonra güncel listeyi almak için getMenus işlevini çağırın
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
    getRooms();
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

  async function getRooms() {
    const response = await roomApi.getAllRooms();
    setRooms(response.data);
  }

  const handleDeleteRooms = (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  return (
    <div>
      <AppBarForAdmin />
      <Container>
        <Box sx={{ width: "55%",  margin: "2rem auto 0"}}>
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
              rows={rooms}
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
          <Button sx={{  mt: 3 }}variant="outlined" onClick={handleClickOpen}>
            Add Room
          </Button>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Add Room Information"}
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
                <Box>
                  <FormControl fullWidth sx={{ m: 0.5 }}>
                    <InputLabel id="demo-simple-select-label">
                      Room Type
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={textFieldValues.roomType}
                      label="roomType"
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>Single room</MenuItem>
                      <MenuItem value={2}>Double room</MenuItem>
                      <MenuItem value={4}>Quadruple Room</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <TextField
                  error={textFieldValues.availableSlots === ""}
                  id="outlined-error"
                  label="availableSlots"
                  value={textFieldValues.availableSlots}
                  onChange={(event) =>
                    handleTextFieldChange(event, "availableSlots")
                  }
                />
                <TextField
                  error={textFieldValues.roomNumber === ""}
                  id="outlined-error"
                  label="roomNumber"
                  value={textFieldValues.roomNumber}
                  onChange={(event) =>
                    handleTextFieldChange(event, "roomNumber")
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
                disabled={isAnyTextFieldEmpty}
                onClick={handleSaveRooms}
                autoFocus
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openDelete} onClose={handleClose}>
            <DialogTitle>Delete Room</DialogTitle>
            <DialogContent>
              Are you sure you want to delete the Room?
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => deleteRooms(selectedId)}
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
              {"Update Room Information"}
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
                  label="availableSlots"
                  value={updatetextFieldValues.availableSlots}
                  onChange={(event) =>
                    handleUpdateTextFieldChange(event, "availableSlots")
                  }
                />
                <TextField
                  id="outlined-error"
                  label="roomNumber"
                  value={updatetextFieldValues.roomNumber}
                  onChange={(event) =>
                    handleUpdateTextFieldChange(event, "roomNumber")
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
                onClick={handleUpdateRoom}
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

export default ListRooms;
