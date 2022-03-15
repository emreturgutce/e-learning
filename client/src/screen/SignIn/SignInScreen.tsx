
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Email from '@mui/icons-material/Email'
import Lock from '@mui/icons-material/Lock'
import InputAdornment from '@mui/material/InputAdornment';
import HeaderContainer from '../../container/HeaderContainer';
import SignIn from '../../component/SignIn/SignIn';
import FooterContainer from '../../container/FooterContainer';

const theme = createTheme();

export default function SignInScreen() {

  return (
    <div>
      {/* <HeaderContainer></HeaderContainer> */}
      <SignIn></SignIn>
      {/* <FooterContainer></FooterContainer> */}
    </div>

  );
}
