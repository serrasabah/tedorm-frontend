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
import React, { useEffect, useState } from "react";
import { Context } from "../../context/Context";
import UploadFileForStudent from "./UploadFileForStudent";
import StudentAvatar from "../StudentAvatar";
import { useParams } from "react-router-dom";

export const AccountProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    avatar: "",
    name: "",
    timezone: "",
  });
  const [url, setUrl] = useState({});

  const [img, setImg] = useState();

  useEffect(() => {
    fetchImage();
  }, []);

  useEffect(() => {
    console.log(img); // This will log the image URL when it is set
  }, [img]);

  const fetchImage = async () => {
    const res = await fetch(`/avatar/list/${id}`);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  return (
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
            <img src={img} alt="icons" />
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
};
