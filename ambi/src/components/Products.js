import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import leftHandIcon from '../assets/noun-left-handed-icon.png';
import PagesButtons from './ui/PagesButtons';
import ProductItem from './ProductItem';

const useStyles = makeStyles(theme => ({
    icon: {
        marginLeft: '2em',
        width: '8em',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            width: '6em'
        }
    },
    productsContainer: {
        marginTop: '10em',
        [theme.breakpoints.down('sm')]: {
            padding: 25
        }
    }
}));

export default function Products(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const products = useSelector((state) => state.productsList).updatedProducts;
    const totalPages = useSelector((state) => state.paginationList).totalPages;

    const productsOptions = products.map((product, index) => {
        return { name: product.name,
                 link: `/${product.name.replace(/\s/g, '').toLowerCase()}`,
                 description: product.description,
                 activeIndex: 2,
                 selectedIndex: index
                }
    });

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <Grid container direction='column'>
            <Grid
                item
                style={{marginLeft: matchesSM ? 0 : '5em',
                        marginTop: matchesSM ? '1em' : '2em'}}
            >
                <Typography
                    variant='h2'
                    align='center'
                    gutterBottom
                >Products</Typography>
            </Grid>
            <Grid item>
                {productsOptions.map((option, i) => {
                    return (
                        <Grid
                            key={`${option}${i}`}
                            container
                            direction='row'
                            justifyContent={matchesSM ? 'center' : 'flex-end'}
                            className={classes.productsContainer}
                            style={{marginTop: matchesSM ? '1em' : '5em',
                                    marginRight: matchesSM ? '1em' : '5em',
                                    marginBottom: matchesSM ? '1em' : '2em'}}
                        >
                            <ProductItem
                                productName={option.name} 
                                description={option.description}
                                link={`/${option.name.replace(/\s/g, '').toLowerCase()}`}
                            />

                            <Grid item style={{marginRight: matchesSM ? 0 : '5em'}}>
                                <img className={classes.icon} alt='left hand' src={leftHandIcon} />
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
            <PagesButtons totalPages={totalPages}/>
        </Grid>
    );
};