import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';

import logo from '../assets/ambiLogo.jpeg';

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


export default function Cart() {
    const classes = useStyles();

    // const addToCart = useSelector((state) => state.addToCartList).product;
    const selectedProduct = useSelector((state) => {
        console.log('***cart state', state)
        return state.addToCartList
    }).product;
    console.log('selectedProduct', selectedProduct);

    const dispatch = useDispatch();
    const [openCart, setOpenCart] = useState(false);
    const [amount, setAmount] = useState(0);

    const handleOpenCart = () => {
        setOpenCart(true);
    };

    const handleCloseCart = () => {
        setOpenCart(false);
    };

    return (
        <div>

            <IconButton aria-label="cart">
                <Badge color="secondary" badgeContent={selectedProduct.amount} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
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
                    <Typography variant='body2'>Cart's items:</Typography>
                    <Card sx={{ display: 'flex' }} style={{backgroundColor: 'transparent'}}>
                        <CardContent >
                            <Typography variant="subtitle1">
                                {selectedProduct.productName}
                            </Typography>

                            <IconButton aria-label="delete-item">
                                <DeleteForeverIcon/>
                            </IconButton>

                            <IconButton
                                aria-label="reduce-amount"
                                onClick={() => dispatch({
                                    type: 'removeProductFromCart',
                                    product: selectedProduct.productName
                                })}
                            >
                                <RemoveIcon/>
                            </IconButton>

                            <TextField label={selectedProduct.amount}>

                            </TextField>

                            <IconButton
                                aria-label="increase-amount"
                                onClick={() => dispatch({
                                    type: 'addProductToCart',
                                    product: selectedProduct.productName
                                })}
                            >
                                <AddIcon/>
                            </IconButton>

                        </CardContent>
                        <CardMedia
                            component='img'
                            sx={{width: 150}}
                            image={logo}
                            alt="ambi logo"
                        />
                    </Card>
                    <Button>checkout</Button>
                </Box>
            </Modal>

        </div>
    )
}