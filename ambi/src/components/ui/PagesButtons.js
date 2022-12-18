import React from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

export default function PagesButtons({totalPages}) {
    return (
      <Box sx={{margin: 'auto'}}>
        <Pagination 
          count={totalPages} 
          onClick={(event) => {
            let selectedPage = event.target.textContent;
          }}
        />
      </Box>
    );
  }