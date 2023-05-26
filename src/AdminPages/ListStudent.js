import * as React from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { StudentApi } from "../api/StudentApi";
import AppBarForStudents from "../StudentPages/AppBarForStudent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

function ListStudent() {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      editable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 120,
      editable: true,
    },
    {
      field: "surname",
      headerName: "Surname",
      width: 120,
      editable: false,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 200,
      editable: true,
    },
    {
      field: "roomNumber",
      headerName: "Room Number",
      width: 110,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        //    const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Show"
            onClick={handleShowClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [selectionModel, setSelectionModel] = useState();
  const studentApi = new StudentApi();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [textFieldValues, setTextFieldValues] = useState({
    name: "",
    surname: "",
    email: "",
    tcKimlikNo: "",
    studentNumber: "",
    age: "",
    roomNumber: "",
    university: "",
    phoneNumber: "",
  });

  const [password, setPassword] = useState("");

  const handleTextFieldChange = (event, fieldName) => {
    let value = event.target.value;

    setTextFieldValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  async function addUsers(textFieldValues) {
    console.log(textFieldValues);
    const response = await studentApi.addStudents(textFieldValues);
    const messageResponse = response.data;
    if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
    } else {
      toast.error(messageResponse.message);
    }
  }

  function createUser(e) {
    e.preventDefault();
    addUsers(textFieldValues);
    setOpen(false);
  }

  const isAnyTextFieldEmpty = Object.values(textFieldValues).some(
    (value) => value === ""
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function deleteCell() {
    console.log("id" + selectionModel);
    const selectedIDs = selectionModel;
    const response = await studentApi.deleteStudents(selectedIDs);
    const messageResponse = response.data;
    console.log(messageResponse);
    if (messageResponse.responseType === "ERROR") {
      toast.error(messageResponse.message);
      console.log(messageResponse);
    } else {
      toast.warning(messageResponse.message);
      console.log(messageResponse);
    }
  }

  function returnHomePage(e) {
    e.preventDefault();
    navigate("/ListStudents");
  }

  async function getStudents() {
    const response = await studentApi.getStudents();
    setStudents(response.data);
  }

  const handleShowClick = (id) => () => {
    setStudents(students.filter((row) => row.id !== id));
    console.log(id);
    navigate(`/ProfilePageForStudent/${id}`); // `id` değerini sayfa rotasına ekleyin
  };

  useEffect(() => {
    getStudents();
    // Simulating an asynchronous backend request
  }, []);

  return (
    <div>
      <AppBarForStudents />
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
          <Button variant="outlined" onClick={handleClickOpen}>
            Add a Student
          </Button>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": {
                      m: 1,
                      width: "35ch",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    error={textFieldValues.name === ""}
                    id="outlined-error"
                    label="Name"
                    value={textFieldValues.name}
                    onChange={(event) => handleTextFieldChange(event, "name")}
                  />
                  <TextField
                    error={textFieldValues.surname === ""}
                    id="outlined-error-helper-text"
                    label="Surname"
                    value={textFieldValues.surname}
                    onChange={(event) =>
                      handleTextFieldChange(event, "surname")
                    }
                  />
                  <TextField
                    error={textFieldValues.email === ""}
                    id="outlined-error"
                    label="Email"
                    value={textFieldValues.email}
                    onChange={(event) => handleTextFieldChange(event, "email")}
                  />
                  <TextField
                    error={textFieldValues.tcKimlikNo === ""}
                    id="outlined-error"
                    label="tcKimlikNo"
                    value={textFieldValues.tcKimlikNo}
                    onChange={(event) =>
                      handleTextFieldChange(event, "tcKimlikNo")
                    }
                  />
                  <TextField
                    error={textFieldValues.studentNumber === ""}
                    id="outlined-error"
                    label="studentNumber"
                    value={textFieldValues.studentNumber}
                    onChange={(event) =>
                      handleTextFieldChange(event, "studentNumber")
                    }
                  />
                  <TextField
                    error={textFieldValues.age === ""}
                    id="outlined-error"
                    label="age"
                    value={textFieldValues.age}
                    type="date"
                    onChange={(event) => handleTextFieldChange(event, "age")}
                  />
                  <TextField
                    error={textFieldValues.roomNumber === ""}
                    id="outlined-error"
                    label="roomNumber"
                    value={textFieldValues.roomNumber}
                    onChange={(event) =>
                      handleTextFieldChange(event, "roomNumber")
                    }
                  />
                  <TextField
                    error={textFieldValues.university === ""}
                    id="outlined-error"
                    label="university"
                    value={textFieldValues.university}
                    onChange={(event) =>
                      handleTextFieldChange(event, "university")
                    }
                  />
                  <TextField
                    error={textFieldValues.phoneNumber === ""}
                    id="outlined-error"
                    label="phoneNumber"
                    value={textFieldValues.phoneNumber}
                    onChange={(event) =>
                      handleTextFieldChange(event, "phoneNumber")
                    }
                  />
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Disagree
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={isAnyTextFieldEmpty}
                onClick={createUser}
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </div>
  );
}
export default ListStudent;
