import React, { useState, useRef } from 'react';
import { TextField, Toolbar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      alert('Please enter a city name');
      return;
    }

    console.log('Searching for:', searchTerm);

    try {
      const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        params: { namePrefix: searchTerm },
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_CITY_ID,
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      console.log('API Response:', response);

      const data = response.data;
      console.log('Data:', JSON.stringify(data, null, 2));

      if (onSearch) {
        onSearch(data);
      }

      setSearchTerm('');
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ padding: '16px 0', position: 'relative' }}>
      <Toolbar>
        <TextField
          inputRef={inputRef}
          label="Search"
          variant="outlined"
          placeholder="Search City"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearch} aria-label="search">
                <SearchIcon />
              </IconButton>
            ),
          }}
          fullWidth
        />
      </Toolbar>
    </div>
  );
};

export default SearchBar;
