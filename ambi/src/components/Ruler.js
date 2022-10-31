import React from 'react';
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

import AddToCart from './AddToCart';

export default function Ruler(props) {
    const dispatch = useDispatch();

    return (
        <Card variant='tabs-container'>
            Ruler
            {/* <Button
                onClick={() => dispatch({ type: 'addProductToCart', product: props.productName })}
            >
                Add To Cart
            </Button> */}
            <AddToCart/>
        </Card>
    )
}