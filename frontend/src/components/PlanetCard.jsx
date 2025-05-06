import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip,
  Divider
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HeightIcon from '@mui/icons-material/Height';
import ExploreIcon from '@mui/icons-material/Explore';

// Planet colors for visual distinction
const planetColors = {
  mercury: '#a6a6a6',
  venus: '#e6c35c',
  mars: '#c1440e',
  jupiter: '#e0ae6f',
  saturn: '#ceb8b8',
  uranus: '#9fe3de',
  neptune: '#5b5ddf',
  pluto: '#ad8a56'
};

const PlanetCard = ({ planet }) => {
  // Get color based on planet name, default to primary color if not found
  const getPlanetColor = (name) => {
    const planetName = name.toLowerCase();
    return planetColors[planetName] || '#8e24aa';
  };

  // Format distance to be more readable
  const formatDistance = (distanceKm) => {
    if (distanceKm >= 1000000) {
      return `${(distanceKm / 1000000).toFixed(2)} million km`;
    }
    return `${(distanceKm / 1000).toFixed(0)} thousand km`;
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        bgcolor: 'background.paper', 
        borderRadius: 2,
        position: 'relative',
        overflow: 'visible',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          bgcolor: getPlanetColor(planet.name),
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PublicIcon sx={{ mr: 1, color: getPlanetColor(planet.name) }} />
            <Typography variant="h6" component="h3">
              {planet.name.charAt(0).toUpperCase() + planet.name.slice(1)}
            </Typography>
          </Box>
          
          <Chip 
            icon={planet.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            label={planet.visible ? 'Visible' : 'Not Visible'}
            color={planet.visible ? 'success' : 'default'}
            size="small"
          />
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <HeightIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Altitude: {planet.altitude.toFixed(1)}°
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <ExploreIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Azimuth: {planet.azimuth.toFixed(1)}°
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Distance from Earth: {formatDistance(planet.distance)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlanetCard;