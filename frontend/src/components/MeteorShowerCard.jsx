import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip,
  LinearProgress,
  Divider
} from '@mui/material';
import ShowerIcon from '@mui/icons-material/Shower';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';

const MeteorShowerCard = ({ shower }) => {
  // Calculate intensity level (1-5) based on rate
  const getIntensityLevel = (rate) => {
    if (rate >= 100) return 5;
    if (rate >= 50) return 4;
    if (rate >= 20) return 3;
    if (rate >= 10) return 2;
    return 1;
  };
  
  // Get color based on intensity
  const getIntensityColor = (level) => {
    const colors = ['#64b5f6', '#4fc3f7', '#81c784', '#ffb74d', '#ff8a65'];
    return colors[level - 1] || colors[0];
  };
  
  const intensityLevel = getIntensityLevel(shower.rate);
  const intensityColor = getIntensityColor(intensityLevel);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
          bgcolor: intensityColor,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ShowerIcon sx={{ mr: 1, color: intensityColor }} />
            <Typography variant="h6" component="h3">
              {shower.name}
            </Typography>
          </Box>
          
          {shower.isPeak && (
            <Chip 
              label="Peak Tonight!"
              color="secondary"
              size="small"
            />
          )}
        </Box>
        
        <Box sx={{ mt: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Intensity
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {shower.rate} meteors/hour
            </Typography>
          </Box>
          
          <LinearProgress 
            variant="determinate" 
            value={(shower.rate / 150) * 100} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                bgcolor: intensityColor,
              }
            }} 
          />
          
          <Box sx={{ display: 'flex', mt: 1 }}>
            {[...Array(5)].map((_, index) => (
              <StarIcon 
                key={index} 
                sx={{ 
                  fontSize: '1rem',
                  color: index < intensityLevel ? intensityColor : 'rgba(255, 255, 255, 0.2)',
                }} 
              />
            ))}
          </Box>
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTimeIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Best Viewing: {shower.bestViewingTime}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EventIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Peak Date: {formatDate(shower.peakDate)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MeteorShowerCard;