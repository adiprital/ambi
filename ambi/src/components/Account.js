import React, { useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';

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
    },
    scrollBox: {
        height: '75%',
        // height: 'auto',
        overflowY: 'scroll'
    },
    accountContentStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

const accountItemStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Account() {
    const classes = useStyles();
    const [openAccount, setOpenAccount] = useState(false);

    const handleOpenAccount = () => {
        setOpenAccount(true);
    };

    const handleCloseAccount = () => {
        setOpenAccount(false);
    };


    return (
        <React.Fragment>
            <IconButton aria-label="account" disableRipple>
                <PersonIcon className={classes.profileIcon} onClick={handleOpenAccount}/>
            </IconButton>

            <Modal
                open={openAccount}
                onClose={handleCloseAccount}
            >
                <Box
                    className={classes.scrollBox}
                    sx={accountItemStyle}
                >
                    <IconButton>
                        <CloseIcon onClick={handleCloseAccount}/>
                    </IconButton>
                    <Typography variant='h4'>My Account</Typography>
                    <Typography variant='subtitle3' sx={{marginBottom: '25px'}}>Account's items:</Typography>
                    <Box className={classes.accountContentStyle}>
                        <Typography align='center' variant='subtitle3' sx={{marginTop: '25px'}}>
                            something to show here
                        </Typography>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}