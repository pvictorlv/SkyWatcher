import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Typography, Paper, CircularProgress } from '@mui/material';
import LocationForm from './components/LocationForm';
import SkyEventsDashboard from './components/SkyEventsDashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

// Create a dark theme for the astronomy app
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8e24aa',
    },
    secondary: {
      main: '#03a9f4',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

function App() {
  const [location, setLocation] = useState(null);
  const [skyEvents, setSkyEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch sky events when location changes
  useEffect(() => {
    if (!location) return;

    const fetchSkyEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:57929/api/sky-events?latitude=${location.latitude}&longitude=${location.longitude}`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        setSkyEvents(data);
      } catch (err) {
        console.error('Error fetching sky events:', err);
        setError('Failed to fetch sky events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSkyEvents();
  }, [location]);

  const handleLocationSubmit = (locationData) => {
    setLocation(locationData);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to bottom, #121212, #1a237e)',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Header />
        
        <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 2,
              background: 'rgba(30, 30, 30, 0.8)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography variant="h1" align="center" gutterBottom>
              SkyWatcher
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Discover what's happening in your night sky tonight
            </Typography>
            
            <LocationForm onSubmit={handleLocationSubmit} />
          </Paper>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress size={60} />
            </Box>
          )}

          {error && (
            <Paper sx={{ p: 3, mb: 4, bgcolor: 'error.dark' }}>
              <Typography variant="h6" color="error.contrastText">
                Error: {error}
              </Typography>
            </Paper>
          )}

          {skyEvents && !loading && (
            <SkyEventsDashboard skyEvents={skyEvents} />
          )}
        </Container>
        
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
