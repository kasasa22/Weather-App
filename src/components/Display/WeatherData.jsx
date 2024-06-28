import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton } from '@mui/material';
import L from 'leaflet';
import MyImage from '../../assets/sunny.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WeatherData = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  const search = async (city) => {
    const allIcons = {
      '01d': MyImage,
      '01n': MyImage,
      '02d': MyImage,
      '02n': MyImage,
      '03d': MyImage,
      '03n': MyImage,
      '04d': MyImage,
      '04n': MyImage,
      '09d': MyImage,
      '09n': MyImage,
      '10d': MyImage,
      '10n': MyImage,
      '11d': MyImage,
      '11n': MyImage,
      '13d': MyImage,
      '13n': MyImage,
      '50d': MyImage,
      '50n': MyImage,
    };

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || MyImage;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        description: data.weather[0].description,
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (city) {
      search(city);
    }
  }, [city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const position = [weatherData.latitude, weatherData.longitude];
  
  return (
    <div style={{ margin: '16px 16px' }}>
      <Card sx={{ width: '100%' }}>
        <CardActionArea>
          <div style={{ height: 200 }}>
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
              <UpdateMapCenter position={position} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>{weatherData.location}</Popup>
              </Marker>
            </MapContainer>
          </div>
          <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Typography gutterBottom variant="h5" component="div">
                {weatherData.location}
              </Typography>
              <Typography variant="h4" color="text.secondary">
                {weatherData.temperature}°C
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {weatherData.description}
              </Typography>
            </div>
            <IconButton>
              <img src={weatherData.icon} alt="Weather Icon" style={{ width: 88, height: 88 }} />
            </IconButton>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};


const UpdateMapCenter = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
};

export default WeatherData;
