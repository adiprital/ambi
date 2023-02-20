import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import SignIn from './SignIn'; 
import SignUp from './SignUp';
import SignOut from './SignOut';

const logInItemStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function LogIn() {
    const theme = useTheme();
    let navigate = useNavigate();
    const [openLogIn, setOpenLogIn] = useState(false);

    const user = useSelector((state) => state.userAuth).currentUser;

    const handleOpenLogIn = () => {
        setOpenLogIn(true);
    };

    const handleCloseLogIn = () => {
        setOpenLogIn(false);
    };

    const account = (
        <React.Fragment>
            <Typography align='center'variant='subtitle1' sx={{marginBottom: '25px'}}>
                Hello {user === undefined ? '' : user.email}
            </Typography>
            <Button
                variant='contained'
                onClick={() => {
                    handleCloseLogIn();
                    navigate('/account');
                }}
            >
                My Account
            </Button>
            <SignOut/>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <IconButton onClick={handleOpenLogIn} aria-label="login" disableRipple>
                <PersonIcon 
                    sx={{ color: theme.palette.common.white }} 
                />
            </IconButton>

            <Modal
                open={openLogIn}
                onClose={handleCloseLogIn}
            >
                <Box sx={logInItemStyle}>
                    <IconButton onClick={handleCloseLogIn}>
                        <CloseIcon />
                    </IconButton>
                    <Typography align='center' variant='h4' sx={{marginBottom: '25px'}}>Log In</Typography>
                    { user ? account : <Box>
                                        <SignIn/> 
                                        <SignUp/> 
                                       </Box> }
                </Box>
            </Modal>
        </React.Fragment>
    );
}