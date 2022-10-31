import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import CartItem from './CartItem';

const useStyles = makeStyles(theme => ({
    cartIcon: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: '25px',
        '&:hover': {
            opacity: 1,
            color: theme.palette.common.white
        }
    }
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const cartItemStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

const cartContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

export default function Cart() {
    const classes = useStyles();
    const [openCart, setOpenCart] = useState(false);
    const [openCheckoutSnackbar, setOpenCheckoutSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState([]);

    const handleOpenCart = () => {
        setOpenCart(true);
    };

    const handleCloseCart = () => {
        setOpenCart(false);
    };

    const handleOpenCheckout = () => {
        setOpenCheckoutSnackbar(true);
    };

    const handleCloseCheckout = () => {
        setOpenCheckoutSnackbar(false);
    };

    const cart = useSelector((state) => {
        return state.cartList
    }).cartData;

    const renderCartItems = () => {
        const keys = Object.keys(cart);
        return keys.map((productName, index) => {
            if (cart[productName] > 0) {
                return (<CartItem key={index} productName={productName} amount={cart[productName]}/>);
            }
        });
    };

    const totalAmountInCart = () => {
        const values = Object.values(cart);
        return values.reduce((acc, curr) => acc + curr, 0);
    };

    const buyProducts = async () => {
        const keys = Object.keys(cart);
        const promises_array = keys.map(async (productName) => {
            if (cart[productName] > 0) {
                 return await axios.post(`http://localhost:8000/buy-products`, {
                    name: productName,
                    amount: cart[productName]
                })
            }
        });

        const results = await Promise.all(promises_array);
        const filteredResults = results.filter(result => result !== undefined);
        const messageToShow = filteredResults.map(obj => {
            return obj.data;
        });

        messageToShow.forEach((i, index) => {
            setMessage(messageToShow[index].message);
            setStatus([]); // not good. every loop inelizing status to empty array
            status.push(messageToShow[index].isSuccess);
        });

        console.log('status: ', status);
        console.log('messageToShow', messageToShow);
        console.log('filteredResults', filteredResults);
        console.log('results', results);
    };

    const purchaseSuccess = (
        <React.Fragment>
            <Stack>
                <Button variant="outlined" onClick={handleOpenCheckout}>
                    checkout success
                </Button>
                <Snackbar open={openCheckoutSnackbar} autoHideDuration={6000} onClose={handleCloseCheckout}>
                    <Alert onClose={handleCloseCheckout} severity="success" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </Stack>
        </React.Fragment>
    );

    const purchaseFailed = (
        <React.Fragment>
            <Stack>
                <Button variant="outlined" onClick={handleOpenCheckout}>
                    checkout failed
                </Button>
                <Snackbar open={openCheckoutSnackbar} autoHideDuration={6000} onClose={handleCloseCheckout}>
                    <Alert onClose={handleCloseCheckout} severity="error" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
                {/* <Snackbar open={openCheckoutSnackbar} autoHideDuration={6000} onClose={handleCloseCheckout}>
                    <Alert onClose={handleCloseCheckout} severity="warning" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar> */}
                {/* <Alert severity="error">{message}</Alert>
                <Alert severity="warning">{message}</Alert> */}
            </Stack>
        </React.Fragment>
    );

    return (
        <div>
            <IconButton aria-label="cart">
                <Badge color="secondary" badgeContent={totalAmountInCart()} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                    <ShoppingCartIcon className={classes.cartIcon} onClick={handleOpenCart} />
                </Badge>
            </IconButton>
            <Modal
                open={openCart}
                onClose={handleCloseCart}
            >
                <Box sx={cartItemStyle}>
                    <IconButton>
                        <CloseIcon onClick={handleCloseCart}/>
                    </IconButton>
                    <Typography variant='h4'>My Cart</Typography>
                    <Typography variant='body2' sx={{marginBottom: '25px'}}>Cart's items:</Typography>
                    <Box sx={cartContentStyle}>
                        {renderCartItems()}
                        <Button sx={{marginTop:"15px"}} onClick={buyProducts}>checkout</Button>
                        {status ? purchaseSuccess : purchaseFailed}
                        {/* {purchaseSuccess} */}
                        {/* {purchaseFailed} */}
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}