import React from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function AddToWishList(props) {
    const dispatch = useDispatch();

    return (
        <IconButton
            onClick={() => {
                dispatch({ type: 'addProductToWishList', product: props.productName })
            }}
        >
            <FavoriteIcon/>
        </IconButton>
    );

}