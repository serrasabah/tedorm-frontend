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
  import axios from "axios";
  import  { useState } from "react";
  const user = {
    avatar: '/assets/avatars/avatar-anika-visser.png',
    city: 'Los Angeles',

    jobTitle: 'Senior Developer',
    name: 'Anika Visser',
    timezone: 'GTM-7'
  };


  export default function  ViewDocuments (){
    const [pdfUrl, setPdfUrl] = useState(null);
    const handleDownloadClick = async () => {
      try {
        const response = await axios.get('/image/imageYurtSized.png', {
          responseType: "arraybuffer",
        });
        const pdfBlob = new Blob([response.data], { type: "image/png" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        //  setPdfUrl(pdfUrl);
        window.open(pdfUrl);
      } catch (error) {
        console.error(error);
      }
    };
    
    const handleDownloadClickPDF = async () => {
      try {
        const response = await axios.get('/image/SamplePDF.pdf', {
          responseType: "arraybuffer",
        });
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        //  setPdfUrl(pdfUrl);
        window.open(pdfUrl);
      } catch (error) {
        console.error(error);
      }
    };
  
    return(
    <Card>
      <CardActions>
        <Button target="_blank" onClick={handleDownloadClick}
          fullWidth
          variant="text"
        >
        Belge1
        </Button>
      </CardActions>
      <Divider />
      <CardActions>
        <Button target="_blank" onClick={handleDownloadClickPDF}
          fullWidth
          variant="text"
        >
          Belge2
        </Button>
      </CardActions>
      <Divider />
      <CardActions>
        <Button target="_blank" onClick={handleDownloadClickPDF}
          fullWidth
          variant="text"
        >
        Belge3
        </Button>
      </CardActions>
      <Divider />
      <CardActions>
        <Button target="_blank" onClick={handleDownloadClickPDF}
          fullWidth
          variant="text"
        >
        Belge4
        </Button>
      </CardActions>
   
    </Card>
  );
  }