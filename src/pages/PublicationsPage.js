import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
import Title from '../layouts/Title';
import me from '../assets/images/me.png';
import { Typography, Box, Grid, Link } from '@mui/material';
import PublicationCard from '../components/PublicationCard';
import pubs from '../data/publications';

const PublicationsPage = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <Title text={'PUBLICATIONS'} width={'25%'} />
      <br />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 1,
          m: 1,
          borderRadius: 1,
        }}
      >
        {pubs.map((elem) => (
          <PublicationCard
            media={elem['image']}
            author={elem['author']}
            conference={elem['conference']}
            title={elem['title']}
            tags={elem['tags']}
          />
        ))}
      </Box>
    </div>
  );
});

export default PublicationsPage;
