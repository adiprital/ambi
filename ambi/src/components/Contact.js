import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SendIcon from '@mui/icons-material/Send'
import Alert from '@mui/material/Alert';

const useStyles = makeStyles(theme => ({
    contactContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:'230px'
    }
}));

export default function Contact(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailHelper, setEmailHelper] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneHelper, setPhoneHelper] = useState('');
    const [message, setMessage] = useState('');

    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const hendleClickSuccessAlert = () => {
        setOpenSuccessAlert(true);
    };
    const handleCloseSuccessAlert = () => {
        setOpenSuccessAlert(false);
    };

    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const hendleClickErrorAlert = () => {
        setOpenErrorAlert(true);
    };
    const handleCloseErrorAlert = () => {
        setOpenErrorAlert(false);
    };

    const checkDisable = () => {
        let res = false;
        if ( name.length === 0 ||
            message.length === 0 ||
            email.length === 0 ||
            phone.length === 0 ||
            phoneHelper.length !== 0 ||
            emailHelper.length !== 0 ) {
                res = true;
            } else {
            res = false
        }
        return res;
    };

    const showMessageDetails = (severity) => {
        let message = {
            success: { alert: 'success', message: 'Message Sent Successfully!' },
            cancel: { alert: 'error', message: 'Message cancelled.' }
        };
        let alert = severity ? message.success : message.cancel;

        return (          
                <Alert
                    severity={alert.alert}
                    sx={{ width: '100%', vertical: 'bottom', horizontal: 'center' }}
                >
                    {alert.message}
                </Alert>
        );
    };

    const checkValidity = event => {
        let valid;
        switch (event.target.id) {
            case 'email':
                setEmail(event.target.value);
                valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value);
                if (!valid) {
                    setEmailHelper('Invalid email');
                } else {
                    setEmailHelper('');
                }
                break;

            case 'phone':
                setPhone(event.target.value);
                valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(event.target.value);
                if (!valid) {
                    setPhoneHelper('Invalid phone');
                } else {
                    setPhoneHelper('');
                }
                break;

            default:
                break;
        }
    };

    // const sendMessage = async () => {
    //     let baseUrl = (window.location.href).includes('localhost') ? 'localhost': 'ec2-44-203-23-164.compute-1.amazonaws.com';
    //     let currentUser = await axios.post(`http://${baseUrl}:8000/auth/send-message`, {
    //         name, email, phone, message
    //     }); // , {withCredentials: true }

    //     console.log('currentUser', currentUser.data);
    // };

    return (
        <Grid container direction='row'>
            <Grid
                item
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
                style={{marginBottom: matchesMD ? '5em' : 0,
                        marginTop: matchesSM ? '1em' : matchesMD ? '5em' : 0}}
            >
                <Grid item>
                    <Grid item container direction='column'>
                        {/*-----Contact Us----- */}
                        <Grid item style={{marginTop: '2em'}}>
                            <Typography
                                    align='center'
                                    variant='h2'
                                    style={{lineHeight: 1}}
                            >
                                Contact Us
                            </Typography>
                            <Typography
                                    variant=''
                                    style={{color: theme.palette.common.green}}
                                    align='center'
                            >
                                We're waiting.
                            </Typography>
                        </Grid>
                        {/*-----Phone Number----- */}
                        <Grid item container direction='column' style={{marginTop: '2em'}}>
                            <Grid item>
                                <Box className={classes.contactContainer} >
                                    <PhoneIcon sx={{ color: theme.palette.common.green }} />
                                    <Typography
                                        align='center'
                                        variant='subtitle1'
                                        style={{color: theme.palette.common.green,
                                                fontSize: '1rem'}}
                                    >
                                        <a href='tel:972527245136'
                                            style={{textDecoration: 'none', color: 'inherit'}}>
                                            (+972)-52-724-5136
                                        </a>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        {/*-----Email----- */}
                        <Grid item container direction='column' style={{marginTop: '1em', marginBottom: '2em'}}>
                            <Grid item>
                                <Box className={classes.contactContainer}>
                                    <MailOutlineIcon sx={{ color: theme.palette.common.green }} />
                                    <Typography
                                        align='center'
                                        variant='subtitle1'
                                        style={{color: theme.palette.common.green,
                                            fontSize: '1rem'}}
                                    >
                                        <a href='mailto:adiprital@gmail.com'
                                            style={{textDecoration: 'none', color: 'inherit'}}>
                                                adiprital@gmail.com
                                        </a>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        {/*-----Personal Details----- */}
                        <Grid item container direction='column' style={{maxWidth: '20em'}}>
                            <Grid item style={{marginBottom: '0.5em'}}>
                                <TextField
                                    label='Name'
                                    id='name'
                                    fullwidth="true"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    sx={{width: '230px'}}
                                />
                            </Grid>
                            <Grid item style={{marginBottom: '0.5em'}}>
                                <TextField
                                    label='Email'
                                    error={emailHelper.length !== 0}
                                    helperText={emailHelper}
                                    id='email'
                                    fullwidth="true"
                                    value={email}
                                    onChange={checkValidity}
                                    sx={{width: '230px'}}
                                />
                            </Grid>
                            <Grid item style={{marginBottom: '0.5em'}}>
                                <TextField
                                    label='Phone'
                                    error={phoneHelper.length !== 0}
                                    helperText={phoneHelper}
                                    id='phone'
                                    fullwidth="true"
                                    value={phone}
                                    onChange={checkValidity}
                                    sx={{width: '230px'}}
                                />
                            </Grid>
                            {/*-----Message----- */}
                            <Grid item style={{maxWidth: '20em'}}>
                                <TextField
                                    label='Message'
                                    value={message}
                                    multiline
                                    fullwidth="true"
                                    minRows={10}
                                    maxRows={10}
                                    id='message'
                                    sx={{width: '230px'}}
                                    onChange={(event) => setMessage(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            direction={matchesSM ? 'column' : 'row'}
                            style={{marginTop: '2em', marginBottom: '5em'}}
                            alignItems='center'
                            justifyContent='center'
                        >
                            {/*-----Send Message----- */}
                            <Grid item>                                
                                <Button
                                    disabled={checkDisable()}
                                    variant='contained'
                                    endIcon={ <SendIcon/> }
                                    onClick={() => {
                                        setMessage('');
                                        setPhone(''); 
                                        setEmail(''); 
                                        setName('');
                                        // sendMessage();
                                        hendleClickSuccessAlert();
                                        setTimeout(handleCloseSuccessAlert, 5000);
                                    }}
                                >
                                    Send Message
                                </Button>
                                {openSuccessAlert ? showMessageDetails(openSuccessAlert) : null}
                            </Grid>
                            {/*-----Cancel Message----- */}
                            <Grid item>
                                <Button
                                    style={{fontWeight: 300}}
                                    color='primary'
                                    onClick={() => {
                                        setMessage('');
                                        setPhone(''); 
                                        setEmail(''); 
                                        setName('');
                                        hendleClickErrorAlert();
                                        setTimeout(handleCloseErrorAlert, 5000);
                                    }}
                                >
                                    Cancel
                                </Button>
                                {openErrorAlert ? showMessageDetails(!openErrorAlert) : null}
                            </Grid> 

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};