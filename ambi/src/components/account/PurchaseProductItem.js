import React from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import { renderImage1 } from '../../utils/functions';

const useStyles = makeStyles(theme => ({
    productItemContainer: {
        display: 'inline-block',
        position: 'center',
        marginBottom: '20px',
        backgroundColor: 'transparent',
        boxShadow: theme.shadows[10],
        borderRadius: 15,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 0,
            paddingRight: 0,
            borderRadius: 0,
            width: '100%'
        }
    }
}));

export default function PurchaseProductItem({ productName, amount, link }) {
    const classes = useStyles();
    let navigate = useNavigate();

    return (
        <Card 
            className={classes.productItemContainer} 
            sx={{ minWidth: 275, maxWidth: 300 }}
            style={{backgroundColor: 'transparent'}}
        >
            <CardContent>
                <Typography variant='h4'>{productName}</Typography>
                <Typography variant='subtitle1'>amount: {amount}</Typography>
            </CardContent>

            <CardActions>
                <Button variant='text' onClick={() => navigate(link)}>view product details</Button>
            </CardActions>

            <CardMedia sx={{ height: 170 }}>
                {renderImage1(productName, classes)}
            </CardMedia>

        </Card>
    );
}