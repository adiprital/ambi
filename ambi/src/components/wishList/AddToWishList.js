import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

const useStyles = makeStyles(theme => ({
    favoriteIcon: {
        color: theme.palette.common.green,
        opacity: 0.7,
        height: '50px',
        width: '50px',
        marginLeft: '25px',
        '&:hover': {
            opacity: 1,
            color: theme.palette.common.green
        }
    }
}));

export default function AddToWishList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
  
    const addToWishList = async () => {
        let wishListProductId = props.productId;
        let token = localStorage.getItem('token');
        let baseUrl = (window.location.href).includes('localhost') ? 'localhost': 'ec2-44-203-23-164.compute-1.amazonaws.com';
        const promises_array = await axios.post(`http://${baseUrl}:8000/auth/add-to-wishlist` , { wishListProductId } ,
                                                { withCredentials: true, 
                                                    headers: {token} }
                                                    );
        // console.log('promises_array: ', promises_array);
        dispatch({ type: 'addProductToWishList', product: props.productName });
    }; 

    return (
        <IconButton
            onClick={ addToWishList }
        >
            <FavoriteIcon className={classes.favoriteIcon}/>
        </IconButton>
    );

}