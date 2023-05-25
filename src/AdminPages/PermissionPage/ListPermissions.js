import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { AddPermissionApi } from "../../api/AddPermissionApi";

function ListPermissions() {
    const [selectionModel, setSelectionModel] = useState();
    const [permissions, setPermissions] = useState([]);
    const permissionApi = new AddPermissionApi();

    useEffect(() => {
        getPermissions().then(r => { });
    }, []);

    async function getPermissions() {
        const response = await permissionApi.getPermissions();
        console.log(response);
        setPermissions(response.data);
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



    const columns = [

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
        <div className="list">
            <Box
                sx={{
                    height: "450px",
                    width: "77vh",
                    margin: "auto",
                    padding: "auto",
                }}
            >
                <DataGrid
                    rows={permissions}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                   // onCellEditStop={(params, event) => updateCell(params, event.target.value)}
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
        </div>
    );
}
export default ListPermissions;