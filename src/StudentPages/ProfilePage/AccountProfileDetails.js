import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useParams } from "react-router-dom";
import { StudentApi } from "../../api/StudentApi";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const AccountProfileDetails = ({ student }) => {
  const [formState, setFormState] = useState({});
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const studentApi = new StudentApi();

  const [values, setValues] = useState({
    phoneNumber: "",
  });

  const handleClickOpen = () => {
    resetFormState();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetFormState = () => {
    setFormState({});
    setValues({ phoneNumber: "" });
  };

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await studentApi.updateStudents(id, values);
    const messageResponse = response.data;
    if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
    } else {
      toast.error(messageResponse.message);
    }
    setOpen(false);
  };

  const handlePhoneNumberChange = (value) => {
    setValues((prevState) => ({
      ...prevState,
      phoneNumber: value || "",
    }));
  };

  const isPhoneNumberValid = (phoneNumber) => {
    const phoneNumberRegex = /^\d{5,18}$/;
    return phoneNumberRegex.test(phoneNumber);
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
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">Update Student</DialogTitle>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card sx={{ minWidth: 500 }}>
              <CardHeader
                subheader="The information can be edited"
                title="Profile"
              />
              <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ m: -1.5, display: "flex", justifyContent: "center" }}>
                  <PhoneInput
                    country={"tr"}
                    value={values.phoneNumber}
                    onChange={handlePhoneNumberChange}
                    containerStyle={{margin:'20px', width:'350px', height:'65px'}}
                    dropdownStyle={{height:'70px'}}
                    inputStyle={{width:'300px', height:'65px', fontSize:'24px', marginLeft:'10px'}}
                    inputProps={{
                      minLength: 5,
                      maxLength: 18,
                    }}
                    buttonStyle={{
                      width: "40px",
                    }}
                  />
                </Box>
              </CardContent>
              <CardActions
                sx={{ 
                  justifyContent: "flex-end", 
                  pb: 2, 
                  pr: 2,
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!values.phoneNumber || !isPhoneNumberValid(values.phoneNumber)}
                >
                  Save Details
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
              </CardActions>
            </Card>
          </form>
        </Dialog>
      </div>
    </>
  );
};