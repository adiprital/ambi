import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
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
    const [resultsArray, setResultsArray] = useState([]);

    const user = useSelector((state) => state.userAuth).currentUser;

    const addToWishList = async () => {
        let wishListProductId = props.productId;
        let token = localStorage.getItem('token');
        let baseUrl = (window.location.href).includes('localhost') ? 'localhost': 'ec2-44-203-23-164.compute-1.amazonaws.com';
        const promises_array = await axios.post(`http://${baseUrl}:8000/add-to-wishlist` , { user, wishListProductId } ,
                                                { withCredentials: true, 
                                                    headers: {token} }
                                                    );
        console.log('promises_array: ', promises_array);
        dispatch({ type: 'addProductToWishList', product: props.productName });
        
        // const results = await Promise.all(promises_array.data);
        // const filteredResults = results.filter(result => result !== undefined);

        // setResultsArray(filteredResults);
        // setTimeout(() => {
        //     setResultsArray([])
        // }, 10000);
    };

    return (
        <IconButton
            onClick={addToWishList
            //     () => {
            //     dispatch({ type: 'addProductToWishList', product: props.productName })
            // }
        }
        >
            <FavoriteIcon className={classes.favoriteIcon}/>
        </IconButton>
    );

}