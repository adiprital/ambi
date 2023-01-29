import React from 'react';
import { useSelector } from 'react-redux';
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

    const searchProducts = useSelector((state) => state.productsList).searchProducts;

    const renderSearchItems = () => {
        if (searchProducts) {
            return ( <SearchItem/> );
        }
    };

    return (
        <Grid container direction='column'>
            <Grid item container direction='row' className={classes.textContainer}>
                <Grid item container direction='column'>
                    <Grid item>
                        <Typography align='center' variant='h2'>Search</Typography>

                        {searchProducts.length === 0 ? 
                        <Typography align='center' variant='subtitle1' sx={{marginBottom: '25px'}}>
                            no matches items
                        </Typography> :  
                        <Typography align='center' variant='subtitle1' sx={{marginBottom: '25px'}}>
                            found {searchProducts.length} products matching your search
                        </Typography> } 

                    </Grid>
                    <Grid item style={{marginLeft: matchesSM ? 0 : '5em',
                                    textAlign: matchesSM ? 'center' : undefined}}
                    >
                        {renderSearchItems()}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}