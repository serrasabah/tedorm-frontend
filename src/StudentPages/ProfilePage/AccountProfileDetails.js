import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import * as React from "react";
import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { StudentApi } from "../../api/StudentApi";
import { toast } from "react-toastify";

export const AccountProfileDetails = ({ student }) => {
  const [formState, setFormState] = useState({});
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const studentApi = new StudentApi();

  const [values, setValues] = useState({
   // university: student.university,
    //email: student.email,
    //phoneNumber: student.phoneNumber,
    //roomNumber: student.roomNumber,
  });

  const handleClickOpen = () => {
    resetFileAndName();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function resetFileAndName() {
    setFile(null);
    setName("");
  }

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  function onChangeFunction(event) {
    const name = event.target.name;
    const value = event.target.value;
    const newState = { ...formState };
    newState[name] = value;
    setFormState(newState);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await studentApi.updateStudents(student.id, values);
    const messageResponse = response.data;
    if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
    } else {
      toast.error(messageResponse.message);
    }
    setOpen(false);
  };

  return (
    <>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Update Student
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Update Student"}</DialogTitle>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                subheader="The information can be edited"
                title="Profile"
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        onChange={handleChange}
                        required
                        value={values.email}
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        onChange={handleChange}
                        required
                        value={values.university}
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        onChange={handleChange}
                        required
                        value={values.phoneNumber}
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Room Number"
                        name="roomNumber"
                        onChange={handleChange}
                        required
                        value={values.roomNumber}
                      />
                    </Grid>
                    <Grid xs={12} md={6}></Grid>
                  </Grid>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant="contained" type="submit">
                  Save details
                </Button>
              </CardActions>
            </Card>
          </form>
        </Dialog>
      </div>
    </>
  );
};
