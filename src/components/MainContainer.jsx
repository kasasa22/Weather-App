import React, { useState } from 'react';
import { Typography, Container } from '@mui/material';
import SearchBar from './input/SearchBar';
import WeatherData from './Display/WeatherData';

const MainContainer = () => {
  const [city, setCity] = useState('Kampala'); // Default city

  const handleSearch = (searchTerm) => {
    setCity(searchTerm);
  };

  return (
    <div>
      <Container>
        <SearchBar onSearch={handleSearch} />
        <Typography variant="body1" component="p" style={{ padding: 16 }}>
          Today's Weather Forecast for your city
        </Typography>
        <WeatherData city={city} />
      </Container>
    </div>
  );
};

export default MainContainer;
