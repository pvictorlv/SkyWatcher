import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Divider,
  Grid
} from '@mui/material';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';

const MoonPhaseCard = ({ moonPhase }) => {
  // Function to render the appropriate moon phase icon
  const renderMoonPhaseIcon = (phase, illumination) => {
    // This is a simplified version - in a real app, you might use actual moon phase images
    const size = 120;
    const color = '#f5f5f5';
    
    // Different styles based on moon phase
    let moonStyle = {};
    
    if (phase === 'New Moon') {
      moonStyle = {
        bgcolor: '#121212',
        border: `2px solid ${color}`,
      };
    } else if (phase === 'Full Moon') {
      moonStyle = {
        bgcolor: color,
      };
    } else if (phase.includes('Waxing')) {
      // Right half illuminated for waxing phases
      moonStyle = {
        background: `linear-gradient(90deg, #121212 50%, ${color} 50%)`,
      };
    } else if (phase.includes('Waning')) {
      // Left half illuminated for waning phases
      moonStyle = {
        background: `linear-gradient(270deg, #121212 50%, ${color} 50%)`,
      };
    } else if (phase === 'First Quarter') {
      moonStyle = {
        background: `linear-gradient(90deg, #121212 50%, ${color} 50%)`,
      };
    } else if (phase === 'Last Quarter') {
      moonStyle = {
        background: `linear-gradient(270deg, #121212 50%, ${color} 50%)`,
      };
    }
    
    return (
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: '50%',
          ...moonStyle,
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
          mx: 'auto',
          my: 2,
        }}
      />
    );
  };

  return (
    <Card sx={{ height: '100%', bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <NightsStayIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" component="h3">
            Moon Phase
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center', my: 3 }}>
          <Typography variant="h4" gutterBottom>
            {moonPhase.phase}
          </Typography>
          
          {renderMoonPhaseIcon(moonPhase.phase, moonPhase.illumination)}
          
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Illumination: {(moonPhase.illumination * 100).toFixed(0)}%
          </Typography>
          
          <Typography variant="body2" color="textSecondary">
            Moon Age: {moonPhase.age} days
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <WbTwilightIcon sx={{ mr: 1, color: 'secondary.main' }} />
              <Typography variant="body2">
                Rise: {moonPhase.riseTime}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <BrightnessHighIcon sx={{ mr: 1, color: 'warning.main' }} />
              <Typography variant="body2">
                Set: {moonPhase.setTime}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MoonPhaseCard;