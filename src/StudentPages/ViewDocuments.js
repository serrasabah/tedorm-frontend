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
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function ViewDocuments({ id }) {
  const [name, setName] = useState("");
  const [documents, setDocuments] = useState([]);

  // Belge listesini yükleme işlemi
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`/image/list/${id}`);
        const documentList = response.data;
        setDocuments(documentList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocuments();
  }, [id]);

  // ...

  const handleDownloadClick = async (fileName) => {
    try {
      const response = await axios.get(`/image/${fileName}`, {
        responseType: "arraybuffer",
        params: { id },
      });

      const contentType = response.headers["content-type"];
      console.log(contentType);

      if (contentType === "image/png" || contentType === "image/jpeg") {
        // Handle image/png or image/jpeg
        const imageBlob = new Blob([response.data], { type: contentType });
        const imageUrl = URL.createObjectURL(imageBlob);
        window.open(imageUrl);
      } else if (contentType === "application/pdf") {
        // Handle application/pdf
        const pdfBlob = new Blob([response.data], { type: contentType });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
      }

      setName(fileName);
    } catch (error) {
      console.error(error);
    }
  };

  // ...

  const handleDeleteClick = async (documentName, id) => {
    const response = await axios.delete(`/image/sil/${documentName}?id=${id}`);
    const messageResponse = response.data;
    console.log(messageResponse);
    if (messageResponse.responseType === "SUCCESS") {
      toast.success(messageResponse.message);
      console.log(messageResponse);
    } else {
      toast.warning(messageResponse.message);
      console.log(messageResponse);
    }
  };

  return (
    <Card>
      {documents.map((document) => (
        <React.Fragment key={document.id}>
          <CardActions>
            <Button
              target="_blank"
              onClick={() => handleDownloadClick(document.fileName)}
              fullWidth
              variant="text"
            >
              {document.name}
            </Button>
            <Button
              onClick={() => handleDeleteClick(document.fileName, id)}
              fullWidth
              variant="text"
              color="error"
            >
              Delete
            </Button>
          </CardActions>
          <Divider />
        </React.Fragment>
      ))}
    </Card>
  );
}
