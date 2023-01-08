import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(theme => ({
    signUpButton: {
        height: 45,
        width: 245,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        }
    }
}));

const signUpItemStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 270,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SignIn() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openSignUp, setOpenSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [emailHelper, setEmailHelper] = useState('');
    const [password, setPassword] = useState('');
    const [passwordHelper, setPasswordHelper] = useState('');
    
    const handleOpenSignUp = () => {
        setOpenSignUp(true);
    };

    const handleCloseSignUp = () => {
        setOpenSignUp(false);
    };

    const checkDisable = () => {
        let res = false;
        if ( email.length === 0 ||
            password.length === 0 ||
            passwordHelper.length !== 0 ||
            emailHelper.length !== 0 ) {
                res = true;
            } else {
            res = false
        }
        return res;
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

            case 'password':
                setPassword(event.target.value);
                valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(event.target.value);
                if (!valid) {
                    setPasswordHelper('Incorrect Password');
                } else {
                    setPasswordHelper('');
                }
                break;

            default:
                break;
        }
    };

    const handleSignUp = async () => {
        let currentUser = await axios.post('http://localhost:8000/auth/signup', {
            email, password
        });
        dispatch({ type: 'updateCurrentUser', 
            user: {
                email: currentUser.data.user, 
                balance: currentUser.data.balance
        }});
    };

    return (
        <React.Fragment>
            <Button aria-label="signin" disableRipple onClick={handleOpenSignUp}>
                Sign Up
            </Button>

            <Modal
                open={openSignUp}
                onClose={handleCloseSignUp}
            >
                <Box sx={signUpItemStyle}>
                    <IconButton>
                        <CloseIcon onClick={handleCloseSignUp}/>
                    </IconButton>
                    <Typography align='center' variant='h4' sx={{marginBottom: '25px'}}>Sign Up</Typography>
                    <TextField 
                        label='Email'
                        error={emailHelper.length !== 0}
                        helperText={emailHelper}
                        id='email'
                        fullwidth
                        value={email}
                        onChange={checkValidity}
                        style={{marginBottom: '0.5em'}}
                    />
                    <TextField 
                        label='Password'
                        error={passwordHelper.length !== 0}
                        helperText={passwordHelper}
                        id='password'
                        fullwidth
                        value={password}
                        onChange={checkValidity}
                        style={{marginBottom: '0.5em'}}
                    />
                    <Button 
                        className={classes.signUpButton}
                        aria-label="signup" 
                        disabled={checkDisable()}
                        onClick={handleSignUp}
                    >
                        Sign Up 
                    </Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}