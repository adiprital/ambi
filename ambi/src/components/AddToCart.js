import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

export default function AddToCart(props) {
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

    console.log('productsAmount', productsAmount);

    return (
        <Button
            // disabled={productsAmount.isDisabled}
            onClick={() => dispatch({ type: 'addProductToCart', product: props.productName })}
        >
            Add To Cart
        </Button>
    );
}