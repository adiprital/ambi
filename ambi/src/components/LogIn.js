import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';

import SignIn from './SignIn'; 
import SignUp from './SignUp';
import Account from './Account';

import { Button } from '@mui/material';

const useStyles = makeStyles(theme => ({
    profileIcon: {
        ...theme.typography.tab,
        height: '50px',
        width: '50px',
        marginLeft: '25px',
        '&:hover': {
            opacity: 1,
            color: theme.palette.common.white
        }
    }
}));

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
    const classes = useStyles();
    let navigate = useNavigate();
    const [openLogIn, setOpenLogIn] = useState(false);

    const user = useSelector((state) => state.userAuth).currentUser;
    console.log('user', user);

    const handleOpenLogIn = () => {
        setOpenLogIn(true);
    };

    const handleCloseLogIn = () => {
        setOpenLogIn(false);
    };

    const account = (
        <React.Fragment>
            <Button
                onClick={() => {
                    handleCloseLogIn();
                    navigate('/account');
                }}
            >
                My Account
            </Button>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <IconButton aria-label="login" disableRipple>
                <PersonIcon className={classes.profileIcon} onClick={handleOpenLogIn}/>
            </IconButton>

            <Modal
                open={openLogIn}
                onClose={handleCloseLogIn}
            >
                <Box sx={logInItemStyle}>
                    <IconButton>
                        <CloseIcon onClick={handleCloseLogIn}/>
                    </IconButton>
                    <Typography align='center' variant='h4' sx={{marginBottom: '25px'}}>Log In</Typography>
                    { user ? account : <Box> <SignIn/> <SignUp/> </Box> }
                </Box>
            </Modal>
        </React.Fragment>
    );
}