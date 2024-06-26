import React from 'react'
import { Typography, Container } from '@mui/material';
import SearchBar from './input/SearchBar';
import WeatherData from './Display/WeatherData';

const MainContainer = () => {
  return (
    <div>
      <Container>
        <SearchBar />
        <Typography variant="body1" component="p" style={{ padding: 16 }}>
          Today's Weather Forecast for your city
        </Typography>
        <WeatherData />
      </Container>
    </div>
  )
}

export default MainContainer
