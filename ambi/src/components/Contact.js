import React, { useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles(theme => ({
    message: {
        border: `2px solid ${theme.palette.common.green}`,
        marginTop: '5em',
        borderRadius: 5
    },
    sendButton: {
        height: 45,
        width: 245,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        },
        [theme.breakpoints.down('sm')]: {
            height: 40,
            width: 225
        }
    },
    icon :{
        color: theme.palette.common.green
    },
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
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailHelper, setEmailHelper] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneHelper, setPhoneHelper] = useState('');
    const [message, setMessage] = useState('');
    const [sendMessage, setSendMessage] = useState(false);

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

    const renderResults = (severity) => {
        const messageSentSuccessfully = {alert: 'success', message: 'Message Sent Successfully!'};
        const messageFailed = {alert: 'error', message: 'Message Failed!'};
        let alert = severity ? messageSentSuccessfully : messageFailed;
        return (
            <Alert
                severity={alert.alert}
                sx={{ width: '100%' }}
            >
                {alert.message}
            </Alert>
        );

    }

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
                    <Grid container direction='column'>
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
                                    <PhoneIcon className={classes.icon} />
                                    <Typography
                                        align='center'
                                        variant='subtitle1'
                                        style={{color: theme.palette.common.green,
                                                fontSize: '1rem'}}
                                    >
                                        <a href='tel:972527245135'
                                            style={{textDecoration: 'none', color: 'inherit'}}>
                                            (+972)-52-724-5135
                                        </a>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        {/*-----Email----- */}
                        <Grid item container direction='column' style={{marginTop: '1em', marginBottom: '2em'}}>
                            <Grid item>
                                <Box className={classes.contactContainer}>
                                    <MailOutlineIcon className={classes.icon} />
                                    <Typography
                                        align='center'
                                        variant='subtitle1'
                                        style={{color: theme.palette.common.green,
                                            fontSize: '1rem'}}
                                    >
                                        <a href='mailto:pritalyael@gmail.com'
                                            style={{textDecoration: 'none', color: 'inherit'}}>
                                                pritalyael@gmail.com
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
                                    fullwidth
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </Grid>
                            <Grid item style={{marginBottom: '0.5em'}}>
                                <TextField
                                    label='Email'
                                    error={emailHelper.length !== 0}
                                    helperText={emailHelper}
                                    id='email'
                                    fullwidth
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </Grid>
                            <Grid item style={{marginBottom: '0.5em'}}>
                            <TextField
                                    label='Phone'
                                    error={phoneHelper.length !== 0}
                                    helperText={phoneHelper}
                                    id='phone'
                                    fullwidth
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                />
                            </Grid>
                            {/*-----Message----- */}
                            <Grid item style={{maxWidth: '20em'}}>
                                <TextField
                                    label='Message'
                                    InputProps={{disableUnderline: true}}
                                    value={message}
                                    className={classes.message}
                                    multiline
                                    fullwidth
                                    minRows={10}
                                    id='message'
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
                            <Grid item>
                                <Button
                                    disabled={checkDisable()}
                                    variant='contained'
                                    className={classes.sendButton}
                                    onClick={() => {
                                        setMessage('');
                                        setPhone(''); 
                                        setEmail(''); 
                                        setName('');
                                        renderResults(true);
                                        // setSendMessage(true);
                                    }}
                                >
                                    Send Message
                                    <SendIcon style={{marginLeft: '1em'}}/>
                                </Button>
                                {renderResults(true)}
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{fontWeight: 300}}
                                    color='primary'
                                    onClick={() => {
                                        setMessage('');
                                        setPhone(''); 
                                        setEmail(''); 
                                        setName('');
                                        renderResults(false);
                                        // setSendMessage(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                {renderResults(false)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};