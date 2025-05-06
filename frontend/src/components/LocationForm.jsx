import { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Typography, 
  Paper,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const LocationForm = ({ onSubmit }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [locationName, setLocationName] = useState('');
  const [gettingLocation, setGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!latitude || !longitude) {
      setLocationError('Please provide both latitude and longitude');
      return;
    }
    
    // Convert to numbers and validate range
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    
    if (isNaN(lat) || lat < -90 || lat > 90) {
      setLocationError('Latitude must be a number between -90 and 90');
      return;
    }
    
    if (isNaN(lng) || lng < -180 || lng > 180) {
      setLocationError('Longitude must be a number between -180 and 180');
      return;
    }
    
    // Clear any previous errors
    setLocationError(null);
    
    // Submit the location data
    onSubmit({
      latitude: lat,
      longitude: lng,
      name: locationName || `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`
    });
  };

  const getCurrentLocation = () => {
    setGettingLocation(true);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setGettingLocation(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
        setLocationName('My Current Location');
        setGettingLocation(false);
        
        // Optional: Automatically submit the form with current location
        onSubmit({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          name: 'My Current Location'
        });
      },
      (error) => {
        setGettingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('User denied the request for geolocation');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable');
            break;
          case error.TIMEOUT:
            setLocationError('The request to get user location timed out');
            break;
          default:
            setLocationError('An unknown error occurred');
            break;
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon sx={{ mr: 1 }} />
          Enter Your Location
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="e.g. 40.7128"
              variant="outlined"
              margin="normal"
              helperText="Between -90 and 90"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="e.g. -74.0060"
              variant="outlined"
              margin="normal"
              helperText="Between -180 and 180"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Location Name (Optional)"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="e.g. New York City"
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
        
        {locationError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {locationError}
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={gettingLocation ? <CircularProgress size={20} /> : <MyLocationIcon />}
            onClick={getCurrentLocation}
            disabled={gettingLocation}
          >
            {gettingLocation ? 'Getting Location...' : 'Use My Current Location'}
          </Button>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={gettingLocation}
          >
            Show Sky Events
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default LocationForm;