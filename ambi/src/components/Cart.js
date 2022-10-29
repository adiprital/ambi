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

    const handleOpenCart = () => {
        setOpenCart(true);
    };

    const handleCloseCart = () => {
        setOpenCart(false);
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

        //const results = [];
        // keys.forEach(async (productName) => {
        //     if (cart[productName] > 0) {
        //         const result = await axios.post(`http://localhost:8000/buy-products`, {
        //             name: productName,
        //             amount: cart[productName]
        //         })
        //         results.push(result);
        //     }
        // });
        // console.log('results', results);

        const promises_array = keys.map(async (productName) => {
            if (cart[productName] > 0) {
                 return await axios.post(`http://localhost:8000/buy-products`, {
                    name: productName,
                    amount: cart[productName]
                })
            }
        });

        const results = await Promise.all(promises_array);
        console.log('results', results);


    };

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
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}