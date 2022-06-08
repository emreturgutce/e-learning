import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Navigate, useNavigate} from 'react-router-dom';
import Email from '@mui/icons-material/Email';
import Lock from '@mui/icons-material/Lock';
import { signup, UserType } from '../../api';
import {useAuth} from "../../context/Auth/AuthContent";

const theme = createTheme();

const SignUp = () => {
  const navigate = useNavigate();
  const userAuth = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('Email')?.toString();
    const password = data.get('Password')?.toString();
    const firstname = data.get('FulName')?.toString();

    if (!email || !password || !firstname) {
      return;
    }

    await signup({
      email,
      password,
      firstname: firstname,
      lastname: '',
      type: UserType.USER,
    });
    console.log('Logged in succesfully.');
    navigate('/SignIn');
  };

  if (userAuth?.loggedIn) {
    return <Navigate to={"/"}/>
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs' sx={{marginBottom: "80px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>
          <Typography
            sx={{
              borderBottom: 1,
              padding: 3,
              color: 'GrayText',
              borderColor: 'GrayText',
              fontSize: 15,
              width: 340,
              textAlign: 'center',
              marginBottom: "16px"
            }}
          >
            Kayıt Olun!
          </Typography>
          <img width={100} height={100} alt={"img"} style={{borderRadius: "50%", margin: "auto"}} src="https://img-c.udemycdn.com/user/100x100/anonymous_3.png"/>
          </div>
          <Box
            component='form'
            width={335}
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: "16px" }}
          >
            <div className='flex flex-row items-center h-12' style={{
              border: "1px solid #1c1d1f",
            }}>
              <PersonIcon sx={{ color: 'text.disabled', fontSize: 20, marginLeft: '8px' }}></PersonIcon>
              <input
                type='text'
                id='FulName'
                name='FulName'
                className='ml-2 focus:outline-none focus:none focus:border-none'
                placeholder='Ad'
                autoComplete='true'
              />
            </div>
            <div className='mt-3 flex flex-row items-center h-12' style={{
              border: "1px solid #1c1d1f",
            }}>
              <Email sx={{ color: 'text.disabled', fontSize: 20, marginLeft: '8px' }}></Email>
              <input
                type='text'
                id='Email'
                name='Email'
                className='ml-2 focus:outline-none focus:none focus:border-none'
                placeholder='E-Posta'
                autoComplete='true'
              />
            </div>
            <div className='mt-3 flex flex-row items-center h-12' style={{
            border: "1px solid #1c1d1f",
          }}>
              <Lock sx={{ color: 'text.disabled', fontSize: 20, marginLeft: '8px' }}></Lock>
              <input
                type='password'
                id='Password'
                name='Password'
                className='ml-2 focus:outline-none focus:none focus:border-none'
                placeholder='Şifre'
                autoComplete='true'
              />
            </div>
            <button
              type='submit'
              className='mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-none text-white bg-purple-600 hover:bg-purple-700 focus:outline-none  focus:bg-purple-800'
            >
              Kayıt Ol
            </button>

            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ marginTop: 2, justifyContent: 'center' }}
            >
              <Grid
                item
                xs={12}
                sx={{ fontSize: 14, justifyContent: 'center', textAlign: 'center' }}
              >
                Zaten bir hesabınız var mı?
                <Link
                  sx={{ marginLeft: 2, fontSize: 14, cursor: 'pointer' }}
                  onClick={() => navigate('/SignIn')}
                >
                  Oturum Aç
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
