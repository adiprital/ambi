import React, { useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { useSelector } from 'react-redux';

import Link from '@mui/material/Link';
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
    },
    link: {
        color: theme.palette.common.green,
        fontSize: '1rem',
        fontWeight: 'bold',
        textDecoration: 'none'
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

    const totalSum = useSelector((state => {
        return state.cartList
    })).totalSum;

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
                    <Typography align='center' variant='h4'>My Account</Typography>
                    <Typography align='center' variant='subtitle3' sx={{marginBottom: '25px'}}>
                        your balance: {totalSum} $ -- יטופל בהמשך
                    </Typography>
                    <Box className={classes.accountContentStyle}>
                        <Link
                            component="button"
                            underline="hover"
                            className={classes.link}
                        >
                            {'My orders'}
                        </Link>
                        <Link
                            component="button"
                            underline="hover"
                            className={classes.link}
                        >
                            {'My products'}
                        </Link>
                        <Link
                            component="button"
                            underline="hover"
                            className={classes.link}
                        >
                            {'For sale'}
                        </Link>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}