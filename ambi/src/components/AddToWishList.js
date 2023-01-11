import React from 'react';
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

    const user = useSelector((state) => state.userAuth).currentUser;

    const checkDisable = () => {
        let res = false;
        if ( user === undefined ) {
                res = true;
        } else {
            res = false;
        }
        return res;
    };

    return (
        <IconButton
            // disabled={checkDisable()} 
            onClick={() => {
                dispatch({ type: 'addProductToWishList', product: props.productName })
            }}
        >
            <FavoriteIcon className={classes.favoriteIcon}/>
        </IconButton>
    );

}