import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
  return (
    <AppBar position="static">
    <Toolbar>
      
      <Typography variant="h4">
       Trevor's Weather App
      </Typography>

     
      
    </Toolbar>
    
  </AppBar>
  )
}

export default NavBar
