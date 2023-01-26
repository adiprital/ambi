import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import SearchItem from './SearchItem';

const useStyles = makeStyles(theme => ({
    textContainer: {
        paddingLeft: '5em',
        paddingRight: '5em',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '1.5em',
            paddingRight: '1.5em',
        }
    }
}));

export default function SearchPage() {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    const products = useSelector((state) => state.productsList).searchedProducts;
    console.log('products', products);

    const renderSearchItems = () => {
        const keys = Object.keys(products);
        // console.log('keys', keys);
        // return keys.map((productName, index) => {
        //     if (products[productName] > 0) {
        //         return (
        //             <SearchItem 
        //                 key={index} 
        //                 productName={productName} 
        //             />
        //         );
        //     }
        // });
    };

    return (
        <Grid container direction='column'>
            <Grid item container direction='row' className={classes.textContainer}>
                <Grid item container direction='column'>
                    <Grid item>
                        <Typography align='center' variant='h2'>Search</Typography>
                        <Typography align='center'variant='subtitle1' sx={{marginBottom: '25px'}}>
                            Hello
                        </Typography>
                    </Grid>
                    <Grid item style={{marginLeft: matchesSM ? 0 : '5em',
                                    textAlign: matchesSM ? 'center' : undefined}}
                    >
                        <Typography align='center' variant='subtitle3' sx={{marginBottom: '25px'}}>
                            your balance:  $
                        </Typography>
                        {renderSearchItems()}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}