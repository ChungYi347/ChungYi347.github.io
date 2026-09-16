import React, { forwardRef } from 'react';
import { Box } from '@mui/material';

import Title from '../layouts/Title';
import PublicationCard from '../components/PublicationCard';
import pubs from '../data/publications';

const PublicationsPage = forwardRef((props, ref) => (
  <section ref={ref} data-section aria-labelledby="publications-title">
    <Title id="publications-title" text={'PUBLICATIONS'} />
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {pubs.map((pub) => (
        <PublicationCard
          key={`${pub.title}-${pub.conference}`}
          media={pub.image}
          poster={pub.poster}
          author={pub.author}
          conference={pub.conference}
          title={pub.title}
          tags={pub.tags}
        />
      ))}
    </Box>
  </section>
));

PublicationsPage.displayName = 'PublicationsPage';

export default PublicationsPage;
