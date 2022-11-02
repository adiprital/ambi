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
    productsLink.push({productLink: "/products"});

    products.map(product => {
        return productsLink.push({ productLink: `/${product.name.replace(/\s/g, '').toLowerCase()}` });
    });

    console.log("productsLink", productsLink);

    const checkBack = () => {
        let back = undefined;
        productsLink.forEach(product => {
            if (`/${props.productName.replace(/\s/g, '').toLowerCase()}` === product.productLink) {
                console.log("back: product.productLink: ", product.productLink);
                console.log("back: props.productName: ", `/${props.productName.replace(/\s/g, '').toLowerCase()}`);
                back = `${product.productLink}`;
                console.log("back: ", back);
            }
        })
        return back;
    };

    const checkForward = () => {
        let forward = undefined;
        productsLink.forEach((product, i) => {
            if ((`/${props.productName.replace(/\s/g, '').toLowerCase()}` === product.productLink)) {
                console.log("forward: product.productLink: ", product.productLink);
                console.log("forward: props.productName: ", `/${props.productName.replace(/\s/g, '').toLowerCase()}`);
                // forward = "/products";
                forward = `${product.productLink}`;
                console.log("forward: ", forward);
            }
        })
        return forward;
    };

    return (
        <Hidden mdDown>
            <Box>
                <ArrowBackIcon
                    className={classes.arrowIcon}
                    // onClick={() => navigate("/products")}
                    onClick={() => navigate(checkBack())}
                />

                <ArrowForwardIcon
                    className={classes.arrowIcon}
                    // onClick={() => navigate("/measuretape")}
                    onClick={() => navigate(checkForward())}
                />
            </Box>
        </Hidden>
    )
};