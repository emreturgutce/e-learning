import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import SearchBar from './SearchBar/SearchBar';

import Button from '@mui/material/Button';
import MenuButtom from './MenuButtonm/MenuButtom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CartItems from '../Cart/CartItems';
import { useAuth } from '../../context/Auth/AuthContent';
import { logoutUser } from '../../api';

const Navigation = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const userAuth = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();
  const handleOver = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{
          bgcolor: 'background.paper',
          height: '4.5rem',
          px: '2.4rem',
          boxShadow: '0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)',
        }}
      >
        <Toolbar disableGutters sx={{ my: 'auto', gap: 1 }}>
          <Box sx={{ color: 'black' }}>
            <Link to='/'>Udemy</Link>
          </Box>
          <Box sx={{ flexGrow: 2 }}>
            <SearchBar />
          </Box>
          {userAuth?.loggedIn ? (
            <>
              <Box sx={{ color: 'black' }}>
                <Link to='/shoppingCart'>Cart</Link>
              </Box>

              <IconButton aria-describedby={id} onClick={handleOver}>
                <Badge badgeContent={cartItemCount} color='secondary'>
                  <ShoppingCartOutlinedIcon
                    sx={{ fontSize: 24, color: 'black' }}
                  />
                </Badge>
              </IconButton>
              <Popover
                id={id}
                sx={{
                  marginTop: 3,
                }}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div>
                  <CartItems></CartItems>
                </div>
              </Popover>
            </>
          ) : null}

          {!userAuth?.loggedIn ? (
            <div>
              <Button variant='outlined' size='medium' sx={{ marginRight: 1 }}>
                {' '}
                <Link to='/SignIn'>Signin</Link>
              </Button>
              <Button variant='outlined' size='medium'>
                {' '}
                <Link to='/SignUp'> Signup </Link>
              </Button>
            </div>
          ) : (
            <Box sx={{ color: 'black' }}>
              <Link to='/myCourse'>MyCourse {userAuth?.user?.email}</Link>
              <Button
                variant='outlined'
                size='medium'
                onClick={() => {
                  logoutUser();
                  userAuth.logout();
                  navigate('SignIn');
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
