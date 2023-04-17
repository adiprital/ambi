import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import PurchaseProductItem from './PurchaseProductItem';

export default function MyOrders() {
    const theme = useTheme();
    let navigate = useNavigate();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const [purchasesArray, setpurchasesArray] = useState(undefined);

    const user = useSelector((state) => state.userAuth).currentUser;

    useEffect(() => {
        const fetchPurchasesProducts = async () => {
            if (user && user.purchases) {
                const purchasesProductsId = Object.keys(user.purchases);

                try { 
                    let baseUrl = (window.location.href).includes('localhost') ? 'localhost': 'ec2-44-203-23-164.compute-1.amazonaws.com';
                    const response = await axios.post(`http://${baseUrl}:8000/get-products-by-id`, { purchasesProductsId, user });

                    setpurchasesArray(response.data); 
                } catch(error){
                    console.log('error in fetch purchases Products', error)
                }
            }
          }

        fetchPurchasesProducts();
      }, [user]);

    const myPurchases = () => {
        if (purchasesArray){
            return (
                <div> 
                    <Grid item> 
                        {purchasesArray.map((purchase, i) => {
                            return (
                                <Grid 
                                    key={`${purchase}${i}`}
                                    container
                                    direction='row'           
                                >
                                    <Grid item> 
                                        <PurchaseProductItem 
                                            productName={purchase.name} 
                                            amount={purchase.amount}
                                            link={`/${purchase.name.replace(/\s/g, '').toLowerCase()}`}
                                        />
                                    </Grid> 
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            )
        }
    }

    let purchases = myPurchases();

    const progress = (
        <div>
            <Box>
                <CircularProgress/>
            </Box> 
        </div>
    );
    
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
                            <Typography align='center' variant='h2' style={{lineHeight: 1, marginBottom: '20px'}}>
                                My Products
                            </Typography>

                            <Grid item align='center'>
                                <Button
                                    variant='contained'
                                    style={{marginBottom: matchesSM ? '1em' : '2em', marginTop: '1em'}}
                                    onClick={() => { navigate('/account')}}
                                >My Account</Button>
                            </Grid>

                            <Typography align='center' variant='subtitle1' sx={{marginBottom: '25px'}}>
                                Your purchases: 
                                { user && user.purchases === undefined ? ' No purchases were made.' : purchasesArray === undefined ? progress : '' }
                                { user === undefined ? '' : purchases }
                            </Typography>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>                    
    )
}