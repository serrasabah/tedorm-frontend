import * as React from "react";
import { DataGrid , GridToolbar} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import { Container, IconButton, useMediaQuery, Box, Stack, useTheme} from "@mui/material";
import { AnnouncementApi } from "../../api/AnnouncementApi";
import AppBarForStudents from "../AppBarForStudent";

function ListAnnouncement() {
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


    const columns = [
 
        {
            
            field: "announcement",
            headerName: "Announcement",
            width: 1150,
            headerClassName: "custom-header",
        },
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
export default ListAnnouncement;