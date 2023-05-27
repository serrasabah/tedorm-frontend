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
import { useNavigate } from "react-router-dom";

export const DeleteStudent = ({ student }) => {
  const [formState, setFormState] = useState({});
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const studentApi = new StudentApi();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    university: student.university,
    email: student.email,
    phoneNumber: student.phoneNumber,
    roomNumber: student.roomNumber,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await studentApi.deleteStudents(student.id);
    const messageResponse = response.data;
    if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
    } else {
      toast.error(messageResponse.message);
    }
    navigate("/ListStudents");
  };

  return (
    <>
      <div>
        <Button variant="outlined" onClick={handleClickOpen} color="error">
          Delete Student
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                subheader="Are you sure you want to delete the student?"
                title="Delete Student"
              />
              <Divider />
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant="contained" type="submit">
                  Delete
                </Button>
                <Button variant="contained" onClick={handleClose}>
                  cancel
                </Button>
              </CardActions>
            </Card>
          </form>
        </Dialog>
      </div>
    </>
  );
};
