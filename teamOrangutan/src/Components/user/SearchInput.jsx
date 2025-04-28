import React, { useState } from 'react';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log('Búsqueda:', searchTerm);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2}}>
      <TextField
        label="Buscar en el historial"
        variant="outlined"
        value={searchTerm}
        onChange={handleInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          width: '300px',
          marginRight: 2,
          '& .MuiInputBase-root': {
            height: '40px', 
            borderRadius: 0
          },
          '& .MuiOutlinedInput-root': {
            height: '40px',
          },
        }}
      />
      
    </Box>
  );
};

export default SearchInput;
