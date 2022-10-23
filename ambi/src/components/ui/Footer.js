import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid'
import { Link, useNavigate } from 'react-router-dom';
import Hidden from '@mui/material/Hidden';


const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.common.green,
        color: theme.palette.common.white,
        fontFamily: 'Arial',
        width: '100%',
        zIndex: 1302,
        position: 'relative'
        // position: 'absolute'
    },
    mainContainer: {
        backgroundColor: theme.palette.common.green,
        position: 'static'
    },
    link: {
        color: theme.palette.common.white,
        fontSize: '0.75rem',
        fontWeight: 'bold',
        textDecoration: 'none'
    },
    gridItem: {
        margin: '3em'
    }
}));

export default function Footer(props) {
    const classes = useStyles();

    const products = useSelector((state) => state.productsList).products;
    let navigate = useNavigate();

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
                    className={classes.mainContainer}
                    columnSpacing={10}
                    rowSpacing={2}
                >
                    <Grid item className={classes.gridItem}>
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
                    <Grid item className={classes.gridItem}>
                        <Grid container direction='column' spacing={2}>
                            {productsOptions.map((option, i) => (
                                <Grid
                                    key={`${option}${i}`}
                                    item
                                    component={Link}
                                    to={option.link}
                                    classes={{root: classes.link}}
                                    // onClick={() => navigate(option.link)}
                                >
                                    {option.name}
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
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