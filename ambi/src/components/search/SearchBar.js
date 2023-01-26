import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    textContainer: {
        paddingLeft: '5em',
        paddingRight: '5em',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '1.5em',
            paddingRight: '1.5em',
        }
    }
}));

export default function SearchBar() {
    const classes = useStyles();
    const theme = useTheme();
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.productsList).products;

    const [searchText, setSearchText] = useState('');

    const searchProducts = async () => {
        products.forEach((productName) => {
            let searchingProducts = productName.name;
            // let searchingProducts = productName.name.toLowerCase();
            if (searchingProducts.includes(searchText)) {
                dispatch({ type: 'searchedProducts', searchedProducts: searchingProducts})
                // console.log('searchingProducts', searchingProducts);
            }
        });

        try {
            let results = await axios.get(`http://localhost:8000/search?name=${searchText}`);
            // console.log('results', results.data);
        } catch(error) {
            console.log('error in search prodcuts', error);
        }
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
                <IconButton 
                    type="button" 
                    sx={{ p: '10px' }} 
                    aria-label="search" 
                    onClick={() => {
                        // dispatch({
                        //     type: 'searchedProducts',
                        //     searchedProducts: searchText});
                        searchProducts();
                        navigate('/search');
                    }}
                >
                    <SearchIcon className={classes.searchIcon}
                        sx={{ color: 'inherit' }}/>
                </IconButton>  
            </Paper>
        </React.Fragment>
    );
}