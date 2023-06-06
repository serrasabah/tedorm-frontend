import * as React from "react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import { FileApi } from "../api/FileApi";
import { DialogActions, DialogContent, Dialog, Button, DialogTitle, Box } from "@mui/material";
import { useParams } from "react-router-dom";

const fileTypes = ["JPEG", "PNG"];
const fileApi = new FileApi();

export default function StudentAvatar() {
  const [file, setFile] = useState(null);
  const [formState, setFormState] = useState({});
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();

  const handleClickOpen = () => {
    resetFileAndName();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleChangeFile = (event) => {
    const field = event;
    setFormState(field);
    setFile(event);
  };

  async function uploadFile(formState) {
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("id", id); // Append the id to the formData object
    const response = await fileApi.uploadAvatar(formData, id);
    console.log("response" + response.value);
    const messageResponse = response.data;
    if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
    } else {
      toast.warning(messageResponse.message);
    }
  }

  function createFile(e) {
    e.preventDefault();

    uploadFile(formState);
    setOpen(false);
  }

  function resetFileAndName() {
    setFile(null);
    setName("");
  }

  return (
    <>
      <div>
        <Box sx={{ width: 540, display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={handleClickOpen}
            >
              Upload Image
            </Button>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Upload File"}</DialogTitle>
          <DialogContent sx={{ minWidth: 500 }}>
            <FileUploader
              multiple={false}
              handleChange={handleChangeFile}
              name="image" // change the name to "image"
              types={fileTypes}
            />
            <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={createFile} autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
