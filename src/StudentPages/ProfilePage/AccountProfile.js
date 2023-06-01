import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import * as React from "react";
import UploadFileForStudent from "./UploadFileForStudent";
import StudentAvatar from "../StudentAvatar";

const user = {
  avatar: "",
  name: "",
  timezone: "",
};

export const AccountProfile = () => (
  <>
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 150,
              mb: 2,
              width: 150,
            }}
          />
          <Typography gutterBottom variant="h5">
            {user.name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <StudentAvatar />
      </CardActions>
    </Card>
    <div>
      <div style={{ marginTop: "10px" }}></div> {/* 10 piksel boşluk */}
      {/* ... */}
      {/* ... */}
      <UploadFileForStudent />
      {/* ... */}
    </div>
  </>
);
