import React, { useState, useRef } from 'react';
import { TextField, Toolbar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  const inputRef = useRef(null); // Ref to access the input element

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term state
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm);
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
