import React, { useState, useEffect, useCallback } from 'react';
import { TextField, InputAdornment, Toolbar, List, ListItem, ListItemText, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import debounce from 'lodash.debounce';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchCities = async (query, retries = 3) => {
    if (query.length > 0) {
      try {
        const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
          params: { namePrefix: query },
          headers: {
            'x-rapidapi-key': '7f120055bcmsh08fdb82a466bc53p1ae1bejsndd08acced27b',
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
          }
        });

        setSuggestions(response.data.data);
        setShowSuggestions(true);
      } catch (error) {
        if (error.response && error.response.status === 429 && retries > 0) {
          console.error('Rate limit exceeded, retrying...');
          setTimeout(() => fetchCities(query, retries - 1), 1000);
        } else {
          console.error('Error fetching cities:', error);
        }
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const debouncedFetchCities = useCallback(debounce(fetchCities, 300), []);

  useEffect(() => {
    debouncedFetchCities(searchTerm);
  }, [searchTerm, debouncedFetchCities]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (city) => {
    setSearchTerm(city.city);
    setShowSuggestions(false);
  };

  return (
    <div style={{ padding: '16px 0', position: 'relative' }}>
      <Toolbar>
        <TextField
          variant="outlined"
          placeholder="Search City"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ backgroundColor: 'white', borderRadius: 4 }}
          fullWidth
        />
      </Toolbar>
      {showSuggestions && (
        <Paper style={{ position: 'absolute', zIndex: 1, marginTop: '8px', width: '100%' }}>
          <List>
            {suggestions.map((city) => (
              <ListItem button key={city.id} onClick={() => handleSuggestionClick(city)}>
                <ListItemText primary={`${city.city}, ${city.country}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default SearchBar;
