import React from 'react';
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';


export default function MeasureTape(props) {
    const dispatch = useDispatch();

    return (
        <Card variant='tabs-container'>
            <Button
                onClick={() => dispatch({ type: 'addProductToCart', product: props.productName })}
            >
                Add To Cart
            </Button>
        </Card>
    )

}