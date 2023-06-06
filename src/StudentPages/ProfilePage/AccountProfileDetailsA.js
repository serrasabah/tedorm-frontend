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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import * as React from "react";
import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { StudentApi } from "../../api/StudentApi";
import { toast } from "react-toastify";

export const AccountProfileDetailsA = ({ student }) => {
  const [formState, setFormState] = useState({});
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const studentApi = new StudentApi();

  const [textFieldValues, setTextFieldValues] = useState({
    roomNumber: "",
    roomType: "",
  });
  const [roomType, setRoomType] = useState(""); // Move roomType state inside ListStudent component

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

  const handleChange = (event) => {
    const value = event.target.value;
    setTextFieldValues((prevValues) => ({
      ...prevValues,
      roomType: value,
    }));
  };
  const handleTextFieldChange = (event, fieldName) => {
    let value = event.target.value;

    setTextFieldValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };
  function onChangeFunction(event) {
    const name = event.target.name;
    const value = event.target.value;
    const newState = { ...formState };
    newState[name] = value;
    setFormState(newState);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await studentApi.updateStudents(id, textFieldValues);
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
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">{"Update Student"}</DialogTitle>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                subheader="The information can be edited"
                title="Profile"
              />
              <CardContent sx={{ pt: 0 }}>
                <Box>
                  <Grid container spacing={4} justify="center">
                    <Grid xs={12} sm={6}>
                      <TextField
                        error={textFieldValues.roomNumber === ""}
                        id="outlined-error"
                        label="roomNumber"
                        value={textFieldValues.roomNumber}
                        onChange={(event) =>
                          handleTextFieldChange(event, "roomNumber")
                        }
                      />
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <FormControl fullWidth sx={{ m: 0.5 }}>
                        <InputLabel id="demo-simple-select-label">
                          Room Type
                        </InputLabel>
                        <Select
                          required
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={textFieldValues.roomType}
                          label="roomType"
                          onChange={handleChange}
                        >
                          <MenuItem value={1}>Single room</MenuItem>
                          <MenuItem value={2}>Double room</MenuItem>
                          <MenuItem value={4}>Quadruple Room</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
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
