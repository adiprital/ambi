import React from 'react';
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

    return (
        <IconButton
            onClick={() => {
                dispatch({ type: 'addProductToWishList', product: props.productName })
            }}
        >
            <FavoriteIcon className={classes.favoriteIcon}/>
        </IconButton>
    );

}