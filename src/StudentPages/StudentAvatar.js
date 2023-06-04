import * as React from "react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { FileApi } from "../api/FileApi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
        <Button
          sx={{
            width: "100%",
            marginLeft: "75%",
          }}
          variant="outlined"
          onClick={handleClickOpen}
        >
          Upload Image
        </Button>
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
