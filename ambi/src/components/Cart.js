import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

import CartItem from './CartItem';

const useStyles = makeStyles(theme => ({
    cartIcon: {
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
    cartContentStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

const cartItemStyle = {
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

export default function Cart() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openCart, setOpenCart] = useState(false);
    const [resultsArray, setResultsArray] = useState([]);

    const cart = useSelector((state) => {
        return state.cartList
    }).cartData;

    const totalSum = useSelector((state => {
        return state.cartList
    })).totalSum;

    const user = useSelector((state) => state.userAuth).currentUser;

    const handleOpenCart = () => {
        setOpenCart(true);
    };

    const handleCloseCart = () => {
        setOpenCart(false);
    };

    const renderCartItems = () => {
        const keys = Object.keys(cart);
        return keys.map((productName, index) => {
            if (cart[productName] > 0) {
                return (<CartItem 
                    key={index} 
                    productName={productName} 
                    amount={cart[productName]}
                    />
                );
            }
        });
    };

    const totalAmountInCart = () => {
        const values = Object.values(cart);
        return values.reduce((acc, curr) => acc + curr, 0);
    };  

    const purchaseResults = () => {
        return resultsArray.map((result, i)=> {
            let severity = result.isSuccess ? "success" :
                            result.warning ? "warning" : "error"
            return (
                    <Alert
                        key={i} 
                        severity={severity}
                        sx={{ width: '100%' }}
                    >
                        {result.message}
                    </Alert>
                );
        });
    }

    const buyProducts = async () => {
        let token = localStorage.getItem('token');
        const promises_array = await axios.post(`http://localhost:8000/buy-products`, { cart }, 
                                        { withCredentials: true, 
                                          headers: {token} });
        dispatch({ type: 'updateCurrentUser',  
                   user: {
                        email: promises_array.data.email, 
                        balance: promises_array.data.balance
                }});
        
        const results = await Promise.all(promises_array.data.filteredResults);
        const filteredResults = results.filter(result => result !== undefined);

        setResultsArray(filteredResults);
        setTimeout(() => {
            setResultsArray([])
        }, 10000);
    };

    const checkDisable = () => {
        let res = false;
        if ( user === undefined ) {
                res = true;
        } else {
            res = false;
        }
        return res;
    };

    return (
        <React.Fragment>
            <IconButton onClick={handleOpenCart} aria-label="cart" disableRipple>
                <Badge color="secondary" badgeContent={totalAmountInCart()} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                    <ShoppingCartIcon className={classes.cartIcon}  />
                </Badge>
            </IconButton>
            <Modal
                open={openCart}
                onClose={handleCloseCart}
            >
                <Box
                    className={classes.scrollBox}
                    sx={cartItemStyle}
                >
                    <IconButton onClick={handleCloseCart}>
                        <CloseIcon />
                    </IconButton>
                    <Typography align='center' variant='h4'>My Cart</Typography>
                    <Typography align='center'variant='subtitle1' sx={{marginBottom: '25px'}}>
                        Hello {user === undefined ? '' : user.email}
                    </Typography>
                    <Typography align='center'variant='subtitle3' sx={{marginBottom: '25px'}}>Cart's items:</Typography>
                    <Box className={classes.cartContentStyle}>
                        {renderCartItems()}
                        <Typography align='center' variant='subtitle3' sx={{marginTop: '25px'}}>
                            Total:  { totalSum < 0 ? '0': totalSum} $
                        </Typography>
                        <Button 
                            sx={{marginTop:"15px"}} 
                            disabled={checkDisable()} 
                            onClick={buyProducts}
                        >checkout
                        </Button>
                        {purchaseResults()}
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    )
}