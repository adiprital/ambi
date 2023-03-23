import React, { useState, useEffect } from 'react';
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
    const [purchasesArray, setpurchasesArray] = useState([]);

    const user = useSelector((state) => state.userAuth).currentUser;
    console.log('user: ', user);

    useEffect(() => {
        const fetchPurchasesProducts = async () => {

            if (user) {
                const purchasesProductsId = Object.keys(user.purchases);
                const purchasesProductsAmount = Object.values(user.purchases);
                console.log('purchasesProductsId: ', purchasesProductsId);
                console.log('purchasesProductsAmount: ', purchasesProductsAmount);

                try { 
                    let baseUrl = (window.location.href).includes('localhost') ? 'localhost': 'ec2-44-203-23-164.compute-1.amazonaws.com';
                    const response = await axios.post(`http://${baseUrl}:8000/get-products-by-id`, { purchasesProductsId });
                    console.log('response: ', response);

                    // dispatch({ type: 'updateCurrentUser',  
                    // user: {
                    //     email: currentUser.data.user, 
                    //     balance: currentUser.data.balance,
                    //     purchases: currentUser.data.purchases //
                    // }});

                    setpurchasesArray(response.data);
                } catch(error){
                    console.log('error in fetch purchases Products', error)
                }
            }
          }

        fetchPurchasesProducts();
      }, []);



    const myPurchases = () => {

        return (
            <div>purchases</div>
        )

        // productsPurchases.map((purchase, i) => {
        //     return (
        //         <Grid
        //             key={`${purchase}${i}`}
        //             container
        //             direction='row'
        //             justifyContent={matchesSM ? 'center' : 'flex-end'}
        //             style={{marginTop: matchesSM ? '1em' : '5em',
        //                     marginRight: matchesSM ? '1em' : '5em',
        //                     marginBottom: matchesSM ? '2em' : '3em'}}
        //         >
        //             <Grid
        //                 item
        //                 style={{textAlign: matchesSM ? 'center' : 'right',
        //                         width: matchesSM ? undefined : '35em'}}
        //             >
        //                 <Typography variant='h4'>{purchase.name}</Typography>
        //                 <Typography variant='h4'>{purchase.amount}</Typography>

        //             </Grid>
        //         </Grid>
        //     )
        // })
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
                                {/* {purchases} */}
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