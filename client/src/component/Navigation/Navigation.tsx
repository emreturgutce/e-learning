import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {AppBar, IconButton, Toolbar} from '@mui/material';
import SearchBar from './SearchBar/SearchBar';

import Button from '@mui/material/Button';
import MenuButtom from './MenuButtonm/MenuButtom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CartItems from '../Cart/CartItems';
import {useAuth} from '../../context/Auth/AuthContent';
import {logoutUser} from '../../api';
import LogoutIcon from '@mui/icons-material/Logout';
import AvatarMenu from "../AvatarMenu";
import {toast} from "react-toastify";

const Navigation = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null,
    );
    const userAuth = useAuth();
    const [loggedIn, setLoggedIn] = useState(userAuth?.loggedIn)
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

    useEffect(() => {
        setLoggedIn(userAuth?.loggedIn)
    }, [userAuth?.loggedIn])

    const handleLogout = () => {
        try {
            logoutUser();
            userAuth?.logout();
            navigate('SignIn');
            toast.success("Başarıyla çıkış yapıldı.")
        } catch (e) {
            console.error(e)
            toast.error("Çıkış işlemi sırasında hata meydana geldi.")
        }
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar
                position='static'
                sx={{
                    bgcolor: 'background.paper',
                    height: '4.5rem',
                    px: '2.4rem',
                    boxShadow: '0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)',
                }}
            >
                <Toolbar disableGutters sx={{my: 'auto', gap: 1}}>
                    <Box sx={{color: 'black'}}>
                        <Link to='/'>
                            <div className="flex align-middle">
                                <img src="/logo.png" alt="Udemy" width="45px" height="18px"/>
                                <span style={{
                                    height: "25px",
                                    alignSelf: "center",
                                    marginLeft: "8px",
                                    marginRight: "16px",
                                    fontWeight: "500",
                                }}>E-Learning</span>
                            </div>
                        </Link>
                    </Box>
                    <Box sx={{flexGrow: 2}}>
                        <SearchBar/>
                    </Box>
                    {loggedIn ? (
                        <>
                            {
                                userAuth?.user?.type === 'USER' && (
                                    <>
                                        <IconButton aria-describedby={id} onClick={handleOver}>
                                            <Badge badgeContent={cartItemCount} color='secondary'>
                                                <ShoppingCartOutlinedIcon
                                                    sx={{fontSize: 24, color: 'black'}}
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
                                )
                            }
                        </>

                    ) : null}

                    {!loggedIn ? (
                        <></>
                    ) : (
                        <Box sx={{color: 'black', display: 'flex', alignItems: 'center'}}>
                            <Link to='/myCourse' style={{marginRight: '12px'}}>Kurslarım</Link>
                            <AvatarMenu logout={handleLogout}/>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;
