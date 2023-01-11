import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@mui/styles';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const useStyles = makeStyles(theme => ({
    searchPaper: {
        display: 'flex', 
        alignItems: 'center',
        '&:hover': {
            opacity: 0.25,
            backgroundColor: theme.palette.common.white
        }
    },
    searchIcon: {
        ...theme.typography.tab,
        height: '50px',
        width: '50px',
        marginLeft: '25px',
        '&:hover': {
            opacity: 1,
            color: theme.palette.common.white
        }
    },
}));

export default function Search() {
    const classes = useStyles();
    const theme = useTheme();

    const products = useSelector((state) => state.productsList).products;
    console.log('products', products);

    const [searchText, setSearchText] = useState('');
    console.log('searchText', searchText);

    const searchProducts = async (searchText) => {
        // const keys = Object.keys(cart);
        // const promises_array = keys.map(async (productName) => {
        //     if (cart[productName] > 0) {
        //         let token = localStorage.getItem('token');
        //          return await axios.post(`http://localhost:8000/buy-products`, {
        //             name: productName,
        //             amount: cart[productName],
        //             price: prodcutsPrice[productName]
        //         }, { withCredentials: true, headers:{
        //             token
        //         }});
        //     }
        // });
    };

    return (
        <React.Fragment>
            <Paper
                className={classes.searchPaper}
                component="form" 
                sx={{ 
                    backgroundColor: theme.palette.common.white,
                    opacity: 0.15 
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1, color: 'inherit' }}
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search...' }}
                    value={searchText} //
                    onChange={(event) => setSearchText(event.target.value)} //
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon className={classes.searchIcon}
                        sx={{ color: 'inherit' }}/>
                </IconButton>  
            </Paper>
        </React.Fragment>
    );
}