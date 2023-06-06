import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { StudentApi } from "../../api/StudentApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const DeleteStudent = ({ student }) => {
  const [open, setOpen] = React.useState(false);
  const studentApi = new StudentApi();
  const navigate = useNavigate();

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
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button variant="outlined" onClick={handleClickOpen} color="error" style={{ width: "80%" }}>
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
                  Cancel
                </Button>
              </CardActions>
            </Card>
          </form>
        </Dialog>
      </div>
    </>
  );
};
