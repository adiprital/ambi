import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';

import AddToCart from '../cart/AddToCart';
import { renderImage1 } from '../../utils/functions';

const useStyles = makeStyles(theme => ({
    cardItemContainer: {
        display: 'flex',
        marginBottom: '10px',
        padding: 0
    }
}));

export default function FavoriteItem(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.productsList).products;
    let productPrice;

    products.forEach((product) => {
        if (product.name === props.productName) {
            productPrice = product.price;
        }
    });

    const removeProductFromWishList = async () => {
        let wishListProductId = props.productId;
        let token = localStorage.getItem('token');
        let baseUrl = (window.location.href).includes('localhost') ? 'localhost': 'ec2-44-203-23-164.compute-1.amazonaws.com';
        const promises_array = await axios.post(`http://${baseUrl}:8000/auth/remove-from-wishlist` , { wishListProductId } ,
                                                { withCredentials: true, 
                                                    headers: {token} }
                                                    );
        console.log('promises_array: ', promises_array);
        dispatch({ type: 'removeProductFromWishList', product: props.productName });
    };

    return (
        <Card className={classes.cardItemContainer} style={{backgroundColor: 'transparent'}}>
            <CardContent variant='favorite-item'>
                <Typography align='center' variant="subtitle1">
                    {props.productName}
                </Typography>
                <Typography align='left' variant="subtitle3">
                    Price: {productPrice} $
                </Typography>

                <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <IconButton
                        aria-label="reduce-amount"
                        onClick={ 
                            removeProductFromWishList
                        //     () => dispatch({
                        //     type: 'removeProductFromWishList',
                        //     product: props.productName
                        // })
                    }
                    >
                        <DeleteIcon/>
                    </IconButton>
                    <AddToCart productName={props.productName}/>
                </Box>
            </CardContent>
            <CardMedia sx={{width: '100%', marginLeft: '20px'}}>
                {renderImage1(props.productName, classes)}
            </CardMedia>
        </Card>
    )

}