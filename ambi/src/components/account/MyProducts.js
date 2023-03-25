import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const useStyles = makeStyles(theme => ({
    cardContainer: {
        position: 'center',
        marginBottom: '35px',
        boxShadow: theme.shadows[10],
        borderRadius: 15,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 0,
            paddingRight: 0,
            borderRadius: 0,
            width: '100%'
        }
    }
}));

export default function MyOrders() {
    const classes = useStyles();
    const theme = useTheme();
    let navigate = useNavigate();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const [purchasesArray, setpurchasesArray] = useState([]);

    const user = useSelector((state) => state.userAuth).currentUser;

    useEffect(() => {
        const fetchPurchasesProducts = async () => {
            if (user) {
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
                                    <Card 
                                        className={classes.cardContainer} 
                                        style={{backgroundColor: 'transparent'}}
                                    >
                                        <CardContent>
                                            <Typography variant='h4'>{purchase.name}</Typography>
                                            <Typography variant='subtitle1'>amount: {purchase.amount}.</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid> 
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    }

    let purchases = myPurchases();
    
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

                            <Typography align='center' variant='subtitle1'>
                                Hello { user === undefined ? '' : user.email }
                            </Typography>
                            
                            <Typography align='center' variant='subtitle1' sx={{marginBottom: '25px'}}>
                                your balance: { user === undefined ? '0' : user.balance } $
                            </Typography>

                            <Typography align='center' variant='subtitle1' sx={{marginBottom: '25px'}}>
                                your purchases: { user === undefined ? '' : purchases }
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