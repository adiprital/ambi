import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container direction='column'>
            <Grid item container direction='row' className={classes.textContainer}>
                <Grid item container direction='column'>
                    <Grid item>
                        <Typography align='center' variant='h2'>For Sale</Typography>
                        <Typography align='center'variant='subtitle1' sx={{marginBottom: '25px'}}>
                            Hello
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
                                your balance:  $
                            </Typography>
                            {/* {renderSearchItems()} */}
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}