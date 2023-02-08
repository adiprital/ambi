import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles(theme => ({
    learnButton: {
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: '2em'
        }
    }
}));

export default function AddToCart(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsList).products;

    const productsAmount = products.map((product, index) => {
        return { name: product.name,
                 amount: product.amount,
                 isDisabled: undefined
                }
    });

    productsAmount.forEach((i, index) => {
        if (productsAmount[index].amount <= 0) {
            productsAmount[index].isDisabled = true;
        } else {
            productsAmount[index].isDisabled = false;
        }
    });

    const checkDisable = () => {
        let res = false;
        productsAmount.forEach(product => {
            if (props.productName === product.name) {
                res = product.isDisabled;
            }
        })
        return res;
    };

    return (
        <Button
            disabled={checkDisable()}
            variant='contained'
            className={classes.learnButton}
            onClick={() => {
                dispatch({ type: 'addProductToCart', product: props.productName })
            }}
        >
            Add To Cart
        </Button>
    );
}