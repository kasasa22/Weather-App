import React, { useState, useRef } from 'react';
import { TextField, Toolbar, IconButton, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    if (query.length > 2) {
      fetchCitySuggestions(query);
    } else {
      setSuggestions([]);
    }
  };

  const fetchCitySuggestions = async (query) => {
    try {
      console.log("Fetching cities for query:", query);  // Debugging log
      const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
        headers: {
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
          'x-rapidapi-key': '7f120055bcmsh08fdb82a466bc53p1ae1bejsndd08acced27b', // Replace with your actual key
        },
        params: { namePrefix: query },
      });
      console.log("API Response:", response.data);  // Debugging log
      setSuggestions(response.data.data.map((item) => `${item.city}, ${item.country}`));
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      alert('Please enter a city name');
      return;
    }
    if (onSearch) {
      onSearch(searchTerm);
    }
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    if (onSearch) {
      onSearch(suggestion);
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
      {suggestions.length > 0 && (
        <List style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1, backgroundColor: 'white', border: '1px solid #ccc' }}>
          {suggestions.map((suggestion, index) => (
            <ListItem button key={index} onClick={() => handleSuggestionClick(suggestion)}>
              <ListItemText primary={suggestion} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default SearchBar;
