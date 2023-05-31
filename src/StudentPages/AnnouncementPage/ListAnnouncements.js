import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import { Container, Typography, useMediaQuery, Box, Stack, useTheme } from "@mui/material";
import { AnnouncementApi } from "../../api/AnnouncementApi";
import AppBarForStudents from "../AppBarForStudent";
import { StudentApi } from "../../api/StudentApi";
import { useParams } from "react-router-dom";

function ListAnnouncement() {
    const [selectionModel, setSelectionModel] = useState();

    const [announcement, setAnnouncement] = useState([]);
    const announcementApi = new AnnouncementApi();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [student, setStudent] = useState(null);
    const studentApi = new StudentApi();
    const { id } = useParams();

    useEffect(() => {
        async function fetchStudent() {
            try {
                const response = await studentApi.getStudentById(id);
                setStudent(response.data);
            } catch (error) {
                console.log(error);
            }
        } fetchStudent();
    }, [id]);

    useEffect(() => {
        getAnnouncement();
    }, []);

    async function getAnnouncement() {
        const response = await announcementApi.getAnnouncement();
        const formattedPermissions = response.data.map((permission, index) => ({
            ...permission,
            id: index + 1,
        }));
        console.log(formattedPermissions);
        setAnnouncement(formattedPermissions);
    }

    const columns = [
        {
            field: "id",
            headerName: "Announcement Number",
            width: 200,
            editable: false,
        },
        {
            field: "message",
            headerName: "Message",
            width: 350,
        },
    ];

    return (
        <div>
            <AppBarForStudents />
            <Container>
                <Box sx={{ width: "100%", m: "2rem" }}>
                    <Typography component="h1" variant="h5" sx={{ mr: 108 }}>
                        Announcements
                    </Typography>
                    <Stack direction="row" spacing={1}></Stack>
                    <Box sx={{ height: 600, mt: 3 }}>
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
                                } else {
                                    setSelectionModel(selection);
                                }
                            }}
                        />
                    </Box>
                </Box>
            </Container>
        </div>
    );
}
export default ListAnnouncement;