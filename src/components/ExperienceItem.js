import React from 'react';
import { Typography, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ApartmentIcon from '@mui/icons-material/Apartment';

import { useThemeContext } from '../contexts/ThemeContext';

const ExperienceItem = ({ type, title, content }) => {
  const { colors } = useThemeContext();
  const Icon = type === 'SCHOOL' ? SchoolIcon : ApartmentIcon;

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mt: 2 }}>
      <Icon sx={{ color: colors.accent, fontSize: 26, flexShrink: 0, mt: '2px' }} aria-hidden="true" />
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {content.split('\n').map((line, i) => (
          <Typography key={i} variant="body2" color="text.secondary">
            {line}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default ExperienceItem;
