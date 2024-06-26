import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, Toolbar, List, ListItem, ListItemText ,Paper} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions,setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm.length>0){
      try{
        const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities',{
        params: { namePrefix: searchTerm },
        headers:{
          'x-rapidapiI-key': 'SIGN-UP-FOR-KEY',
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        }
      
    } );

    setSuggestions(response.data.data);
    setShowSuggestions(true);
  } catch(error){
    console.error('Error fetching cities:', error);
  }
};
fetchCities();
  } else {
    setSuggestions([]);
    setShowSuggestions(false);
  }
},[searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log('Search Term:', event.target.value);
  };

  const handleSuggestionClick = (city) => {
    setSearchTerm(city.city);
    setShowSuggestions(false);
  };

  return (
    <div style={{ padding: '16px 0' }}>
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
        </Paper>)}

    </div>
  );
};

export default SearchBar;
