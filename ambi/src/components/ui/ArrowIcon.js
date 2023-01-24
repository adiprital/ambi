import React from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

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
        },        
        [theme.breakpoints.down('sm')]: {
            marginTop: '0.5em',
            marginLeft: '0.5em',
            marginRight: '2.5em'
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
        <Box>
            <ArrowBackIcon
                className={classes.arrowIcon}
                onClick={() => navigate(checkBack())}
            />
                {checkLastIndex()}
        </Box>
    )
};