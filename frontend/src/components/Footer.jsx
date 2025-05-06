import { Box, Typography, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, bgcolor: 'rgba(0, 0, 0, 0.5)', mt: 'auto' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' '}
          <Link color="inherit" href="#">
            SkyWatcher
          </Link>
          {' - Discover the wonders of the night sky'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          {'Powered by astronomical data APIs | '}
          <Link color="inherit" href="#" target="_blank">
            Terms of Service
          </Link>
          {' | '}
          <Link color="inherit" href="#" target="_blank">
            Privacy Policy
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;