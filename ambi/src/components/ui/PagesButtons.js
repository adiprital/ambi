import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

export default function PagesButtons({ totalPages }) {
  const dispatch = useDispatch();

    return (
      <Box sx={{margin: 'auto'}}>
        <Pagination 
          count={totalPages} 
          onClick={async (event) => {
            let selectedPage = event.target.textContent;
            try{
              const response = await axios.get(`http://localhost:8000/get-products?limit=5&page=${selectedPage}`);
              dispatch({ type: 'selectedPage', page: selectedPage });
              dispatch({ type: "updatedProducts", products: response.data.products });
            }
            catch(error){
              console.log('error in fetch prodcuts', error)
            }
          }}
        />
      </Box>
    );
  }