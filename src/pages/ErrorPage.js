import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

import TakenSVG from '../assets/undraw_Taken.svg';

const ErrorPage = ({ message = 'Page not found.' }) => (
  <Box
    sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      py: 10,
      gap: 2,
    }}
  >
    <Typography variant="h4" component="h1">
      {message}
    </Typography>
    <Box
      component="img"
      src={TakenSVG}
      alt=""
      aria-hidden="true"
      sx={{ my: 2, width: '100%', maxWidth: { xs: 280, md: 420 } }}
    />
    <Button component={Link} to="/" variant="outlined" size="large">
      Go home
    </Button>
  </Box>
);

export default ErrorPage;
