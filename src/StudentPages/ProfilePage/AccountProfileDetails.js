import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import * as React from "react";


export const AccountProfileDetails = () => {
  const [formState, setFormState] = useState({});
  const [values, setValues] = useState({
    firstName: 'Name',
    lastName: 'Last Name',
    email: 'demo@devias.io',
    phone: '',
    roomNumber: 'A201',

  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );
  function onChangeFunction(event) {
    const name = event.target.name;
    const value = event.target.value;
    const newState = { ...formState };
    newState[name] = value;
    setFormState(newState);
  }
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the name"
                  label="First name"
                  name="firstName"
                  onChange={onChangeFunction}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}  >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}  >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6} >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6} >
                <TextField
                  fullWidth
                  label="Room Number"
                  name="roomNumber"
                  onChange={handleChange}
                  required
                  value={values.roomNumber}
                />
              </Grid>
              <Grid xs={12} md={6} >
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};