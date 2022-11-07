import React from 'react';
import Card from '@mui/material/Card';

import Product from './Product';

export default function Scissors(props) {

    return (
        <Card variant='tabs-container'>
            {props.productName}
            <Product productName={props.productName}/>
        </Card>
    )
}