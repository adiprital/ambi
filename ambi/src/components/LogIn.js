import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';

import SignIn from './SignIn'; 
import SignUp from './SignUp';

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
    const [openLogIn, setOpenLogIn] = useState(false);

    const handleOpenLogIn = () => {
        setOpenLogIn(true);
    };

    const handleCloseLogIn = () => {
        setOpenLogIn(false);
    };

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
                    <SignIn/>
                    <SignUp/>
                </Box>
            </Modal>
        </React.Fragment>
    );
}