import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Container } from '@mui/material';
const CreateCourse = () => {
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
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              id="description"
              label="Kurs Açıklaması"
              fullWidth
              variant="standard"
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
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              id="thumbnail"
              label="Kurs Resmi"
              fullWidth
              variant="standard"
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