import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {useUserContext} from "../context/User/UserContext";
import {useAuth} from "../context/Auth/AuthContent";
import {deepPurple} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";
import QuizIcon from '@mui/icons-material/Quiz';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';

interface Props {
    logout: () => void
}

export default function AvatarMenu(props: Props) {
    const navigate = useNavigate();
    const userAuth = useAuth()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRedirectUnapprovedExams = () => {
        navigate("/unapproved-exams")
    }

    const handleRedirectCourseCreate = () => {
        navigate("/createCourse")
    }

    const handleRedirectProfile = () => {
        navigate("/profile")
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32, bgcolor: deepPurple[500] }}>{userAuth?.user?.firstname?.substring(0, 1) || 'M'}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleRedirectProfile}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: deepPurple[500] }}>{userAuth?.user?.firstname?.substring(0, 1) || 'M'}</Avatar> Profil
                </MenuItem>
                <Divider />
                {
                    userAuth?.user?.type === 'INSTRUCTOR' && (
                        <MenuItem onClick={() => handleRedirectUnapprovedExams()}>
                            <ListItemIcon>
                                <QuizIcon fontSize="small" />
                            </ListItemIcon>
                            Onaylanmamış Sınavlar
                        </MenuItem>
                    )
                }
                {
                    userAuth?.user?.type === 'INSTRUCTOR' && (
                        <MenuItem onClick={() => handleRedirectCourseCreate()}>
                            <ListItemIcon>
                                <BookOutlinedIcon fontSize="small" />
                            </ListItemIcon>
                            Kurs Oluştur
                        </MenuItem>
                    )
                }
                <MenuItem onClick={() => props.logout()}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Çıkış Yap
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
