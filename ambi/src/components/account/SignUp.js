import React, { useState } from 'react';
import axios from 'axios';

// import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

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
    const [openSignUp, setOpenSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [emailHelper, setEmailHelper] = useState('');
    const [password, setPassword] = useState('');
    const [passwordHelper, setPasswordHelper] = useState('');
    const [signUpResult, setSignUpResult] = useState(undefined);

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
                valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(event.target.value);
                if (!valid) {
                    setPasswordHelper('Invalid Password. Password must contain minimum 8 characters, at least one letter and one number.');
                } else {
                    setPasswordHelper('');
                }
                break;

            default:
                break;
        }
    };

    const renderResult = () => {
        if (signUpResult) {
            let severity = signUpResult.success ? "success" : "error";
            return (
                <Alert
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {signUpResult.message}
                </Alert>
            );
        }
    }

    const handleSignUp = async () => {
        let baseUrl = (window.location.href).includes('localhost') ? 'localhost': 'ec2-44-203-23-164.compute-1.amazonaws.com';
        const currentUser = await axios.post(`http://${baseUrl}:8000/auth/signup`, {
            email, password
        });


        if (currentUser && currentUser.data) {
            setSignUpResult(currentUser.data);
        }

        setTimeout(() => {setSignUpResult(undefined)}, 5000);

    };

    return (
        <React.Fragment>
            <Button 
                variant='contained'
                aria-label="signin" 
                disableRipple 
                onClick={handleOpenSignUp}
            >
                Sign Up
            </Button>

            <Modal
                open={openSignUp}
                onClose={handleCloseSignUp}
            >
                <Box sx={signUpItemStyle}>
                    <IconButton onClick={handleCloseSignUp}>
                        <CloseIcon />
                    </IconButton>
                    <Typography align='center' variant='h4' sx={{marginBottom: '25px'}}>Sign Up</Typography>
                    <TextField 
                        label='Email'
                        error={emailHelper.length !== 0}
                        helperText={emailHelper}
                        id='email'
                        fullwidth="true"
                        value={email}
                        onChange={checkValidity}
                        style={{marginBottom: '0.5em'}}
                    />
                    <TextField 
                        id="password"
                        label="password"
                        type="password"
                        autoComplete="current-password"
                        error={passwordHelper.length !== 0}
                        helperText={passwordHelper}
                        fullwidth="true"
                        value={password}
                        onChange={checkValidity}
                        style={{marginBottom: '0.5em'}}
                    />
                    <Button 
                        variant='contained'
                        aria-label="signup" 
                        disabled={checkDisable()}
                        onClick={() => {
                            handleSignUp();
                            setEmail('');
                            setPassword('');
                        }}
                    >
                        Sign Up 
                    </Button>
                    {renderResult()}
                </Box>
            </Modal>
        </React.Fragment>
    );
}