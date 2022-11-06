import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import logo from '../assets/ambiLogo.jpeg';

const useStyles = makeStyles(theme => ({
    cardItemContainer: {
        display: 'flex',
        width: '340px',
        height: '120px',
        marginBottom: '5px'
    }
}));

export default function CartItem({ productName, amount }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={classes.cardItemContainer} style={{backgroundColor: 'transparent'}}>
        <CardContent variant='cart-item'>
            <Typography align='center' variant="subtitle1">
                {productName}
            </Typography>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <IconButton
                    aria-label="reduce-amount"
                    onClick={() => dispatch({
                        type: 'removeProductFromCart',
                        product: productName
                    })}
                >
                    <RemoveIcon/>
                </IconButton>
                {<div>{amount}</div>}
                <IconButton
                    aria-label="increase-amount"
                    onClick={() => dispatch({
                        type: 'addProductToCart',
                        product: productName
                    })}
                >
                    <AddIcon/>
                </IconButton>
            </Box>

        </CardContent>
        <CardMedia
            component='img'
            sx={{width: '100%', marginLeft: '20px'}}
            image={logo}
            alt="ambi logo"
        />
    </Card>
    )
}