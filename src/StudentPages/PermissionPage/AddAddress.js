import { useState } from "react";
import * as React from "react";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import AddHomeIcon from '@mui/icons-material/AddHome';
function AddAddress({ isOpen, close, submit }) {

  const [formState, setFormState] = useState({});

  function onChangeFunction(event) {
    const name = event.target.name;
    const value = event.target.value;
    const newState = { ...formState };
    newState[name] = value;
    setFormState(newState);
  }

  return (
    <Dialog open={isOpen}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
        <DialogTitle>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", }} >
            <Avatar sx={{ m: 1, alignItems: "center", bgcolor: 'black' }}>
              <AddHomeIcon />
            </Avatar>
          </Box>
          Add Address
        </DialogTitle>
      </Box>
      <DialogContent>
        <TextField sx={{ m: 0.5 }} onChange={onChangeFunction} name="address" label="Address" fullWidth></TextField>
        <TextField sx={{ m: 0.5 }} onChange={onChangeFunction} name="name" label="Address Owner Name" fullWidth></TextField>
        <TextField sx={{ m: 0.5 }} onChange={onChangeFunction} name="phoneNumber" label="Address Owner Telephone Number" fullWidth></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close()} color="secondary">Cancel</Button>
        <Button onClick={() => submit(formState)} >Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddAddress;