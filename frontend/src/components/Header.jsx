import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import NightsStayIcon from '@mui/icons-material/NightsStay';

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <NightsStayIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SkyWatcher
          </Typography>
        </Box>
        <Button color="inherit" href="https://github.com/yourusername/skywatcher" target="_blank">
          GitHub
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;