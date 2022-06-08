
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
import {toast} from "react-toastify";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
const theme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();
  const userAuth = useAuth();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
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
      navigate("/");
      toast.success("Başarıyla giriş yapıldı.")
    } catch (e) {
      console.error(e);
      toast.error("Giriş işlemi sırasında hata oluştu.")
    }
  };

  if (userAuth?.loggedIn) {
    return <Navigate to={"/"}/>
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{marginBottom: "80px"}}>
        <CssBaseline />
        <Box
          sx={{

            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div>
            <Typography sx={{ borderBottom: 1, padding: 3, color: 'GrayText', borderColor: "GrayText", fontSize: 15, width: 340, marginBottom: "16px" }}>
              Hesabınızda Oturum Açın!
            </Typography>
            <img width={100} height={100} alt={"img"} style={{borderRadius: "50%", margin: "auto"}} src="https://img-c.udemycdn.com/user/100x100/anonymous_3.png"/>
          </div>

          <Box component="form" width={335} onSubmit={handleSubmit} noValidate sx={{ mt: "16px" }}>
            <div className='flex flex-row items-center h-12' style={{
              border: "1px solid #1c1d1f",
            }}>
              <Email sx={{ color: "text.disabled", fontSize: 20, marginLeft: '8px' }} ></Email>
              <input
                type="text"
                id="Email"
                name="email"
                className="ml-2 focus:outline-none focus:none focus:border-none"
                placeholder="E-Posta"
                autoComplete="true"
              />
            </div>
            <div className='mt-3 flex flex-row items-center h-12' style={{
              border: "1px solid #1c1d1f",
            }} >
              <Lock sx={{ color: "text.disabled", fontSize: 20, marginLeft: '8px' }} ></Lock>
              <input
                type="password"
                id="Password"
                name='password'
                className="ml-2 focus:outline-none focus:none focus:border-none"
                placeholder="Şifre"
                autoComplete="true"
              />
            </div>
            <button type="submit" className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-none text-white bg-purple-600 hover:bg-purple-700 focus:outline-none  focus:bg-purple-800">
              Giriş Yap
            </button>



            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: 2, justifyContent: "center" }}>
              <Grid item xs={8} sx={{ fontSize: 14, justifyContent: "center" }}>
                Hesabınız yok mu?
                <Link sx={{ marginLeft: 2, color: "blue", cursor: 'pointer' }} onClick={() => navigate('/SignUp')}>
                  Kaydol
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