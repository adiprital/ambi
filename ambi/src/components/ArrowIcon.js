import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';

import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const useStyles = makeStyles(theme => ({
    arrowIcon: {
        color: theme.palette.common.green,
        opacity: 0.7,
        marginTop: '0.5em',
        marginLeft: '2.5em',
        marginRight: '5em',
        '&:hover': {
            opacity: 1,
            color: theme.palette.common.green
        }
    },
    arrowContainer: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
}))

export default function ArrowIcon(props) {
    const classes = useStyles();
    let navigate = useNavigate();
    const theme = useTheme();

    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    const products = useSelector((state) => state.productsList).products;

    const productsLink = [];
    productsLink.push({ name: 'Products', link: "/products"});

    products.map(product => {
        return productsLink.push({
            name: product.name,
            link: `/${product.name.replace(/\s/g, '').toLowerCase()}`
        });
    });

    const lastIndex = productsLink.length-1;

    const checkBack = () => {
        let back = undefined;
        let index = undefined;
        productsLink.forEach((product, i) => {
            if (props.productName === product.name) {
                index = i;
                back = `${productsLink[index-1].link}`;
            }
        })
        return back;
    };

    const checkForward = () => {
        let forward = undefined;
        let index = undefined;
        productsLink.forEach((product, i) => {
            if (props.productName === product.name) {
                index = i;
                forward = `${productsLink[index+1].link}`;
            }
        })
        return forward;
    };

    const checkLastIndex = () => {
        if (props.productName !== productsLink[lastIndex].name) {
            return (
                <ArrowForwardIcon
                    className={classes.arrowIcon}
                    onClick={() => navigate(checkForward())}
                />
            );
        }
    }

    return (
        <Hidden mdDown>
            <Box>
                <ArrowBackIcon
                    className={classes.arrowIcon}
                    onClick={() => navigate(checkBack())}
                />
                    {checkLastIndex()}
            </Box>
        </Hidden>
    )
};