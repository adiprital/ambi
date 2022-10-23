import React, { useState } from 'react';
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

    const cart = useSelector((state) => {
        console.log("state", state);
        return state.cartList
    }).cartData;

    const [openCart, setOpenCart] = useState(false);

    const handleOpenCart = () => {
        setOpenCart(true);
    };

    const handleCloseCart = () => {
        setOpenCart(false);
    };

    const renderCartItems = () => {
        const keys = Object.keys(cart);
        console.log('keys', keys);
        return keys.map(productName => {
            if (cart[productName] > 0) {
                return <CartItem productName={productName} amount={cart[productName]}/>
            }
        });
    };

    const totalAmountInCart = () => {
        const values = Object.values(cart);
        return values.reduce((acc, curr) => acc + curr, 0);
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
                        {/* {!cart.productName ? "your cart is empty" : <CartItem cart={cart}/>} */}

                        {renderCartItems()}
                        <Button sx={{marginTop:"15px"}}>checkout</Button>
                    </Box>

                </Box>
            </Modal>

        </div>
    )
}