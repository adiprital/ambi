import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeStyles, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

import leftHandIcon from '../assets/noun-left-handed-icon.png';

const useStyles = makeStyles(theme => ({
    subtitle: {
        marginBottom: '1em'
    },
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
    },
    learnButton: {
        height: 35,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: '2em'
        }
    }
}));

export default function SearchItem(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    let navigate = useNavigate();
    const products = useSelector((state) => state.productsList).updatedProducts;
    
    const productsOptions = products.map((product, index) => {
        return { name: product.name,
                 link: `/${product.name.replace(/\s/g, '').toLowerCase()}`,
                 description: product.description,
                 activeIndex: 2,
                 selectedIndex: index
                }
    });
    // console.log('productsOptions', productsOptions);

    return (
        <Grid container direction='column'>
            <Grid
                item
                style={{marginLeft: matchesSM ? 0 : '5em',
                        marginTop: matchesSM ? '1em' : '2em'}}
            >
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
                                    marginBottom: matchesSM ? '2em' : '3em'}}
                        >
                            <Grid
                                item
                                style={{textAlign: matchesSM ? 'center' : 'right',
                                        width: matchesSM ? undefined : '35em'}}
                            >
                                <Typography variant='h4'>{option.name}</Typography>
                                <Typography variant='subtitle1' className={classes.subtitle}>
                                    <p dir='rtl'>{option.description}</p>
                                </Typography>
                                <Button
                                    variant='contained'
                                    className={classes.learnButton}
                                    onClick={() => navigate(option.link)}
                                    style={{marginBottom: matchesSM ? '1em' : '5em'}}
                                >
                                    <span>Learn More</span>
                                </Button>
                            </Grid>
                            <Grid item style={{marginRight: matchesSM ? 0 : '5em'}}>
                                <img className={classes.icon} alt='left hand' src={leftHandIcon} />
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    );
}