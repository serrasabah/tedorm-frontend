import { useState } from "react";
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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../api/UserApi";

export const ForgotPassword = () => {
  const [formState, setFormState] = useState({});
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const userApi = new UserApi();
  const navigate = useNavigate();
  const [textFieldValues, setTextFieldValues] = useState({
    email: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isAnyTextFieldEmpty = Object.values(textFieldValues).some(
    (value) => value === ""
  );

  const handleTextFieldChange = (event, fieldName) => {
    let value = event.target.value;

    setTextFieldValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(textFieldValues);
    const response = await userApi.forgotPassword(textFieldValues);
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
          Forgot Password
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card sx={{ pt: 0, width: "500px" }}>
              <CardHeader
                subheader="The new password will be sent to your e-mail address. Do not close the page Please wait !!!"
                title="Forgot Password"
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={10}>
                    <Grid xs={12} md={20}>
                      <TextField
                        error={textFieldValues.email === ""}
                        fullWidth
                        label="Enter your valid email"
                        name="email"
                        required
                        onChange={(event) =>
                          handleTextFieldChange(event, "email")
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isAnyTextFieldEmpty}
                >
                  save
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
