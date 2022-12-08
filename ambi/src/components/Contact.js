import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SendIcon from '@mui/icons-material/Send';

const useStyles = makeStyles(theme => ({
    message: {
        border: `2px solid ${theme.palette.common.green}`,
        marginTop: '5em',
        borderRadius: 5
    },
    sendButton: {
        borderRadius: 50,
        height: 45,
        width: 245,
        fontSize: '1rem',
        backgroundColor: theme.palette.common.green,
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

    const [open, setOpen] = useState(false);

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
                                    fullWidth
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
                                    fullWidth
                                    value={email}
                                    // onChange={onChange}
                                />
                            </Grid>
                            <Grid item style={{marginBottom: '0.5em'}}>
                            <TextField
                                    label='Phone'
                                    error={phoneHelper.length !== 0}
                                    helperText={phoneHelper}
                                    id='phone'
                                    fullWidth
                                    value={phone}
                                    // onChange={onChange}
                                />
                            </Grid>
                        </Grid>
                        {/*-----Message----- */}
                        <Grid item style={{maxWidth: '20em'}}>
                            <TextField
                                InputProps={{disableUnderline: true}}
                                value={message}
                                className={classes.message}
                                multiline
                                fullWidth
                                minRows={10}
                                id='message'
                                onChange={(event) => setMessage(event.target.value)}
                            />
                        </Grid>
                        <Grid item container justifyContent='center' style={{marginTop: '2em'}}>
                            <Button
                                // disabled={ name.length === 0 ||
                                //            message.length === 0 ||
                                //            phoneHelper.length !== 0 ||
                                //            emailHelper.length !== 0 ||
                                //            email.length === 0 ||
                                //            phone.length === 0
                                //         }
                                variant='contained'
                                className={classes.sendButton}
                                onClick={() => setOpen(true)}
                                style={{marginBottom: '5em'}}
                            >
                                Send Message
                                <SendIcon style={{marginLeft: '1em'}}/>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/*-----Confirm Message----- */}
            <Dialog
                style={{zIndex: 1302}}
                open={open}
                fullScreen={matchesXS}
                onClose={() => setOpen(false)}
                PaperProps={{style: {
                                    backgroundColor: 'white',
                                    paddingTop: matchesXS ? '1em' : '5em',
                                    paddingBottom: matchesXS ? '1em' : '5em',
                                    paddingLeft: matchesXS ? 0 : matchesSM ? 0 : matchesMD ? '15em' : '25em',
                                    paddingRight: matchesXS ? 0 : matchesSM ? 0 : matchesMD ? '15em' : '25em'}}}
            >
                <DialogContent>
                    <Grid container direction='column'>
                        <Grid item>
                            <Typography align='center' variant='h4' gutterBottom>
                                Confirm Message
                            </Typography>
                        </Grid>
                        <Grid item style={{marginBottom: '0.5em'}}>
                            <TextField
                                label='Name'
                                id='name'
                                fullWidth
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
                                fullWidth
                                value={email}
                                // onChange={onChange}
                            />
                        </Grid>
                        <Grid item style={{marginBottom: '0.5em'}}>
                            <TextField
                                label='Phone'
                                error={phoneHelper.length !== 0}
                                helperText={phoneHelper}
                                id='phone'
                                fullWidth
                                value={phone}
                                // onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid item style={{maxWidth: matchesXS ? '100%' : '20em'}}>
                        <TextField
                            InputProps={{disableUnderline: true}}
                            value={message}
                            className={classes.message}
                            multiline
                            fullWidth
                            minRows={10}
                            id='message'
                            onChange={(event) => setMessage(event.target.value)}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        direction={matchesSM ? 'column' : 'row'}
                        style={{marginTop: '2em'}}
                        alignItems='center'
                    >
                        <Grid item>
                            <Button
                                style={{fontWeight: 300}}
                                color='primary'
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                // disabled={ name.length === 0 ||
                                //            message.length === 0 ||
                                //            phoneHelper.length !== 0 ||
                                //            emailHelper.length !== 0 ||
                                //            email.length === 0 ||
                                //            phone.length === 0
                                //         }
                                variant='contained'
                                className={classes.sendButton}
                                // onClick={onConfirm}
                            >
                                Send Message
                                <SendIcon style={{marginLeft: '1em'}}/>
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Grid>
    );
};