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
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const fileTypes = ["JPEG", "PNG", "PDF"];
const fileApi = new FileApi();

export default function UploadFileForStudent() {
  const [file, setFile] = useState(null);
  const [formState, setFormState] = useState({});
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);

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
    const response = await fileApi.uploadFiles(formData, name);
    const messageResponse = response.data;
    if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
    } else {
      toast.warning(messageResponse.message);
    }
  }

  function createFile(e) {
    e.preventDefault();
    uploadFile(formState, name);
    setOpen(false);
  }

  function resetFileAndName() {
    setFile(null);
    setName("");
  }

  // Function will execute on click of button
  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch("SamplePDF.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "SamplePDF.pdf";
        alink.click();
      });
    });
  };

  return (
    <>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add File
        </Button>
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
                >
                  <MenuItem value="Vesikalık">Vesikalık</MenuItem>
                  <MenuItem value="sağlik_belgesi">sağlık belgesi</MenuItem>
                  <MenuItem value="ogrenci_belgesi">öğrenci belgesi</MenuItem>
                  <MenuItem value="test_belgesi">test belgesi</MenuItem>
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
      </div>

      <center>
        <button onClick={onButtonClick}>Download PDF</button>
      </center>
    </>
  );
}
