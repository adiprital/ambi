import React from 'react';
import Card from '@mui/material/Card';

import Product from './Product';

export default function Ruler(props) {
    console.log("Ruler");
    return (
        <Card variant='tabs-container'>
            {props.productName}
            <Product productName={props.productName}/>
        </Card>
    )
}