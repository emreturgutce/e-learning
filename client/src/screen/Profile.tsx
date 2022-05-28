import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Container,
    Tooltip,
} from '@material-ui/core';
import {VerifiedUser} from '@material-ui/icons';
import {useAuth} from "../context/Auth/AuthContent";
import {getUser, saveProfile} from '../api'
import {useNavigate} from "react-router-dom";


const Profile = () => {
    const authContext = useAuth()
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState(authContext?.user?.firstname);
    const [lastName, setLastName] = useState(authContext?.user?.lastname);
    const [email, setEmail] = useState(authContext?.user?.email);

    const handleSubmit = async (e: any) => {
        try {
            if (firstName && lastName) {
                await saveProfile(firstName, lastName)
                getUser().then((data) => {
                    console.log("App", data);
                    authContext?.login(data.data.data.user)
                    setFirstName(data.data.data.user.firstname)
                    setLastName(data.data.data.user.lastname)
                    setEmail(data.data.data.user.email)
                }).catch(() => {
                    navigate('/SignIn')
                });
            }
        } catch (e) {
            console.error(e)
        }
    };


    return (
        <Container>
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
                style={{marginTop: '3rem'}}
            >
                <Grid item style={{marginBottom: '1rem', width: '100%'}}>
                    <form autoComplete="off">
                        <Card>
                            <CardHeader
                                subheader="Detay bilgileri değiştirilebilir."
                                title="Profil"
                                titleTypographyProps={{
                                    style: {
                                        color: 'rgba(0, 0, 0, 0.54)',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        lineHeight: 1.6,
                                        letterSpacing: '0.0075em',
                                    },
                                }}
                                avatar={
                                    <Tooltip title="Onaylanmış kullanıcı">
                                        <VerifiedUser
                                            style={{color: '#4caf50'}}
                                        />
                                    </Tooltip>
                                }
                            />
                            <Divider/>
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Ad"
                                            name="firstName"
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            value={firstName}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Soyad"
                                            name="lastName"
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            value={lastName}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Email Adresi"
                                            name="email"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            disabled
                                            required
                                            value={email}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider/>
                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                p={2}
                            >
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    onClick={handleSubmit}
                                >
                                    Detayları Kaydet
                                </Button>
                            </Box>
                        </Card>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;
