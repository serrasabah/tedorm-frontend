import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { AddPermissionApi } from "../../api/AddPermissionApi";
import AppBarForAdmin from "../AppBarForAdmin";
import { Container, useMediaQuery, Box, Stack, useTheme } from "@mui/material";
import { AddAddressApi } from "../../api/AddAddressApi";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
function ListPermissions() {
  const [selectionModel, setSelectionModel] = useState();
  const [permissions, setPermissions] = useState([]);
  const permissionApi = new AddPermissionApi();
  const addAddressApi = new AddAddressApi();
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const theme = useTheme();
  const [admin, setAdmin] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    getPermissions();
  }, []);

  async function getPermissions() {
    const response = await permissionApi.getPermissions();
    setPermissions(response.data);
  }

  async function getAddressRow() {
    const response = await addAddressApi.getAddress(); // Call the addAddress method from the API
    const newAddress = response.data; // Get the newly added address
    setPermissions(newAddress); // Add the new address to the permissions state
  }

  async function deleteCell(selectedId) {
    try {
      const response = await permissionApi.deletePermissions(selectedId);

      if (response.data.responseType === "SUCCESS") {
        toast.success(response.data.message);
        getAdmin();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
    setOpenDelete(false);
  }
  useEffect(() => {
    getAdmin();
  }, []);
  const handleDeleteMenu = (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setOpenUpdate(false);
  };
  async function getAdmin() {
    const response = await permissionApi.getPermissions();
    setAdmin(response.data);
  }
  const [textFieldValues, setTextFieldValues] = useState({
    name: "",
    surname: "",
  });

  const handleTextFieldChange = (event, fieldName) => {
    let value = event.target.value;
    setTextFieldValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const columns = [
    {
      field: "id",
      headerName: "Number",
      width: 80,
      editable: false,
    },
    {
      field: "permissionDateStart",
      headerName: "Start Date",
      width: 170,
    },
    {
      field: "permissionDateEnd",
      headerName: "End Date",
      width: 170,
    },
    {
      field: "name",
      headerName: "Student",
      width: 150,
    },
    {
      field: "message",
      headerName: "Message",
      width: 450,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Delete",
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
        ];
      },
    },
  ];
  return (
    <div>
      <AppBarForAdmin />
      <Container>
        <Box sx={{ width: "100%", m: "2rem auto 0" }}>
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
              rows={permissions}
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
          <Dialog open={openDelete} onClose={handleClose}>
            <DialogTitle>Delete permission</DialogTitle>
            <DialogContent>
              Are you sure you want to delete the permission?
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => deleteCell(selectedId)}
              >
                Delete
              </Button>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </div>
  );
}
export default ListPermissions;
