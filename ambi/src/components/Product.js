import React, { useEffect, useState }  from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { renderImage2, getProductData } from '../utils/functions';
import AddToCart from './AddToCart';
import ArrowIcon from './ArrowIcon';

const useStyles = makeStyles(theme => ({
    rowContainer: {
        paddingLeft: '5em',
        paddingRight: '5em',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '1.5em',
            paddingRight: '1.5em',
        }
    },
    cardContainer: {
        position: 'center',
        marginBottom: '35px',
        backgroundColor: 'transparent',
        boxShadow: theme.shadows[10],
        borderRadius: 15,
        [theme.breakpoints.down('sm')]: {
            // paddingTop: '8em',
            // paddingBottom: '8em',
            paddingLeft: 0,
            paddingRight: 0,
            borderRadius: 0,
            width: '100%'
        }
    },
    productImage: {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        marginBottom: '20px'
    }
}));

export default function Product(props) {
    const classes = useStyles();
    const theme = useTheme();
    const productData = props.productData;
    const [rProduct, setRProduct] = useState({});

    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

    const products = useSelector((state) => state.productsList).products;

    useEffect(() => {
        setRProduct(getProductData(props.productName, products));
    }, []);

    return (
        <Grid container direction='column'>
            <ArrowIcon productName={props.productName}/>
            <Grid item container direction='row' className={classes.rowContainer}>
                <Grid item container direction='column'>
                    <Grid item>
                        <Typography align='center' variant='h2'>
                            {productData ? productData.name : ''}
                        </Typography>
                    </Grid>
                </Grid>
                    
                <Card className={classes.cardContainer} style={{backgroundColor: 'transparent'}}>
                {renderImage2(props.productName, classes)}
                    <CardContent>
                        <Typography align={matchesMD ? 'center' : undefined} variant='body2' paragraph>
                            <p dir='rtl'>
                            {productData ? productData.description : ''}
                            </p>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <AddToCart productName={props.productName}/>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}