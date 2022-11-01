import React from 'react';
import Card from '@mui/material/Card';

import AddToCart from './AddToCart';

export default function UtilityKnife(props) {

    return (
        <Card variant='tabs-container'>
            {props.productName}
            <AddToCart productName={props.productName}/>
        </Card>
    )
}