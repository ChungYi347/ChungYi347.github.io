import * as React from 'react';
import { css } from '@emotion/react';
import { Card, CardActions, CardContent, CardMedia } from '@mui/material';
import { Button, Grid, Link, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

import SchoolIcon from '@mui/icons-material/School';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useThemeContext } from '../contexts/ThemeContext';

const ExperienceItem = ({ type, title, content }) => {
  const { isLight } = useThemeContext();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 2,
      }}
    >
      {type === 'SCHOOL' ? (
        <>
          <SchoolIcon
            fontSize={'large'}
            // sx={{ fontSize: { xs: 'large', sm: 'medium' } }}
          />
        </>
      ) : (
        <ApartmentIcon fontSize={'large'} />
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'left',
          flexDirection: 'column',
          // justifyContent: 'center',
        }}
      >
        <>
          <Typography marginLeft={1} fontWeight={500} variant="h6" align="left">
            {title}
          </Typography>
          {content.split('\n').map((elem) => {
            console.log(elem);
            return (
              <Typography marginLeft={1} color={isLight ? 'text.primary' : 'white'} variant="h6" align="left">
                {elem}
              </Typography>
            );
          })}
        </>
      </Box>
    </Box>
  );
};

export default ExperienceItem;
