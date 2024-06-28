import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import L from 'leaflet';
import Temperature from './Temperature';
import MyImage from '../../assets/sunny.png';
import { IconButton } from '@mui/material';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WeatherData = () => {
    const position = [0.3476, 32.5825];
    const search = async (city)=>{
      try {
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        
      } catch (error) {
        
      }
    }
    useEffect(() => {
      search("London")
    },[])
  return (
    <div style={{ margin: '16px 16px' }}>
       <Card sx={{ width:'100%' }}>
      <CardActionArea>
        <div style={{ height:200 }}>
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                        Kampala,Uganda
                    </Popup>
                </Marker>

            </MapContainer>

        </div>
        <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Typography gutterBottom variant="h5" component="div">
          Kampala
        </Typography>
        <Typography variant="h4" color="text.secondary">
          24°C
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Description
        </Typography>
      </div>
      <IconButton>
        <img src={MyImage} alt="Custom Icon" style={{ width: 88, height: 88 }} />
      </IconButton>
    </CardContent>
      </CardActionArea>
   
    </Card>
    </div>
  )
}

export default WeatherData
