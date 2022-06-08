import React, {SetStateAction} from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Box, Button, Container} from '@mui/material';
import {CourseCart, createCourse, CreateCourseRequest} from "../../../api";
import {DropzoneArea, DropzoneDialog} from "material-ui-dropzone";

interface Props {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  thumbnail: string;
  setThumbnail: React.Dispatch<React.SetStateAction<string>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const CreateCourse = ({
      title,
      setTitle,
      description,
      setDescription,
      price,
      setPrice,
      thumbnail,
      setThumbnail,
      files,
      setFiles,
  }: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Container sx={{ marginTop: 10, justifyItems: "center", justifyContent: "center" }}>
      <Box sx={{}}>
        <Typography variant="h6" gutterBottom>
          Kurs Oluşturma
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="title"
              label="Kurs Başlığı"
              fullWidth
              variant="standard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="description"
              label="Kurs Açıklaması"
              fullWidth
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="price"
              label="Kurs Fiyatı"
              fullWidth
              variant="standard"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <DropzoneArea
                acceptedFiles={['image/*']}
                maxFileSize={5000000}
                initialFiles={files}
                filesLimit={1}
                onChange={(files) => {
                  setFiles(files)
                }}
                showPreviews={false}
                showFileNamesInPreview={false}
                dropzoneText="Kurs resmini sürükle ve bırak."
            />
          </Grid>
        </Grid>
      </Box>

    </Container>

  )
}

export default CreateCourse