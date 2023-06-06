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
  import UploadFileForStudentA from "./UploadFileForStudentA";
  import StudentAvatar from "../StudentAvatar";
  import { useParams } from "react-router-dom";
  
  export const AccountProfileA = () => {
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
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Avatar src={img} alt="Profile Avatar" sx={{ width: 200, height: 200, borderRadius: "50%" }} />
              <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
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
          <UploadFileForStudentA />
          {}
        </div>
      </>
    );
  };
  