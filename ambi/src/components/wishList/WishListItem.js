import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import AddToCart from '../cart/AddToCart';
import { renderImage1 } from '../../utils/functions';

const useStyles = makeStyles(theme => ({
    cardItemContainer: {
        display: 'flex',
        width: '340px',
        height: '130px',
        marginBottom: '5px',
        padding: 0
    }
}));

export default function FavoriteItem({ productName }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.productsList).products;
    let productPrice;

    products.forEach((product) => {
        if (product.name === productName) {
            productPrice = product.price;
        }
    });

    return (
        <Card className={classes.cardItemContainer} style={{backgroundColor: 'transparent'}}>
            <CardContent variant='favorite-item'>
                <Typography align='center' variant="subtitle1">
                    {productName}
                </Typography>
                <Typography align='left' variant="subtitle3">
                    Price: {productPrice} $
                </Typography>

                <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <IconButton
                        aria-label="reduce-amount"
                        onClick={() => dispatch({
                            type: 'removeProductFromWishList',
                            product: productName
                        })}
                    >
                        <DeleteIcon/>
                    </IconButton>

                    <IconButton
                        aria-label="add-to-cart"
                        onClick={() => dispatch({
                            type: 'addProductToCart',
                            product: productName
                        })}
                    >
                        <ShoppingCartIcon/>
                    </IconButton>
                    {/* <AddToCart productName={productName}/> */}
                </Box>
            </CardContent>
            <CardMedia sx={{width: '100%', marginLeft: '20px'}}>
                {renderImage1(productName, classes)}
            </CardMedia>
        </Card>
    )

}