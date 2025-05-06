import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Divider,
  Chip
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerIcon from '@mui/icons-material/Timer';
import HeightIcon from '@mui/icons-material/Height';

const ISSPassCard = ({ pass }) => {
  // Format date and time for display
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const options = { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true,
      month: 'short',
      day: 'numeric'
    };
    return date.toLocaleString(undefined, options);
  };
  
  // Format duration in minutes and seconds
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  // Determine visibility quality based on max elevation
  const getVisibilityQuality = (elevation) => {
    if (elevation >= 70) return { label: 'Excellent', color: 'success' };
    if (elevation >= 45) return { label: 'Good', color: 'primary' };
    if (elevation >= 20) return { label: 'Fair', color: 'warning' };
    return { label: 'Poor', color: 'error' };
  };
  
  const visibilityQuality = getVisibilityQuality(pass.maxElevation);
  
  // Check if the pass is happening today
  const isToday = (isoString) => {
    const today = new Date();
    const passDate = new Date(isoString);
    return today.toDateString() === passDate.toDateString();
  };
  
  const passIsToday = isToday(pass.startTime);

  return (
    <Card 
      sx={{ 
        height: '100%', 
        bgcolor: 'background.paper', 
        borderRadius: 2,
        border: passIsToday ? '1px solid #8e24aa' : 'none',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RocketLaunchIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h3">
              ISS Pass
            </Typography>
          </Box>
          
          {passIsToday && (
            <Chip 
              label="Today"
              color="primary"
              size="small"
            />
          )}
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTimeIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
            <Typography variant="body2">
              Start: {formatDateTime(pass.startTime)}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTimeIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
            <Typography variant="body2">
              End: {formatDateTime(pass.endTime)}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <TimerIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
            <Typography variant="body2">
              Duration: {formatDuration(pass.duration)}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HeightIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
              <Typography variant="body2">
                Max Elevation: {pass.maxElevation}°
              </Typography>
            </Box>
            
            <Chip 
              label={visibilityQuality.label}
              color={visibilityQuality.color}
              size="small"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ISSPassCard;