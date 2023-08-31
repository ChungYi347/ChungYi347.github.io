import * as React from 'react';
import { Card, CardActions, CardContent, CardMedia } from '@mui/material';
import { Button, Link, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import Animate from '../components/Animate';
import { useThemeContext } from '../contexts/ThemeContext';

const me = 'Chunggi Lee';

const makeTitle = (author, isLight, primary, secondary) => {
  const words = author.split(me);
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="h6" color={secondary}>
        {words[0]}
        <Box
          sx={{ borderBottom: isLight ? '2px solid black' : '2px solid #03c2c9' }}
          color={primary}
          fontWeight={500}
          display="inline"
        >
          {me}
        </Box>
        {words[1]}
      </Typography>
    </Box>
  );
};

const PublicationCard = ({ media, title, author, conference, tags }) => {
  const { isLight } = useThemeContext();
  const primary = isLight ? 'text.primary' : 'white';
  const secondary = isLight ? 'text.secondary' : 'white';

  const backgroundColor = isLight === true ? 'white' : '#525252';
  return (
    <Animate>
      <Card sx={{ width: '100%', marginTop: 1, marginBottom: 1, backgroundColor: backgroundColor }}>
        <Box
          sx={{
            display: 'flex',
            p: 1,
            m: 1,
            borderRadius: 1,
            // flexWrap: 'wrap',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <motion.button
            animate={{ backgroundColor: 'white', border: 'none' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
          >
            <CardMedia sx={{ width: { md: '30vh', xs: '100%' } }} component="img" image={media} alt={title} />
          </motion.button>

          <CardContent>
            <Typography color={primary} fontWeight={600} variant="h6">
              {title}
            </Typography>
            {makeTitle(author, isLight, primary, secondary)}
            <Typography variant="h6" color={secondary}>
              {conference}
            </Typography>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              {tags.map((elem) => (
                <Typography marginRight={1} variant="h6">
                  <Link href={elem['link']}>{elem['tag']}</Link>
                </Typography>
              ))}
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Animate>
  );
};

export default PublicationCard;
