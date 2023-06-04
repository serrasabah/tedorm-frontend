import * as React from "react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./styles.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { FileApi } from "../../api/FileApi";
import {
  Box,
  Button,
 
  Unstable_Grid2 as Grid,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useParams } from "react-router-dom";
import { AccountProfileDetails } from "./AccountProfileDetails";
import { DeleteStudent } from "./DeleteStudent";
import { ChangePassword } from "./ChangePassword";

const fileTypes = ["JPEG", "PNG", "PDF"];
const fileApi = new FileApi();

export default function UploadFileForStudent() {
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
    console.log(event);
    const field = event;
    setFormState(field);
    setFile(event);
  };

  async function uploadFile(formState, name) {
    console.log(name);
    console.log(formState);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("id", id); // Append the id to the formData object
    console.log(id);
    const response = await fileApi.uploadFiles(formData, name, id);
    const messageResponse = response.data;
    if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
      window.location.reload();
    } else {
      toast.warning(messageResponse.message);
    }
  }

  function createFile(e) {
    e.preventDefault();

    // Check if a MenuItem value is selected
    if (!name) {
      toast.warning("Please select a file type");
      return;
    }

    uploadFile(formState, name);
    setOpen(false);
  }

  function resetFileAndName() {
    setFile(null);
    setName("");
  }

  return (
    <>
        <div style={{ display: "flex", gap: "5px" }}>
        <div>
            <AccountProfileDetails/>  
        </div>
        <div>
            <ChangePassword/>  
        </div>
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add File
          </Button>
        </div>
      </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Upload File"}</DialogTitle>
          <DialogContent sx={{ minWidth: 500 }}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">File</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={name}
                  label="Age"
                  onChange={handleChange}
                  required // Add the 'required' attribute to the Select component
                >
                  <MenuItem value="vesikalik">Vesikalık</MenuItem>
                  <MenuItem value="sağlik_belgesi">Sağlık belgesi</MenuItem>
                  <MenuItem value="ogrenci_belgesi">öğrenci belgesi</MenuItem>
                  <MenuItem value="adli_sicil_belgesi">
                    Adli sicil belgesi
                  </MenuItem>
                  <MenuItem value="ikametgah_belgesi">
                    Ikametgah belgesi
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <br></br>
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
   

    </>
  );
}
