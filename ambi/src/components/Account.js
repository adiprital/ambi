import React, { useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

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
    },
    learnButton: {
        height: 35,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: '2em'
        }
    },
    textContainer: {
        paddingLeft: '5em',
        paddingRight: '5em',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '1.5em',
            paddingRight: '1.5em',
        }
    }
}));

const accountItemStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Account() {
    const classes = useStyles();
    const [openAccount, setOpenAccount] = useState(false);

    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    const totalSum = useSelector((state => {
        return state.cartList
    })).totalSum;

    const handleOpenAccount = () => {
        setOpenAccount(true);
    };

    const handleCloseAccount = () => {
        setOpenAccount(false);
    };


    // return (
    //     <React.Fragment>
    //         <Button className={classes.learnButton} onClick={handleOpenAccount}>
    //             Account
    //         </Button>
                
    //         <Modal
    //             open={openAccount}
    //             onClose={handleCloseAccount}
    //         >
    //             <Box
    //                 className={classes.scrollBox}
    //                 sx={accountItemStyle}
    //             >
    //                 <IconButton>
    //                     <CloseIcon onClick={handleCloseAccount}/>
    //                 </IconButton>
    //                 <Typography align='center' variant='h4' sx={{marginBottom: '25px'}}>My Account</Typography>
    //                 <Typography align='center' variant='subtitle3' sx={{marginBottom: '25px'}}>
    //                     your balance: {totalSum} $ -- יטופל בהמשך
    //                 </Typography>
    //                 <Box className={classes.accountContentStyle}>
    //                     <Link
    //                         component="button"
    //                         underline="hover"
    //                         className={classes.link}
    //                     >
    //                         {'My orders'}
    //                     </Link>
    //                     <Link
    //                         component="button"
    //                         underline="hover"
    //                         className={classes.link}
    //                     >
    //                         {'My products'}
    //                     </Link>
    //                     <Link
    //                         component="button"
    //                         underline="hover"
    //                         className={classes.link}
    //                     >
    //                         {'For sale'}
    //                     </Link>
    //                 </Box>
    //             </Box>
    //         </Modal>
    //     </React.Fragment>
    // );


    return (
        <Grid container direction='column'>
            <Grid item container direction='row' className={classes.textContainer}>
                <Grid item container direction='column'>
                    <Grid item>
                        <Typography align='center' variant='h2'>My Account</Typography>
                    </Grid>
                    <Grid item style={{marginLeft: matchesSM ? 0 : '5em',
                                    textAlign: matchesSM ? 'center' : undefined}}
                    >
                        <Typography align='center' variant='subtitle3' sx={{marginBottom: '25px'}}>
                            your balance: {totalSum} $ -- יטופל בהמשך
                        </Typography>
                        <Button
                            component={Link}
                            to='/myorders'
                            variant='contained'
                            className={classes.learnButton}
                            style={{marginBottom: matchesSM ? '1em' : '5em'}}
                        >
                            <span>My Orders</span>
                        </Button>
                        <Button
                            component={Link}
                            to='/myproducts'
                            variant='contained'
                            className={classes.learnButton}
                            style={{marginBottom: matchesSM ? '1em' : '5em'}}
                        >
                            <span>My Products</span>
                        </Button>
                        <Button
                            component={Link}
                            to='/forsale'
                            variant='contained'
                            className={classes.learnButton}
                            style={{marginBottom: matchesSM ? '1em' : '5em'}}
                        >
                            <span>For Sale</span>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}