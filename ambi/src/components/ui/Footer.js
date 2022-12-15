import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom';
import Hidden from '@mui/material/Hidden';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.common.green,
        fontFamily: 'Arial',
        width: '100%',
        position: 'static'
    },
    link: {
        color: theme.palette.common.white,
        fontSize: '0.75rem',
        fontWeight: 'bold',
        textDecoration: 'none'
    }
}));

export default function Footer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const products = useSelector((state) => state.productsList).products;

    const productsOptions = [{name: 'Products', link: '/products', activeIndex: 2, selectedIndex: 0},
    ...products.map((product, index) => {
        return { name: product.name,
                link: `/${product.name.replace(/\s/g, '').toLowerCase()}`,
                activeIndex: 2,
                selectedIndex: index + 1 }
    })];

    return(
        <footer className={classes.footer}>
            <Hidden mdDown>
                <Grid
                    container
                    justifyContent='center'
                    columnSpacing={10}
                    rowSpacing={2}
                >
                    <Grid item>
                        <Grid container direction='column' spacing={2}>
                            <Grid
                                item
                                component={Link}
                                onClick={() => props.setValue(0)}
                                to='/'
                                className={classes.link}
                            >Home</Grid>
                            <Grid
                                item
                                component={Link}
                                onClick={() => {props.setValue(1); props.setSelectedIndex(0)}}
                                to='/about'
                                className={classes.link}
                            >About Us</Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction='column' spacing={2}>
                            {productsOptions.map((option, i) => (
                                <Grid
                                    key={`${option}${i}`}
                                    item
                                    component={Link}
                                    to={option.link}
                                    classes={{root: classes.link}}
                                >
                                    {option.name}
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction='column' spacing={2}>
                            <Grid
                                item
                                component={Link}
                                onClick={() => {props.setValue(1); props.setSelectedIndex(2)}}
                                to='/contact'
                                className={classes.link}
                            >Contact Us</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Hidden>
            <Grid
                    container
                    justifyContent='left'
                    rowSpacing={2}
                >
                    <Grid
                        item
                        className={classes.link}
                        component={'a'}
                        href='https://www.linkedin.com/in/adi-pri-tal-3829521b3/'
                        rel='development'
                        target='_blank'
                    >© Adi Pri-Tal's Development 2022</Grid>
            </Grid>
        </footer>
    );
};