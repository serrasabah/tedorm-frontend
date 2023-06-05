import * as React from "react";
import { useEffect, useState } from "react";
import { ApplicantApi } from "../../api/ApplicantApi";
import { toast } from "react-toastify";
import { Stack, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import DoneIcon from "@mui/icons-material/Done";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { StudentApi } from "../../api/StudentApi";
import { Box, TextField, Unstable_Grid2 as Grid } from "@mui/material";
import AppBarForAdmin from "../AppBarForAdmin";

function ListApplicant() {
  const [selectionModel, setSelectionModel] = useState();
  const [applicant, setApplicant] = useState([]);
  const applicantApi = new ApplicantApi();
  const [open, setOpen] = useState(false);
  const [openAddApplicant, setOpenAddApplicant] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const studentApi = new StudentApi();
  const [roomNumber, setRoomNumber] = useState("");

  const handleDeleteUser = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleAddApplicant = (id) => {
    setSelectedId(id);
    setOpenAddApplicant(true);
  };

  const handleClosePopup = () => {
    setOpen(false);
    setOpenAddApplicant(false);
  };

  useEffect(() => {
    getApplicant().then((r) => {});
  }, []);

  async function getApplicant() {
    const response = await applicantApi.applicant();
    console.log(response.data);
    setApplicant(response.data);
  }

  async function deleteUser(selectedId) {
    try {
      const response = await applicantApi.deleteApplicant(selectedId);
      console.log(response.data.responseType); // Assuming the responseType is within response.data
      if (response.data.responseType === "SUCCESS") {
        toast.success(response.data.message);
        await getApplicant();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
    setOpen(false);
  }

  async function addUsers(selectedId) {
    const selectedApplicant = applicant.find((app) => app.id === selectedId);
    // const { roomNumber, university } = selectedApplicant;

    console.log("roomnumber" + roomNumber);

    const addStudentRequest = {
      name: selectedApplicant.name,
      surname: selectedApplicant.surname,
      email: selectedApplicant.email,
      tcKimlikNo: selectedApplicant.tcKimlikNo,
      studentNumber: selectedApplicant.studentNumber,
      age: selectedApplicant.age,
      roomNumber: roomNumber,
      university: selectedApplicant.university,
      phoneNumber: selectedApplicant.phoneNumber,
      roomType: selectedApplicant.roomType,
      address: selectedApplicant.address,
    };

    console.log(addStudentRequest);

    try {
      const response = await studentApi.addApplicantToStudent(
        addStudentRequest
      );
      const messageResponse = response.data;
      if (messageResponse.responseType === "SUCCESS") {
        toast.success(messageResponse.message);
        await getApplicant();
      } else {
        toast.error(messageResponse.message);
      }
    } catch (error) {
      console.error(error);
      // Handle error
      toast.error("Error occurred while adding student");
    }
  }

  async function updateCell(params, newValue) {
    const applicantIndex = applicant.findIndex((lecture) => {
      return applicant.id === params.id;
    });
    const updateApplicant = [...applicant];
    updateApplicant[applicantIndex][params.field] = newValue;
    setApplicant(updateApplicant);
    const id = params.id;
    const response = (
      await applicantApi.updateApplicant(id, updateApplicant[applicantIndex])
    ).data;
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
      field: "age",
      headerName: "Date of birth",
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
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon style={{ color: "red" }} />}
          label="Delete"
          onClick={() => handleDeleteUser(params.id)}
        />,
        <GridActionsCellItem
          icon={<DoneIcon style={{ color: "green" }} />}
          label="Accept"
          onClick={() => handleAddApplicant(params.id)}
          // showInMenu
        />,
      ],
    },
  ];
  return (
    <div className="list">
      <AppBarForAdmin />
      <Container>
        <Box
          sx={{
            width: "130%",
            m: "2rem",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Stack direction="row" spacing={1}></Stack>
          <Box
            sx={{
              height: 600,
              mt: 1,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <DataGrid
              orientation="vertical"
              slots={{ toolbar: GridToolbar }}
              rows={applicant}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              onCellEditStop={(params, event) =>
                updateCell(params, event.target.value)
              }
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
      <Dialog open={open} onClose={handleClosePopup}>
        <DialogTitle>Delete Applicant</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the applicant?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => deleteUser(selectedId)}>
            Delete
          </Button>
          <Button onClick={handleClosePopup}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAddApplicant} onClose={handleClosePopup}>
        <DialogTitle>Accept Applicant</DialogTitle>
        <DialogContent>Do you accept being a dorm student?</DialogContent>
        <Grid xs={12} md={8}>
          <TextField
            fullWidth
            label="Room Number"
            name="roomNumber"
            required
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </Grid>
        <DialogActions>
          <Button variant="contained" onClick={() => addUsers(selectedId)}>
            Accept
          </Button>
          <Button onClick={handleClosePopup}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ListApplicant;