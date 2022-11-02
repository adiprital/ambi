import React from 'react';
import Card from '@mui/material/Card';

import AddToCart from './AddToCart';
import ArrowIcon from './ArrowIcon';

export default function MeasureTape(props) {

    return (
        <Card variant='tabs-container'>
            {props.productName}
            <ArrowIcon productName={props.productName}/>
            <AddToCart productName={props.productName}/>
        </Card>
    )
}