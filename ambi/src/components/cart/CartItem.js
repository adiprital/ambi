import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { renderImage1 } from '../../utils/functions';
import AddToWishList from '../wishList/AddToWishList';

const useStyles = makeStyles(theme => ({
    cardItemContainer: {
        display: 'flex',
        marginBottom: '10px',
        padding: 0
    }
}));

export default function CartItem({ productName, amount }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.productsList).products;
    let productPrice;
    let productId;

    products.forEach((product) => {
        if (product.name === productName) {
            productPrice = product.price;
            productId = product._id;
        }
    });

    let productPriceToPay = amount*productPrice;

    return (
        <Card className={classes.cardItemContainer} style={{backgroundColor: 'transparent'}}>
        <CardContent variant='cart-item'>
            <Typography align='center' variant="subtitle1">
                {productName}
            </Typography>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <IconButton
                    aria-label="reduce-amount"
                    onClick={() => dispatch({
                        type: 'removeProductFromCart',
                        product: productName
                    })}
                >
                    <RemoveIcon/>
                </IconButton>
                {<div>{amount}</div>}
                <IconButton
                    aria-label="increase-amount"
                    onClick={() => dispatch({
                        type: 'addProductToCart',
                        product: productName
                    })}
                >
                    <AddIcon/>
                </IconButton>
            </Box>
            <Typography align='left' variant="subtitle3">
                    Price: {productPriceToPay.toFixed(2)} $
            </Typography>
            <AddToWishList productName={productName} productId={productId}/>
        </CardContent>
        <CardMedia sx={{width: '100%', marginLeft: '20px'}}>
            {renderImage1(productName, classes)}
        </CardMedia>
    </Card>
    )
}