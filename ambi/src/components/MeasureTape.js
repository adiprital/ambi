import React from 'react';
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';

export default function MeasureTape(props) {
    const dispatch = useDispatch();

    return (
        <div>
            <Button
                onClick={() => dispatch({ type: 'addProductToCart', product: props.productName })}
            >
                Add To Cart
            </Button>
        </div>
    )

}