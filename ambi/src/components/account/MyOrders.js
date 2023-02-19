import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles(theme => ({
    contentStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '25px',
        marginBottom: '25px'
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

export default function MyOrders() {
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
                        <Typography align='center' variant='h2'>My Orders</Typography>
                        <Typography align='center'variant='subtitle1' sx={{marginBottom: '25px'}}>
                            Hello {user === undefined ? '' : user.email}
                        </Typography>
                        <Button
                            variant='contained'
                            style={{marginBottom: matchesSM ? '1em' : '5em', marginLeft: '25px'}}
                            onClick={() => { navigate('/account')}}
                        >
                            <span>My Account</span>
                        </Button>
                    </Grid>
                    <Grid item style={{marginLeft: matchesSM ? 0 : '5em',
                                    textAlign: matchesSM ? 'center' : undefined}}
                    >
                        <Box className={classes.contentStyle}>
                            <Typography align='center' variant='subtitle3' sx={{marginBottom: '25px'}}>
                                your balance: {user === undefined ? '0' : user.balance} $
                            </Typography>
                            {/* {renderMyOrdersItems()} */}
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}