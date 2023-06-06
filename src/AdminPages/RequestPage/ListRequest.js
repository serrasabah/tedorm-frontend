import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
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
import { RequestApi } from "../../api/RequestApi";
function ListRequest() {
  const [selectionModel, setSelectionModel] = useState();
  const [requests, setRequests] = useState([]);
  const requestApi = new RequestApi();
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const theme = useTheme();
  const [admin, setAdmin] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    getRequests();
  }, []);

  async function getRequests() {
    const response = await requestApi.getRequest();
    setRequests(response.data);
  }
  async function deleteCell(selectedId) {
    try {
      const response = await requestApi.deleteRequest(selectedId);
console.log(response);
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
    const response = await requestApi.getRequest();
    setAdmin(response.data);
  }

  const columns = [
    {
      field: "id",
      headerName: "Number",
      width: 130,
      editable: false,
    },
    {
      field: "name",
      headerName: "Student",
      width: 180,
    },
    {
      field: "message",
      headerName: "Request",
      width: 700,
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
              rows={requests}
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
          <Dialog open={openDelete} onClose={handleClose}>
            <DialogTitle>Delete request</DialogTitle>
            <DialogContent>
              Are you sure you want to delete the request?
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
export default ListRequest;
