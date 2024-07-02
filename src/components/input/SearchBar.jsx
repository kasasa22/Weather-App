import React, { useState, useRef, useEffect } from 'react';
import { TextField, Toolbar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            'x-rapidapi-key': '7f120055bcmsh08fdb82a466bc53p1ae1bejsndd08acced27b'
          }
        });
        const data = await response.json();
        console.log(data);
        if (data.message){
          setError(data.message);
        }else if(data.data){
          const cityNames = data.data.map(item => item.city);
          setCities(cityNames);
          console.log(cityNames);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  

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
