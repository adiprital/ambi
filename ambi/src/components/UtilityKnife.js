import React from 'react';
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';


export default function UtilityKnife(props) {
    const dispatch = useDispatch();

    return (
        <Card variant='tabs-container'>
            Utility Knife
            <Button
                onClick={() => dispatch({ type: 'addProductToCart', product: props.productName })}
            >
                Add To Cart
            </Button>
        </Card>
    )
}