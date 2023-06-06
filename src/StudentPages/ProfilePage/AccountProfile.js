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
  const [isImg, setIsImg] = useState(false);

  useEffect(() => {
    fetchImage();
    console.log("as", img); // This will log the image URL when it is set
  }, []);

  useEffect(() => {
    console.log(img); // This will log the image URL when it is set
  }, [img]);

  const fetchImage = async () => {
    const res = await fetch(`/avatar/list/${id}`);
    if (res.status === 200) {
      console.log(res.status);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    }
    // console.log("imageObjectURL" + imageObjectURL);
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
            {img && (
              <Avatar
                src={img}
                sx={{
                  height: 150,
                  mb: 2,
                  width: 150,
                }}
              />
            )}
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
        <div style={{ marginTop: "10px" }}></div> {}
        {}
        {}
        <UploadFileForStudent />
        {}
      </div>
    </>
  );
};
