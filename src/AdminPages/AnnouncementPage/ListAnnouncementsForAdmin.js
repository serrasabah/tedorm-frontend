import * as React from "react";
import { DataGrid , GridToolbar} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import { Container, IconButton, useMediaQuery, Box, Stack, useTheme} from "@mui/material";
import { AnnouncementApi } from "../../api/AnnouncementApi";
import AppBarForStudents from "../AppBarForStudent";

function ListAnnouncementForAdmin() {
    const [selectionModel, setSelectionModel] = useState();
    const [admin, setAdmin] = useState([]);
    const [announcement, setAnnouncement] = useState([]);
    const announcementApi = new AnnouncementApi();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        getAnnouncement();
    }, []);

    async function getAnnouncement() {
        const response = await announcementApi.getAnnouncement();
        setAnnouncement(response);
    }

    async function deleteCell(e) {
        e.preventDefault();
        const response = (await announcementApi.deleteAnnouncement(selectionModel)).data;
        if (response.responseType === "SUCCESS") {
            toast.success(response.message);
            setAnnouncement((r) => r.filter((x) => !x.id === selectionModel));
            await getAnnouncement();
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
            field: "announcement",
            headerName: "Announcement",
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
            <AppBarForStudents/>
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
                            rows={announcement}
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
export default ListAnnouncementForAdmin;