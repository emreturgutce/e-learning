
import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Email from '@mui/icons-material/Email'
import Lock from '@mui/icons-material/Lock'
import { fetchLogin, fetchPurchasedCourses, fetchWishlist } from '../../api';
import { useAuth } from '../../context/Auth/AuthContent';
import {Navigate, useNavigate} from "react-router-dom";

const theme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();
  const userAuth = useAuth();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const LoginResponse = await fetchLogin({
      email: data.get('email')?.toString(),
      password: data.get('password')?.toString(),
    });

    const user = {
      email: LoginResponse.data.data.user.email,
      type: LoginResponse.data.data.user.type,
      _id: LoginResponse.data.data.user._id
    }
    userAuth?.login(user);
    navigate("/myCourse");
  };

  if (userAuth?.loggedIn) {
    return <Navigate to={"/"}/>
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{

            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ borderBottom: 1, padding: 3, color: 'GrayText', borderColor: "GrayText", fontSize: 15, width: 340 }}>
            Udemy Hesabınızda Oturum Açın!
          </Typography>

          <Box component="form" width={335} onSubmit={handleSubmit} noValidate sx={{ mt: 5 }}>
            <div className='border-2 border-black flex flex-row items-center h-12' >
              <Email sx={{ color: "text.disabled", fontSize: 20 }} ></Email>
              <input
                type="text"
                id="Email"
                name="email"
                className="ml-2 focus:outline-none focus:none focus:border-none"
                placeholder="E-Posta"
                autoComplete="false"
              />
            </div>
            <div className='mt-3 border-2 border-black flex flex-row items-center h-12' >
              <Lock sx={{ color: "text.disabled", fontSize: 20 }} ></Lock>
              <input
                type="password"
                id="Password"
                name='password'
                className="ml-2 focus:outline-none focus:none focus:border-none"
                placeholder="Password"
                autoComplete="false"
              />
            </div>
            <button type="submit" className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-none text-white bg-purple-600 hover:bg-purple-700 focus:outline-none  focus:bg-purple-800">
              Sign in
            </button>



            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: 2, justifyContent: "center" }}>
              <Grid item xs={8} sx={{ fontSize: 15, justifyContent: "center" }}>
                veya
                <Link href="#" sx={{ marginLeft: 2, color: "blue" }} >
                  {"Şifremi Unuttum"}
                </Link>
              </Grid>
              <Grid item xs={8} sx={{ fontSize: 14, justifyContent: "center" }}>
                Hesabınız yok mu?
                <Link href="#" sx={{ marginLeft: 2, color: "blue" }}>
                  {" KaydoL"}
                </Link>
              </Grid>

            </Grid>



          </Box>
        </Box>

      </Container>
    </ThemeProvider >
  )
}

export default SignIn