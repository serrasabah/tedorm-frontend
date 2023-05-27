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

export const ChangePassword = ({ student }) => {
  const [formState, setFormState] = useState({});
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const studentApi = new StudentApi();
  const navigate = useNavigate();
  const [textFieldValues, setTextFieldValues] = useState({
    eskiSifre: "",
    yeniSifre: "",
    yeniSifreTekrar: "",
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
    console.log(student.id);
    console.log(textFieldValues);
    const response = await studentApi.changePassword(
      student.id,
      textFieldValues
    );
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
          Change Password
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
                subheader="The information can be edited"
                title="Profile"
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={8}>
                      <TextField
                        error={textFieldValues.eskiSifre === ""}
                        fullWidth
                        label="Eski Şifreniz"
                        name="eskiSifre"
                        required
                        onChange={(event) =>
                          handleTextFieldChange(event, "eskiSifre")
                        }
                        type="password"
                      />
                    </Grid>
                    <Grid xs={12} md={8}>
                      <TextField
                        error={textFieldValues.yeniSifre === ""}
                        fullWidth
                        label="Yeni Şifreniz"
                        name="yeniSifre"
                        required
                        onChange={(event) =>
                          handleTextFieldChange(event, "yeniSifre")
                        }
                        type="password"
                      />
                    </Grid>
                    <Grid xs={12} md={8}>
                      <TextField
                        error={textFieldValues.yeniSifreTekrar === ""}
                        fullWidth
                        label="Yeni Şifreniz Tekrar"
                        name="yeniSifreTekrar"
                        required
                        onChange={(event) =>
                          handleTextFieldChange(event, "yeniSifreTekrar")
                        }
                        type="password"
                      />
                    </Grid>
                    <Grid xs={12} md={6}></Grid>
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
                  change password
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
