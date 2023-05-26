import * as React from "react";
import { DataGrid , GridToolbar} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import { AddPermissionApi } from "../../api/AddPermissionApi";
import AppBarForAdmin from "../AppBarForAdmin";
import { Container, IconButton, useMediaQuery, Box, Stack, useTheme} from "@mui/material";

function ListPermissions() {
    const [selectionModel, setSelectionModel] = useState();
    const [students, setStudents] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const permissionApi = new AddPermissionApi();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    useEffect(() => {
        getPermissions();
    }, []);

    async function getPermissions() {
        //   const response = await permissionApi.getPermissions();
        //   console.log(response);
        //   setPermissions(response.data);
        const response = await permissionApi.getPermissions();
        const formattedPermissions = response.data.map((permission, index) => ({
            ...permission,
            id: index + 1, // Assigning a unique id to each permission
        }));
        setPermissions(formattedPermissions);
    }

    async function deleteCell(e) {
        e.preventDefault();
        const response = (await permissionApi.deletePermissions(selectionModel)).data;
        if (response.responseType === "SUCCESS") {
            toast.success(response.message);
            setPermissions((r) => r.filter((x) => !x.id === selectionModel));
            await getPermissions();
        }
        else {
            toast.error(response.message);
        }
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
            headerName: "ID",
            width: 100,
            editable: false,
        },
        {
            field: "permissionDateStart",
            headerName: "Start Date",
            width: 150,
        },
        {
            field: "permissionDateEnd",
            headerName: "End Date",
            width: 150,
        },
        {
            field: "message",
            headerName: "Message",
            width: 150,
        },


        {
            field: "delete",
            width: 75,
            disableColumnMenu: true,
            renderHeader: () => {
                return (
                    <IconButton onClick={deleteCell} >
                        <DeleteIcon color="primary" />
                    </IconButton>
                );
            }
        }

    ];
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
                            rows={students}
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
export default ListPermissions;