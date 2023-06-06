import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import { Box } from "@mui/material";

import AppBarForAdmin from "../AdminPages/AppBarForAdmin";
import { AdminApi } from "../api/AdminApi";

function ListIslemGecmisi() {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      editable: false,
    },
    {
      field: "message",
      headerName: "Message",
      width: 1030,
      editable: false,
    },
  ];

  const navigate = useNavigate();
  const [admin, setAdmin] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const adminApi = new AdminApi();
  const theme = useTheme();

  useEffect(() => {
    getAdmin();
  }, []);

  async function getAdmin() {
    const response = await adminApi.getIslemGecmisi();
    console.log(response.data);
    setAdmin(response.data);
  }

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
        </Box>
      </Container>
    </div>
  );
}

export default ListIslemGecmisi;
