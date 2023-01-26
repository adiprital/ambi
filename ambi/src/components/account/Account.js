import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import SignOut from './SignOut';

const useStyles = makeStyles(theme => ({
    accountContentStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '25px',
        marginBottom: '25px'
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

export default function Account() {
    const classes = useStyles();
    const theme = useTheme();
    let navigate = useNavigate();

    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    const user = useSelector((state) => state.userAuth).currentUser;
           
    return (
        <Grid container direction='column'>
            <Grid item container direction='row' className={classes.textContainer}>
                <Grid item container direction='column'>
                    <Grid item>
                        <Typography align='center' variant='h2'>My Account</Typography>
                        <Typography align='center'variant='subtitle1' sx={{marginBottom: '25px'}}>
                            Hello {user === undefined ? '' : user.email}
                        </Typography>
                        <SignOut/>
                    </Grid>
                    <Grid item style={{marginLeft: matchesSM ? 0 : '5em',
                                    textAlign: matchesSM ? 'center' : undefined}}
                    >
                        <Typography align='center' variant='subtitle3' sx={{marginBottom: '25px'}}>
                            your balance: {user === undefined ? '0' : user.balance} $
                        </Typography>
                        <Box className={classes.accountContentStyle}> 
                            <Button
                                variant='contained'
                                className={classes.learnButton}
                                style={{marginBottom: matchesSM ? '1em' : '5em', marginLeft: '25px'}}
                                onClick={() => { navigate('/myorders')}}
                            >
                                <span>My Orders</span>
                            </Button>
                            <Button
                                variant='contained'
                                className={classes.learnButton}
                                style={{marginBottom: matchesSM ? '1em' : '5em', marginLeft: '25px'}}
                                onClick={() => { navigate('/myproducts')}}
                            >
                                <span>My Products</span>
                            </Button>
                            <Button
                                variant='contained'
                                className={classes.learnButton}
                                style={{marginBottom: matchesSM ? '1em' : '5em', marginLeft: '25px'}}
                                onClick={() => { navigate('/forsale')}}
                            >
                                <span>For Sale</span>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}