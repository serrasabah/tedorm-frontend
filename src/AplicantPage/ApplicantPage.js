import { useState } from "react";
import * as React from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Box,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
function ApplicantPage({ isOpen, close, submit }) {
  const [formState, setFormState] = useState({});
  const [roomType, setRoomType] = useState("");
  function onChangeFunction(event) {
    console.log(event.target.name);
    const name = event.target.name;
    const value = event.target.value;
    const newState = { ...formState };
    newState[name] = value;
    setFormState(newState);
  }
  const handleChange = (event) => {
    console.log(event.target.value);
    setRoomType(event.target.value);
    const newState = { ...formState };
    newState["roomType"] = event.target.value;
    setFormState(newState);
    console.log(formState);
  };
  return (
    <Dialog open={isOpen}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, alignItems: "center", bgcolor: "black" }}>
              <LockOutlinedIcon />
            </Avatar>
          </Box>
          Applicant Form
        </DialogTitle>
      </Box>
      <DialogContent>
        <TextField
          sx={{ m: 0.5 }}
          onChange={onChangeFunction}
          name="name"
          label="Name"
          fullWidth
        ></TextField>
        <TextField
          sx={{ m: 0.5 }}
          onChange={onChangeFunction}
          name="surname"
          label="Surname"
          fullWidth
        ></TextField>
        <TextField
          sx={{ m: 0.5 }}
          onChange={onChangeFunction}
          name="email"
          label="Email Address"
          fullWidth
        ></TextField>
        <TextField
          sx={{ m: 0.5 }}
          onChange={onChangeFunction}
          name="phoneNumber"
          label="Phone Number"
          fullWidth
        ></TextField>
        <TextField
          sx={{ m: 0.5 }}
          onChange={onChangeFunction}
          name="address"
          label="Address"
          fullWidth
        ></TextField>
        <TextField
          sx={{ m: 0.5 }}
          onChange={onChangeFunction}
          name="university"
          label="University Name"
          fullWidth
        ></TextField>
        <TextField
          sx={{ m: 0.5 }}
          onChange={onChangeFunction}
          name="age"
          type="date"
          label="Date of birth"
          fullWidth
        ></TextField>
        <TextField
          sx={{ m: 0.5 }}
          onChange={onChangeFunction}
          name="tcKimlikNo"
          label="Kimlik No"
          fullWidth
        />
        <TextField
          sx={{ m: 0.5 }}
          onChange={onChangeFunction}
          name="studentNumber"
          label="Student Number"
          fullWidth
        />
        <Box>
          <FormControl fullWidth sx={{ m: 0.5 }}>
            <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={roomType}
              label="RoomType"
              onChange={handleChange}
            >
              <MenuItem value={1}>Single room</MenuItem>
              <MenuItem value={2}>Double room</MenuItem>
              <MenuItem value={4}>Quadruple Room</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close()} color="secondary">
          Already have an account? Sign in
        </Button>
        <Button
          onClick={() => {
            submit(formState);
            close();
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ApplicantPage;
