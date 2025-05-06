import { useState } from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Tabs, 
  Tab,
  Divider,
  Chip,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar
} from '@mui/material';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import PublicIcon from '@mui/icons-material/Public';
import ShowerIcon from '@mui/icons-material/Shower';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TodayIcon from '@mui/icons-material/Today';
import MoonPhaseCard from './MoonPhaseCard';
import PlanetCard from './PlanetCard';
import MeteorShowerCard from './MeteorShowerCard';
import ISSPassCard from './ISSPassCard';

const SkyEventsDashboard = ({ skyEvents }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Format the date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          borderRadius: 2,
          background: 'rgba(30, 30, 30, 0.8)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TodayIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h4" component="h2">
            Sky Events for {formatDate(skyEvents.date)}
          </Typography>
        </Box>
        
        <Typography variant="subtitle1" gutterBottom>
          Location: {skyEvents.location.name || `${parseFloat(skyEvents.location.latitude).toFixed(4)}, ${parseFloat(skyEvents.location.longitude).toFixed(4)}`}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="sky events tabs"
          >
            <Tab icon={<NightsStayIcon />} label="Moon" />
            <Tab icon={<PublicIcon />} label="Planets" />
            <Tab icon={<ShowerIcon />} label="Meteor Showers" />
            <Tab icon={<RocketLaunchIcon />} label="ISS Passes" />
          </Tabs>
        </Box>
        
        {/* Moon Phase Tab */}
        <TabPanel value={tabValue} index={0}>
          <MoonPhaseCard moonPhase={skyEvents.moonPhase} />
        </TabPanel>
        
        {/* Planets Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {skyEvents.visiblePlanets.map((planet) => (
              <Grid item xs={12} sm={6} md={4} key={planet.name}>
                <PlanetCard planet={planet} />
              </Grid>
            ))}
            {skyEvents.visiblePlanets.length === 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" align="center" color="textSecondary">
                  No planets visible tonight
                </Typography>
              </Grid>
            )}
          </Grid>
        </TabPanel>
        
        {/* Meteor Showers Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {skyEvents.meteorShowers.map((shower) => (
              <Grid item xs={12} sm={6} key={shower.name}>
                <MeteorShowerCard shower={shower} />
              </Grid>
            ))}
            {skyEvents.meteorShowers.length === 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" align="center" color="textSecondary">
                  No meteor showers active tonight
                </Typography>
              </Grid>
            )}
          </Grid>
        </TabPanel>
        
        {/* ISS Passes Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            {skyEvents.issPasses.map((pass, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ISSPassCard pass={pass} />
              </Grid>
            ))}
            {skyEvents.issPasses.length === 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" align="center" color="textSecondary">
                  No ISS passes visible tonight
                </Typography>
              </Grid>
            )}
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

// TabPanel component for tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`sky-events-tabpanel-${index}`}
      aria-labelledby={`sky-events-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default SkyEventsDashboard;