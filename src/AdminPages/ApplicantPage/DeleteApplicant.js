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
import { ApplicantApi } from "../../api/ApplicantApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const DeleteApplicant = ({ id }) => {
  const [formState, setFormState] = useState({});
  const [open, setOpen] = React.useState(false);
  const applicantApi = new ApplicantApi();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    console.log(id);
    event.preventDefault();
    const response = await applicantApi.deleteApplicant(id);
    const messageResponse = response.data;
    if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
    } else {
      toast.error(messageResponse.message);
    }
    navigate("/ListApplicant");
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
