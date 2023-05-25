import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { ApplicantApi } from "../../api/ApplicantApi";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function ListApplicant() {
    const [selectionModel, setSelectionModel] = useState();
    const [applicant, setApplicant] = useState([]);
    const applicantApi = new ApplicantApi();

    useEffect(() => {
        getApplicant().then(r => { });
    }, []);

    async function getApplicant() {
        const response = await applicantApi.applicant();
        setApplicant(response.data);
    }

    async function deleteCell(e) {
        e.preventDefault();
        const response = (await applicantApi.deleteApplicant(selectionModel)).data;
        if (response.responseType === "SUCCESS") {
            toast.success(response.message);
            setApplicant((r) => r.filter((x) => !x.id === selectionModel));
            await getApplicant();
        }
        else {
            toast.error(response.message);
        }
    }

    async function updateCell(params, newValue) {
        const applicantIndex = applicant.findIndex(lecture => {
            return applicant.id === params.id;
        });
        const updateApplicant = [...applicant];
        updateApplicant[applicantIndex][params.field] = newValue;
        setApplicant(updateApplicant)
        const id = params.id;
        const response = (await applicantApi.updateApplicant(id, updateApplicant[applicantIndex])).data;
        toast.success(response);
    }
    const columns = [

        {
            field: "name",
            headerName: "Applicant name",
            width: 150,
            editable: true,
        },
        {
            field: "surname",
            headerName: "Applicant Surname",
            width: 150,
            editable: true,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            width: 150,
            editable: true,
        },
        {
            field: "email",
            headerName: "Mail",
            width: 150,
            editable: true,
        },
        {
            field: "address",
            headerName: "Address",
            width: 150,
            editable: true,
        },
        {
            field: "university",
            headerName: "University Name",
            width: 150,
            editable: true,
        },
        {
            field: "roomType",
            headerName: "Room Type",
            width: 150,
            editable: true,
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
                    width: "95vh",
                    margin: "auto",
                    padding: "auto",
                }}
            >
                <DataGrid
                    rows={applicant}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    onCellEditStop={(params, event) => updateCell(params, event.target.value)}
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
export default ListApplicant;