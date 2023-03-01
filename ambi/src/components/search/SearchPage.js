import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import SearchItem from './SearchItem';

export default function SearchPage() {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

    const searchProducts = useSelector((state) => state.productsList).searchProducts;

    const renderSearchItems = () => {
        if (searchProducts) {
            return ( <SearchItem/> );
        }
    };

    return (
        <Grid container direction='row'>
            <Grid
                item
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
                style={{marginBottom: matchesMD ? '5em' : 0,
                        marginTop: matchesSM ? '1em' : matchesMD ? '5em' : 0}}
            >
                <Grid item>            
                    <Grid item container direction='column'>
                        <Grid item style={{marginTop: '2em'}}>
                            <Typography align='center' variant='h2' style={{lineHeight: 1, marginBottom: '20px'}}>Search</Typography>
                        
                            {searchProducts.length === 0 ? 
                                <Typography align='center' variant='subtitle1' sx={{marginBottom: '25px'}}>
                                    no matches items </Typography> :  
                                    <Typography align='center' variant='subtitle1' sx={{marginBottom: '25px'}}>
                                        found {searchProducts.length} products matching your search
                                    </Typography> } 
                        </Grid>

                        <Grid item style={{marginLeft: matchesSM ? 0 : '5em',
                                    marginRight: matchesSM ? 0 : '5em',
                                    textAlign: matchesSM ? 'center' : undefined}}>
                            <Grid
                                item
                                container
                                direction={matchesSM ? 'column' : 'row'}
                                style={{marginTop: '2em', marginBottom: '5em'}}
                                alignItems='center'
                                justifyContent='center'
                            >
                               {renderSearchItems()}
                            </Grid>
                                
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid> 
    );

}