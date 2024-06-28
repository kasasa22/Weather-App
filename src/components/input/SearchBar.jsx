import React, { useState } from 'react';
import { TextField, InputAdornment, Toolbar, List, ListItem, ListItemText, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([
    { id: 1, city: 'New York', country: 'USA' },
    { id: 2, city: 'Los Angeles', country: 'USA' },
    { id: 3, city: 'Chicago', country: 'USA' },
  ]); // Sample data for UI demonstration

  const handleSearchChange = (event) => { 
    setSearchTerm(event.target.value);
    setShowSuggestions(event.target.value.length > 0);
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
