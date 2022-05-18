import React, {SetStateAction} from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Container } from '@mui/material';
import {CourseCart, createCourse, CreateCourseRequest} from "../../../api";

interface Props {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  thumbnail: string;
  setThumbnail: React.Dispatch<React.SetStateAction<string>>;
}

const CreateCourse = ({
      title,
      setTitle,
      description,
      setDescription,
      price,
      setPrice,
      thumbnail,
      setThumbnail
  }: Props) => {

  return (
    <Container sx={{ marginTop: 10, width: "80%", justifyItems: "center", justifyContent: "center" }}>
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
            <TextField
              required
              id="thumbnail"
              label="Kurs Resmi"
              fullWidth
              variant="standard"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
                id="preview"
                label="Kurs Önizleme Videosu"
                fullWidth
                variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveCard" value="yes" />}
              label="Bu aşama tamamlandıktan sonra bir daha güncellenemez!"
            />
          </Grid>
        </Grid>
      </Box>

    </Container>

  )
}

export default CreateCourse