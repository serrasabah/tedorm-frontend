import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';
  import * as React from "react";
  import {Context } from '../../context/Context';

import UploadFileForStudent from './UploadFileForStudent';
  const user = {
    avatar: '/assets/avatars/avatar-anika-visser.png',
    name: 'Defult',
    timezone: 'GTM-7'
  };

  export const AccountProfile = () => (

    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 70,
              mb: 2,
              width: 70
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {user.name}
           
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.city} 
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          <UploadFileForStudent/>
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );