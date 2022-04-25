import * as React from 'react';
import { css } from '@emotion/react';
import { Card, CardActions, CardContent, CardMedia } from '@mui/material';
import { Button, Grid, Link, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const ProjectCard = ({ media, title, setOpen, idx, setSelectedIdx }) => {
  const [start, setStart] = React.useState(false);

  return (
    <Card
      sx={{
        width: '100%',
        height: '20vh',
      }}
    >
      <Box
        onMouseEnter={() => setStart(true)}
        onMouseLeave={() => setStart(false)}
        sx={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
      >
        <CardMedia component="img" image={media} alt={title} />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(3, 194, 201, 1)',
            color: 'white',
            opacity: 0,
            '&:hover': {
              transition: '.5s ease',
              opacity: 1,
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {start ? (
            <>
              <motion.div initial={{ y: '-200%' }} animate={{ y: '0%' }} transition={{ duration: 0.5 }}>
                <Typography variant="h6" align="center">
                  {title}
                </Typography>
              </motion.div>
              <motion.div initial={{ y: '200%' }} animate={{ y: '0%' }} transition={{ duration: 0.5 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box>
                    <Typography
                      sx={{ boder: 1 }}
                      onClick={(event) => {
                        if (event.target.id == 'modalButton') {
                          setOpen(true);
                          setSelectedIdx(idx);
                        }
                      }}
                      color="#FF69B4"
                      fontWeight={500}
                      variant="h5"
                      align="center"
                      id="modalButton"
                    >
                      <>{'[Detail]'}</>
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default ProjectCard;
