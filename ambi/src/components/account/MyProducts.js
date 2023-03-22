import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function MyOrders() {
    const theme = useTheme();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

    const user = useSelector((state) => state.userAuth).currentUser;
    console.log('user: ', user);

    const myPurchases = async () => {
        let baseUrl = (window.location.href).includes('localhost') ? 'localhost': 'ec2-44-203-23-164.compute-1.amazonaws.com';
        const purchasesArray = await axios.get(`http://${baseUrl}:8000/buy-products`);
        console.log('purchasesArray: ', purchasesArray.data);

        // dispatch({ type: 'updateCurrentUser',  
        //     user: {
        //         email: promises_array.data.email, 
        //         balance: promises_array.data.balance
        // }});

    //     // const results = await Promise.all(purchasesArray.data);
    //     // const filteredResults = results.filter(result => result !== undefined);

    //     // setResultsArray(filteredResults);
    //     // setTimeout(() => {
    //     //     setResultsArray([])
    //     // }, 10000);

    }

    return (
        <Grid container direction='row'>
            <Grid
                item
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
                style={{marginBottom: matchesMD ? '5em' : 0,
                        marginTop: matchesSM ? '1em' : matchesMD ? '5em' : 0}}
            >
                <Grid item>            
                    <Grid item container direction='column'>
                        <Grid item style={{marginTop: '2em'}}>
                            <Typography align='center' variant='h2' style={{lineHeight: 1, marginBottom: '20px'}}>My Products</Typography>
                            <Typography align='center' variant='subtitle1'>
                                Hello { user === undefined ? '' : user.email }
                            </Typography>
                            
                            <Typography align='center' variant='subtitle1' sx={{marginBottom: '25px'}}>
                                your balance: { user === undefined ? '0' : user.balance } $
                            </Typography>
                        </Grid>

                        <Grid item style={{ marginLeft: matchesSM ? 0 : '5em',
                                        textAlign: matchesSM ? 'center' : undefined }} >
                            <Grid
                                item
                                container
                                direction={matchesSM ? 'column' : 'row'}
                                style={{marginTop: '2em', marginBottom: '5em'}}
                                alignItems='center'
                                justifyContent='center'
                            >
                                <Grid item>
                                    <Button
                                        variant='contained'
                                        style={{marginBottom: matchesSM ? '1em' : '5em', marginLeft: '25px'}}
                                        onClick={() => { navigate('/account')}}
                                    >My Account</Button>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>                    
    )
}