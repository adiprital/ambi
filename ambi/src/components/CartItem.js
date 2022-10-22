import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


import logo from '../assets/ambiLogo.jpeg';
import { Box } from '@mui/material';


export default function CartItem({ selectedProduct }) {
    const dispatch = useDispatch();

    return (
        <Card sx={{ display: 'flex' }} style={{backgroundColor: 'transparent'}}>
        <CardContent variant='cart-item'>
            <Typography variant="subtitle1">
                {selectedProduct.productName}
            </Typography>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <IconButton aria-label="delete-item">
                    {/* <DeleteForeverIcon/> */}
                </IconButton>
                <IconButton
                    aria-label="reduce-amount"
                    onClick={() => dispatch({
                        type: 'removeProductFromCart',
                        product: selectedProduct.productName
                    })}
                >
                    <RemoveIcon/>
                </IconButton>

                {/* <TextField label={selectedProduct.amount}/> */}
                {<div>{selectedProduct.amount}</div>}


                <IconButton
                    aria-label="increase-amount"
                    onClick={() => dispatch({
                        type: 'addProductToCart',
                        product: selectedProduct.productName
                    })}
                >
                    <AddIcon/>
                </IconButton>
            </Box>


        </CardContent>
        <CardMedia
            component='img'
            sx={{width: 150}}
            image={logo}
            alt="ambi logo"
        />
    </Card>
    )
}